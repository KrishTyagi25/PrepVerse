const mongoose = require('mongoose')

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  tags: [{ type: String }],
  companies: [{ type: String }],
  description: { type: String, required: true },
  examples: [{
    input: String,
    output: String,
    explanation: String,
  }],
  constraints: [{ type: String }],
  starterCode: {
    javascript: { type: String, default: '' },
    python: { type: String, default: '' },
    java: { type: String, default: '' },
    cpp: { type: String, default: '' },
  },
  solution: {
    javascript: { type: String, default: '' },
    approach: { type: String, default: '' },
    timeComplexity: String,
    spaceComplexity: String,
  },
  testCases: [{
    input: { type: String, required: true },
    expected: { type: String, required: true },
    isHidden: { type: Boolean, default: false },
  }],
  xpReward: { type: Number, default: 30 },
  isDaily: { type: Boolean, default: false },
  dailyDate: { type: Date, default: null },
  totalSolves: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

problemSchema.index({ difficulty: 1 })
problemSchema.index({ tags: 1 })
problemSchema.index({ companies: 1 })
problemSchema.index({ title: 'text' })
problemSchema.index({ isDaily: 1, dailyDate: 1 })

module.exports = mongoose.model('Problem', problemSchema)