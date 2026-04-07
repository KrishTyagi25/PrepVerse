const asyncHandler  = require('express-async-handler')
const Problem       = require('../models/Problem')
const Submission    = require('../models/Submission')
const User          = require('../models/User')
const Notification  = require('../models/Notification')
const { emitNotification } = require('../socket')

// ── GET /api/problems ─────────────────────────────
// List all problems with filters + pagination
const getProblems = asyncHandler(async (req, res) => {
  const { difficulty, tag, company, status, search, page = 1, limit = 20 } = req.query

  const query = { isActive: true }

  if (difficulty && difficulty !== 'All') query.difficulty = difficulty
  if (tag        && tag !== 'All')        query.tags       = tag
  if (company    && company !== 'All')    query.companies  = company
  if (search)                             query.$text      = { $search: search }

  const skip  = (Number(page) - 1) * Number(limit)
  const total = await Problem.countDocuments(query)

  let problems = await Problem.find(query)
    .select('-solution -testCases')
    .sort(search ? { score: { $meta: 'textScore' } } : { createdAt: -1 })
    .skip(skip)
    .limit(Number(limit))

  // If user is logged in, attach solved status to each problem
  if (req.user) {
    const solvedIds = await Submission.distinct('problem', {
      user:   req.user._id,
      status: 'accepted',
    })
    const solvedSet = new Set(solvedIds.map(id => id.toString()))
    problems = problems.map(p => ({
      ...p.toObject(),
      solved: solvedSet.has(p._id.toString()),
    }))
  }

  res.json({
    success: true,
    data: {
      problems,
      pagination: {
        total,
        page:  Number(page),
        pages: Math.ceil(total / Number(limit)),
        limit: Number(limit),
      },
    },
  })
})

// ── GET /api/problems/daily ───────────────────────
const getDailyProblem = asyncHandler(async (req, res) => {
  const today     = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow  = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  let daily = await Problem.findOne({
    isDaily:   true,
    dailyDate: { $gte: today, $lt: tomorrow },
  }).select('-solution')

  // Fallback — pick a random medium problem if none set for today
  if (!daily) {
    const count  = await Problem.countDocuments({ difficulty: 'Medium', isActive: true })
    const random = Math.floor(Math.random() * count)
    daily = await Problem.findOne({ difficulty: 'Medium', isActive: true })
      .skip(random)
      .select('-solution')
  }

  // Check if logged-in user already solved it today
  let solvedToday = false
  if (req.user && daily) {
    const sub = await Submission.findOne({
      user:      req.user._id,
      problem:   daily._id,
      status:    'accepted',
      createdAt: { $gte: today },
    })
    solvedToday = !!sub
  }

  res.json({ success: true, data: { problem: daily, solvedToday } })
})

// ── GET /api/problems/:id ─────────────────────────
const getProblemById = asyncHandler(async (req, res) => {
  const problem = await Problem.findById(req.params.id).select('-solution.javascript')

  if (!problem || !problem.isActive) {
    res.status(404); throw new Error('Problem not found')
  }

  let userSubmission = null
  if (req.user) {
    userSubmission = await Submission.findOne({
      user:    req.user._id,
      problem: problem._id,
      status:  'accepted',
    }).sort({ createdAt: -1 })
  }

  res.json({
    success: true,
    data: { problem, userSubmission },
  })
})

// ── POST /api/problems/:id/submit ────────────────
const submitSolution = asyncHandler(async (req, res) => {
  const { code, language } = req.body
  const problem = await Problem.findById(req.params.id)

  if (!problem) { res.status(404); throw new Error('Problem not found') }
  if (!code)    { res.status(400); throw new Error('Code is required') }

  // ── Simulated judge (replace with real judge0 API later) ──
  const passedCases  = problem.testCases.length  // simulate all pass
  const totalCases   = problem.testCases.length
  const allPassed    = passedCases === totalCases
  const status       = allPassed ? 'accepted' : 'wrong_answer'
  const runtime      = `${Math.floor(60 + Math.random() * 100)}ms`
  const memory       = `${(40 + Math.random() * 20).toFixed(1)}MB`

  // Save submission
  const submission = await Submission.create({
    user:    req.user._id,
    problem: problem._id,
    code,
    language,
    status,
    runtime,
    memory,
    passedCases,
    totalCases,
    xpEarned: allPassed ? problem.xpReward : 0,
  })

  // If accepted — update user stats
  if (allPassed) {
    const user = await User.findById(req.user._id)

    // Check if first time solving this problem
    const prevAccepted = await Submission.countDocuments({
      user:    req.user._id,
      problem: problem._id,
      status:  'accepted',
      _id:     { $ne: submission._id },
    })

    if (prevAccepted === 0) {
      // First solve — award XP and update count
      user.xp     += problem.xpReward
      user.solved += 1
      user.updateStreak()
      await user.save()

      // Update problem total solves
      await Problem.findByIdAndUpdate(problem._id, { $inc: { totalSolves: 1 } })

      // Streak milestone notification
      if ([7, 14, 30, 50, 100].includes(user.streak)) {
        const notif = await Notification.create({
          recipient: user._id,
          type:      'streak_milestone',
          message:   `🔥 ${user.streak}-day streak! You're on fire!`,
          link:      '/dashboard',
          data:      { streak: user.streak },
        })
        const io = req.app.get('io')
        emitNotification(io, user._id.toString(), notif)
      }
    }
  }

  res.json({
    success: true,
    data: {
      submission: {
        _id:        submission._id,
        status,
        runtime,
        memory,
        passedCases,
        totalCases,
        xpEarned:   allPassed ? problem.xpReward : 0,
      },
    },
  })
})

// ── POST /api/problems/:id/run ────────────────────
// Run against sample test cases only (no XP)
const runCode = asyncHandler(async (req, res) => {
  const { code, language } = req.body
  const problem = await Problem.findById(req.params.id)

  if (!problem) { res.status(404); throw new Error('Problem not found') }

  const visibleCases = problem.testCases.filter(tc => !tc.isHidden)

  // Simulate run results
  const results = visibleCases.map((tc, i) => ({
    input:    tc.input,
    expected: tc.expected,
    output:   tc.expected, // simulate correct output
    passed:   true,
    runtime:  `${40 + Math.floor(Math.random() * 60)}ms`,
  }))

  res.json({
    success: true,
    data: { results, allPassed: results.every(r => r.passed) },
  })
})

// ── GET /api/problems/:id/submissions ────────────
const getMySubmissions = asyncHandler(async (req, res) => {
  const submissions = await Submission.find({
    user:    req.user._id,
    problem: req.params.id,
  })
    .sort({ createdAt: -1 })
    .limit(10)

  res.json({ success: true, data: { submissions } })
})

// ── GET /api/problems/stats ───────────────────────
const getMyStats = asyncHandler(async (req, res) => {
  const userId = req.user._id

  const [easy, medium, hard] = await Promise.all([
    Submission.distinct('problem', { user: userId, status: 'accepted' }).then(async ids => {
      const probs = await Problem.find({ _id: { $in: ids }, difficulty: 'Easy' })
      return probs.length
    }),
    Submission.distinct('problem', { user: userId, status: 'accepted' }).then(async ids => {
      const probs = await Problem.find({ _id: { $in: ids }, difficulty: 'Medium' })
      return probs.length
    }),
    Submission.distinct('problem', { user: userId, status: 'accepted' }).then(async ids => {
      const probs = await Problem.find({ _id: { $in: ids }, difficulty: 'Hard' })
      return probs.length
    }),
  ])

  const recentActivity = await Submission.find({ user: userId, status: 'accepted' })
    .sort({ createdAt: -1 })
    .limit(30)
    .populate('problem', 'title difficulty')

  res.json({
    success: true,
    data: {
      solved:   { easy, medium, hard, total: easy + medium + hard },
      recentActivity,
    },
  })
})

module.exports = { getProblems, getDailyProblem, getProblemById, submitSolution, runCode, getMySubmissions, getMyStats }