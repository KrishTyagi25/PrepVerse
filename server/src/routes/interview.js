const express = require('express')
const router  = express.Router()
const asyncHandler = require('express-async-handler')
const { protect }  = require('../middleware/auth')
const Interview    = require('../models/Interview')
const User         = require('../models/User')

// ── POST /api/interview/save ───────────────────────
router.post('/save', protect, asyncHandler(async (req, res) => {
  const { type, role, topic, duration, overallScore, clarityScore, depthScore, examplesScore, confidenceScore, messages } = req.body

  const xpEarned = Math.floor((overallScore / 100) * 50) // max 50 XP per interview

  const interview = await Interview.create({
    user: req.user._id,
    type: type ?? 'ai',
    role: role ?? 'fe',
    topic,
    duration,
    overallScore,
    clarityScore,
    depthScore,
    examplesScore,
    confidenceScore,
    messages: messages ?? [],
    status:   'completed',
    xpEarned,
  })

  // Update user's average score and XP
  const allInterviews = await Interview.find({ user: req.user._id, status: 'completed' })
  const avgScore = Math.round(allInterviews.reduce((sum, iv) => sum + iv.overallScore, 0) / allInterviews.length)

  await User.findByIdAndUpdate(req.user._id, {
    score: avgScore,
    $inc: { xp: xpEarned },
  })

  res.status(201).json({
    success: true,
    data: { interview, xpEarned },
  })
}))

// ── GET /api/interview/history ─────────────────────
router.get('/history', protect, asyncHandler(async (req, res) => {
  const interviews = await Interview.find({ user: req.user._id, status: 'completed' })
    .sort({ createdAt: -1 })
    .limit(20)

  const avgScore = interviews.length
    ? Math.round(interviews.reduce((s, iv) => s + iv.overallScore, 0) / interviews.length)
    : 0

  res.json({
    success: true,
    data: { interviews, avgScore, total: interviews.length },
  })
}))

// ── GET /api/interview/stats ───────────────────────
router.get('/stats', protect, asyncHandler(async (req, res) => {
  const interviews = await Interview.find({ user: req.user._id, status: 'completed' })

  const byTopic = interviews.reduce((acc, iv) => {
    acc[iv.topic] = (acc[iv.topic] ?? 0) + 1
    return acc
  }, {})

  const avgByCategory = {
    clarity:    Math.round(interviews.reduce((s,iv) => s + iv.clarityScore, 0)    / (interviews.length || 1)),
    depth:      Math.round(interviews.reduce((s,iv) => s + iv.depthScore, 0)      / (interviews.length || 1)),
    examples:   Math.round(interviews.reduce((s,iv) => s + iv.examplesScore, 0)   / (interviews.length || 1)),
    confidence: Math.round(interviews.reduce((s,iv) => s + iv.confidenceScore, 0) / (interviews.length || 1)),
  }

  res.json({
    success: true,
    data: {
      total:     interviews.length,
      avgScore:  Math.round(interviews.reduce((s,iv) => s + iv.overallScore, 0) / (interviews.length || 1)),
      byTopic,
      avgByCategory,
    },
  })
}))

module.exports = router