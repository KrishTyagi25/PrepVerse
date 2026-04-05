const asyncHandler = require('express-async-handler')
const User         = require('../models/User')
const { cloudinary } = require('../config/cloudinary')

// ── GET /api/users/profile/:id ─────────────────────
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .populate('connections', 'name avatar college role xp streak solved')
    .select('-refreshToken -resetPasswordToken -resetPasswordExpire')

  if (!user) { res.status(404); throw new Error('User not found') }
  res.json({ success: true, data: { user } })
})

// ── PUT /api/users/profile ─────────────────────────
const updateProfile = asyncHandler(async (req, res) => {
  const allowed = ['name', 'bio', 'college', 'role', 'goal', 'github', 'linkedin', 'portfolio']
  const updates = {}
  allowed.forEach(field => { if (req.body[field] !== undefined) updates[field] = req.body[field] })

  const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true, runValidators: true })
  res.json({ success: true, message: 'Profile updated', data: { user } })
})

// ── PUT /api/users/avatar ──────────────────────────
const updateAvatar = asyncHandler(async (req, res) => {
  if (!req.file) { res.status(400); throw new Error('No image uploaded') }

  // Delete old avatar from cloudinary if exists
  const currentUser = await User.findById(req.user._id)
  if (currentUser.avatar) {
    const publicId = currentUser.avatar.split('/').pop().split('.')[0]
    await cloudinary.uploader.destroy(`prepverse/avatars/${publicId}`).catch(() => {})
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.file.path },
    { new: true }
  )
  res.json({ success: true, message: 'Avatar updated', data: { avatar: user.avatar } })
})

// ── GET /api/users/search ──────────────────────────
const searchUsers = asyncHandler(async (req, res) => {
  const { q, role, minScore, page = 1, limit = 12 } = req.query
  const query = { isActive: true, _id: { $ne: req.user?._id } }

  if (q)        query.$text = { $search: q }
  if (role && role !== 'All') query.role = role
  if (minScore) query.score = { $gte: Number(minScore) }

  const skip  = (Number(page) - 1) * Number(limit)
  const total = await User.countDocuments(query)
  const users = await User.find(query)
    .select('name avatar bio college role xp streak score solved connections')
    .sort(q ? { score: { $meta: 'textScore' } } : { xp: -1 })
    .skip(skip)
    .limit(Number(limit))

  res.json({
    success: true,
    data: {
      users,
      pagination: { total, page: Number(page), pages: Math.ceil(total / Number(limit)) },
    },
  })
})

// ── POST /api/users/connect/:id ────────────────────
const sendConnectionRequest = asyncHandler(async (req, res) => {
  const targetId = req.params.id
  const me       = req.user._id.toString()

  if (targetId === me) { res.status(400); throw new Error('Cannot connect with yourself') }

  const [me_doc, target] = await Promise.all([
    User.findById(me),
    User.findById(targetId),
  ])

  if (!target) { res.status(404); throw new Error('User not found') }
  if (me_doc.connections.includes(targetId))    { res.status(400); throw new Error('Already connected') }
  if (me_doc.pendingSent.includes(targetId))    { res.status(400); throw new Error('Request already sent') }
  if (me_doc.pendingReceived.includes(targetId)){
    // Auto-accept if they already sent us a request
    me_doc.connections.push(targetId)
    me_doc.pendingReceived = me_doc.pendingReceived.filter(id => id.toString() !== targetId)
    target.connections.push(me)
    target.pendingSent = target.pendingSent.filter(id => id.toString() !== me)
    await Promise.all([me_doc.save(), target.save()])
    return res.json({ success: true, message: 'Connection accepted', status: 'connected' })
  }

  me_doc.pendingSent.push(targetId)
  target.pendingReceived.push(me)
  await Promise.all([me_doc.save(), target.save()])

  res.json({ success: true, message: 'Connection request sent', status: 'pending' })
})

// ── POST /api/users/accept/:id ─────────────────────
const acceptConnection = asyncHandler(async (req, res) => {
  const requesterId = req.params.id
  const me          = req.user._id.toString()

  const [me_doc, requester] = await Promise.all([
    User.findById(me),
    User.findById(requesterId),
  ])

  if (!me_doc.pendingReceived.includes(requesterId)) {
    res.status(400); throw new Error('No pending request from this user')
  }

  me_doc.connections.push(requesterId)
  me_doc.pendingReceived = me_doc.pendingReceived.filter(id => id.toString() !== requesterId)
  requester.connections.push(me)
  requester.pendingSent = requester.pendingSent.filter(id => id.toString() !== me)

  await Promise.all([me_doc.save(), requester.save()])
  res.json({ success: true, message: 'Connection accepted', status: 'connected' })
})

// ── DELETE /api/users/disconnect/:id ──────────────
const removeConnection = asyncHandler(async (req, res) => {
  const targetId = req.params.id
  const me       = req.user._id.toString()

  await Promise.all([
    User.findByIdAndUpdate(me,       { $pull: { connections: targetId, pendingSent: targetId, pendingReceived: targetId } }),
    User.findByIdAndUpdate(targetId, { $pull: { connections: me,       pendingSent: me,       pendingReceived: me       } }),
  ])

  res.json({ success: true, message: 'Connection removed' })
})

// ── POST /api/users/onboarding ─────────────────────
const completeOnboarding = asyncHandler(async (req, res) => {
  const { role, goal, college, bio } = req.body
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { role, goal, college, bio, onboardingDone: true },
    { new: true }
  )
  res.json({ success: true, message: 'Onboarding complete', data: { user } })
})

module.exports = { getUserProfile, updateProfile, updateAvatar, searchUsers, sendConnectionRequest, acceptConnection, removeConnection, completeOnboarding }