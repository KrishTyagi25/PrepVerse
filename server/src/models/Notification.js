const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sender:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  type: {
    type: String,
    enum: ['connection_request', 'connection_accepted', 'post_like', 'post_comment', 'interview_booked', 'badge_earned', 'daily_reminder', 'streak_milestone'],
    required: true,
  },
  message:   { type: String, required: true },
  link:      { type: String, default: '' },
  read:      { type: Boolean, default: false },
  data:      { type: mongoose.Schema.Types.Mixed, default: {} },
}, { timestamps: true })

notificationSchema.index({ recipient: 1, read: 1, createdAt: -1 })
notificationSchema.index({ recipient: 1, createdAt: -1 })

module.exports = mongoose.model('Notification', notificationSchema)