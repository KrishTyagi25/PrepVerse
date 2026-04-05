const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  author:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type:    { type: String, enum: ['post', 'solved', 'badge', 'interview', 'project'], default: 'post' },
  content: { type: String, required: true, maxlength: [1000, 'Post max 1000 chars'] },

  // Type-specific extras
  badge:       { type: String, default: '' },
  problemRef:  { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', default: null },
  projectName: { type: String, default: '' },
  projectUrl:  { type: String, default: '' },
  score:       { type: Number, default: null },
  difficulty:  { type: String, default: '' },

  likes:    [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{
    user:      { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text:      { type: String, required: true, maxlength: 500 },
    createdAt: { type: Date, default: Date.now },
  }],

  isActive: { type: Boolean, default: true },
}, { timestamps: true })

postSchema.index({ author: 1, createdAt: -1 })
postSchema.index({ createdAt: -1 })
postSchema.index({ likes: 1 })

module.exports = mongoose.model('Post', postSchema)