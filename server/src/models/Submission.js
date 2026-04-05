const mongoose = require('mongoose')

const submissionSchema = new mongoose.Schema({
  user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User',    required: true },
  problem: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
  code:        { type: String, required: true },
  language:    { type: String, enum: ['javascript', 'python', 'java', 'cpp'], required: true },
  status:      { type: String, enum: ['accepted', 'wrong_answer', 'runtime_error', 'time_limit'], required: true },
  runtime:     { type: String, default: '' },
  memory:      { type: String, default: '' },
  passedCases: { type: Number, default: 0 },
  totalCases:  { type: Number, default: 0 },
  xpEarned:   { type: Number, default: 0 },
}, { timestamps: true })

submissionSchema.index({ user: 1, problem: 1 })
submissionSchema.index({ user: 1, createdAt: -1 })
submissionSchema.index({ problem: 1, status: 1 })

module.exports = mongoose.model('Submission', submissionSchema)