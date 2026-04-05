const express = require('express')
const router  = express.Router()
const { protect, optionalAuth } = require('../middleware/auth')
const { getGlobalLeaderboard, getFriendsLeaderboard, getMyRank, getPlatformStats } = require('../controllers/leaderboardController')

router.get('/global',   optionalAuth, getGlobalLeaderboard)
router.get('/friends',  protect,      getFriendsLeaderboard)
router.get('/my-rank',  protect,      getMyRank)
router.get('/stats',    optionalAuth, getPlatformStats)

module.exports = router