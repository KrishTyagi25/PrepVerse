const express   = require('express')
const router    = express.Router()
const rateLimit = require('express-rate-limit')
const { protect } = require('../middleware/auth')
const {
  register, login, logout, refreshToken,
  getMe, forgotPassword, resetPassword, changePassword,
} = require('../controllers/authController')

// Rate limit auth routes — stricter
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max:      20,
  message:  { success: false, message: 'Too many attempts, try again in 15 minutes' },
})

router.post('/register',        authLimiter, register)
router.post('/login',           authLimiter, login)
router.post('/logout',          protect,     logout)
router.post('/refresh',                      refreshToken)
router.get ('/me',              protect,     getMe)
router.post('/forgot-password', authLimiter, forgotPassword)
router.post('/reset-password/:token',        resetPassword)
router.post('/change-password', protect,     changePassword)

module.exports = router