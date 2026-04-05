const mongoose = require('mongoose')

const interviewSchema = new mongoose.Schema({
  user:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type:     { type: String, enum: ['ai', 'recruiter'], required: true },
  role:     { type: String, enum: ['fe', 'be', 'fs', 'ml'], required: true },
  topic:    { type: String, required: true },
  duration: { type: Number, required: true }, // minutes

  // Scores
  overallScore:   { type: Number, default: 0 },
  clarityScore:   { type: Number, default: 0 },
  depthScore:     { type: Number, default: 0 },
  examplesScore:  { type: Number, default: 0 },
  confidenceScore:{ type: Number, default: 0 },

  // Session data
  messages:   [{ role: String, text: String, timestamp: Date }],
  status:     { type: String, enum: ['scheduled', 'in_progress', 'completed', 'cancelled'], default: 'scheduled' },
  xpEarned:   { type: Number, default: 0 },

  // Recruiter session extras
  recruiterName:    String,
  recruiterCompany: String,
  scheduledAt:      Date,
  meetingLink:      String,
}, { timestamps: true })

interviewSchema.index({ user: 1, createdAt: -1 })
interviewSchema.index({ user: 1, status: 1 })

module.exports = mongoose.model('Interview', interviewSchema)