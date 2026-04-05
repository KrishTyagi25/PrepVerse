const mongoose = require('mongoose')

const conversationSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  lastMessage:  { type: mongoose.Schema.Types.ObjectId, ref: 'Message', default: null },
  lastActivity: { type: Date, default: Date.now },
}, { timestamps: true })

conversationSchema.index({ participants: 1 })
conversationSchema.index({ lastActivity: -1 })

const messageSchema = new mongoose.Schema({
  conversation: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true },
  sender:       { type: mongoose.Schema.Types.ObjectId, ref: 'User',         required: true },
  text:         { type: String, required: true, maxlength: 2000 },
  readBy:       [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isDeleted:    { type: Boolean, default: false },
}, { timestamps: true })

messageSchema.index({ conversation: 1, createdAt: 1 })

const Conversation = mongoose.model('Conversation', conversationSchema)
const Message      = mongoose.model('Message',      messageSchema)

module.exports = { Conversation, Message }