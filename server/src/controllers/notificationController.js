const asyncHandler  = require('express-async-handler')
const Notification  = require('../models/Notification')

// ── GET /api/notifications ─────────────────────────
const getNotifications = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20 } = req.query
  const skip  = (Number(page) - 1) * Number(limit)
  const total = await Notification.countDocuments({ recipient: req.user._id })

  const notifications = await Notification.find({ recipient: req.user._id })
    .populate('sender', 'name avatar')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit))

  const unreadCount = await Notification.countDocuments({ recipient: req.user._id, read: false })

  res.json({
    success: true,
    data: {
      notifications,
      unreadCount,
      pagination: { total, page: Number(page), pages: Math.ceil(total / Number(limit)) },
    },
  })
})

// ── PATCH /api/notifications/:id/read ─────────────
const markRead = asyncHandler(async (req, res) => {
  await Notification.findOneAndUpdate(
    { _id: req.params.id, recipient: req.user._id },
    { read: true }
  )
  res.json({ success: true, message: 'Marked as read' })
})

// ── PATCH /api/notifications/read-all ─────────────
const markAllRead = asyncHandler(async (req, res) => {
  await Notification.updateMany({ recipient: req.user._id, read: false }, { read: true })
  res.json({ success: true, message: 'All notifications marked as read' })
})

// ── DELETE /api/notifications/:id ─────────────────
const deleteNotification = asyncHandler(async (req, res) => {
  await Notification.findOneAndDelete({ _id: req.params.id, recipient: req.user._id })
  res.json({ success: true, message: 'Notification deleted' })
})

module.exports = { getNotifications, markRead, markAllRead, deleteNotification }