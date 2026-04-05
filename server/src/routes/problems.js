const express = require('express')
const router  = express.Router()
const { protect, optionalAuth } = require('../middleware/auth')
const {
  getProblems, getDailyProblem, getProblemById,
  submitSolution, runCode, getMySubmissions, getMyStats,
} = require('../controllers/problemController')

router.get ('/',              optionalAuth, getProblems)
router.get ('/daily',         optionalAuth, getDailyProblem)
router.get ('/stats',         protect,      getMyStats)
router.get ('/:id',           optionalAuth, getProblemById)
router.post('/:id/run',       protect,      runCode)
router.post('/:id/submit',    protect,      submitSolution)
router.get ('/:id/submissions', protect,    getMySubmissions)

module.exports = router