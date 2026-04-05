const asyncHandler = require('express-async-handler')
const User         = require('../models/User')
const Submission   = require('../models/Submission')

// ── GET /api/leaderboard/global ────────────────────
const getGlobalLeaderboard = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20 } = req.query
  const skip = (Number(page) - 1) * Number(limit)

  const total = await User.countDocuments({ isActive: true })
  const users = await User.find({ isActive: true })
    .select('name avatar college role xp streak solved score connections')
    .sort({ xp: -1, streak: -1, solved: -1 })
    .skip(skip)
    .limit(Number(limit))

  // Attach rank numbers
  const ranked = users.map((u, i) => ({
    ...u.toObject(),
    rank: skip + i + 1,
    isMe: req.user ? u._id.toString() === req.user._id.toString() : false,
  }))

  res.json({
    success: true,
    data: {
      users: ranked,
      pagination: { total, page: Number(page), pages: Math.ceil(total / Number(limit)) },
    },
  })
})

// ── GET /api/leaderboard/friends ───────────────────
const getFriendsLeaderboard = asyncHandler(async (req, res) => {
  const me = await User.findById(req.user._id).select('connections')

  const friendIds = [...me.connections, req.user._id]

  const users = await User.find({ _id: { $in: friendIds }, isActive: true })
    .select('name avatar college role xp streak solved score')
    .sort({ xp: -1 })

  const ranked = users.map((u, i) => ({
    ...u.toObject(),
    rank: i + 1,
    isMe: u._id.toString() === req.user._id.toString(),
  }))

  res.json({ success: true, data: { users: ranked } })
})

// ── GET /api/leaderboard/my-rank ───────────────────
const getMyRank = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('xp')

  const rank = await User.countDocuments({
    isActive: true,
    xp: { $gt: user.xp },
  }) + 1

  const topPct = rank <= 10
    ? 'Top 10'
    : rank <= 100
      ? 'Top 100'
      : `Top ${Math.ceil((rank / await User.countDocuments({ isActive: true })) * 100)}%`

  res.json({
    success: true,
    data: { rank, xp: user.xp, topPct },
  })
})

// ── GET /api/leaderboard/stats ─────────────────────
const getPlatformStats = asyncHandler(async (req, res) => {
  const [totalUsers, totalSubmissions, totalSolved] = await Promise.all([
    User.countDocuments({ isActive: true }),
    Submission.countDocuments(),
    Submission.countDocuments({ status: 'accepted' }),
  ])

  res.json({
    success: true,
    data: { totalUsers, totalSubmissions, totalSolved },
  })
})

module.exports = { getGlobalLeaderboard, getFriendsLeaderboard, getMyRank, getPlatformStats }