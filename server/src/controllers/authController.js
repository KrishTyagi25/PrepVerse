const asyncHandler  = require('express-async-handler')
const crypto        = require('crypto')
const User          = require('../models/User')
const { generateAccessToken, generateRefreshToken, setTokenCookies, clearTokenCookies } = require('../middleware/generateToken')
const { sendEmail, welcomeEmail, passwordResetEmail } = require('../utils/sendEmail')
const jwt           = require('jsonwebtoken')

// ── POST /api/auth/register ────────────────────────
const register = asyncHandler(async (req, res) => {
  const { name, email, password, role, college, goal } = req.body

  if (!name || !email || !password) {
    res.status(400); throw new Error('Name, email and password are required')
  }

  const exists = await User.findOne({ email })
  if (exists) { res.status(400); throw new Error('Email already registered') }

  const user = await User.create({ name, email, password, role, college, goal })

  // Send welcome email (non-blocking)
  sendEmail({ to: email, subject: 'Welcome to PrepVerse! 🚀', html: welcomeEmail(name) }).catch(() => {})

  const accessToken  = generateAccessToken(user._id)
  const refreshToken = generateRefreshToken(user._id)

  // Store refresh token in DB
  user.refreshToken = refreshToken
  await user.save({ validateBeforeSave: false })

  setTokenCookies(res, accessToken, refreshToken)

  res.status(201).json({
    success: true,
    message: 'Account created successfully',
    data: {
      user: {
        _id:            user._id,
        name:           user.name,
        email:          user.email,
        avatar:         user.avatar,
        role:           user.role,
        college:        user.college,
        xp:             user.xp,
        streak:         user.streak,
        onboardingDone: user.onboardingDone,
      },
      accessToken,
    },
  })
})

// ── POST /api/auth/login ───────────────────────────
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400); throw new Error('Email and password are required')
  }

  const user = await User.findOne({ email }).select('+password +refreshToken')
  if (!user || !(await user.matchPassword(password))) {
    res.status(401); throw new Error('Invalid email or password')
  }

  if (!user.isActive) { res.status(403); throw new Error('Account deactivated') }

  const accessToken  = generateAccessToken(user._id)
  const refreshToken = generateRefreshToken(user._id)

  user.refreshToken = refreshToken
  await user.save({ validateBeforeSave: false })

  setTokenCookies(res, accessToken, refreshToken)

  res.json({
    success: true,
    message: 'Logged in successfully',
    data: {
      user: {
        _id:            user._id,
        name:           user.name,
        email:          user.email,
        avatar:         user.avatar,
        role:           user.role,
        college:        user.college,
        xp:             user.xp,
        streak:         user.streak,
        score:          user.score,
        solved:         user.solved,
        onboardingDone: user.onboardingDone,
      },
      accessToken,
    },
  })
})

// ── POST /api/auth/logout ──────────────────────────
const logout = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('+refreshToken')
  if (user) { user.refreshToken = undefined; await user.save({ validateBeforeSave: false }) }
  clearTokenCookies(res)
  res.json({ success: true, message: 'Logged out successfully' })
})

// ── POST /api/auth/refresh ─────────────────────────
const refreshToken = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken || req.body?.refreshToken

  if (!token) { res.status(401); throw new Error('No refresh token') }

  let decoded
  try {
    decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
  } catch {
    res.status(401); throw new Error('Invalid or expired refresh token')
  }

  const user = await User.findById(decoded.id).select('+refreshToken')
  if (!user || user.refreshToken !== token) {
    res.status(401); throw new Error('Refresh token mismatch')
  }

  const newAccessToken  = generateAccessToken(user._id)
  const newRefreshToken = generateRefreshToken(user._id)

  user.refreshToken = newRefreshToken
  await user.save({ validateBeforeSave: false })

  setTokenCookies(res, newAccessToken, newRefreshToken)

  res.json({
    success: true,
    data: { accessToken: newAccessToken },
  })
})

// ── GET /api/auth/me ───────────────────────────────
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('connections', 'name avatar college role')
  res.json({ success: true, data: { user } })
})

// ── POST /api/auth/forgot-password ────────────────
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body
  if (!email) { res.status(400); throw new Error('Email is required') }

  const user = await User.findOne({ email })
  // Always return 200 to prevent email enumeration
  if (!user) return res.json({ success: true, message: 'If that email exists, a reset link was sent' })

  const resetToken = user.getResetPasswordToken()
  await user.save({ validateBeforeSave: false })

  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`
  await sendEmail({ to: email, subject: 'PrepVerse — Password Reset', html: passwordResetEmail(user.name, resetUrl) })

  res.json({ success: true, message: 'If that email exists, a reset link was sent' })
})

// ── POST /api/auth/reset-password/:token ──────────
const resetPassword = asyncHandler(async (req, res) => {
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

  const user = await User.findOne({
    resetPasswordToken:  hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  }).select('+resetPasswordToken +resetPasswordExpire')

  if (!user) { res.status(400); throw new Error('Invalid or expired reset token') }

  const { password } = req.body
  if (!password || password.length < 8) { res.status(400); throw new Error('Password must be at least 8 characters') }

  user.password            = password
  user.resetPasswordToken  = undefined
  user.resetPasswordExpire = undefined
  await user.save()

  res.json({ success: true, message: 'Password reset successful. Please log in.' })
})

// ── POST /api/auth/change-password ────────────────
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body
  if (!currentPassword || !newPassword) { res.status(400); throw new Error('Both fields required') }
  if (newPassword.length < 8) { res.status(400); throw new Error('New password min 8 characters') }

  const user = await User.findById(req.user._id).select('+password')
  if (!(await user.matchPassword(currentPassword))) {
    res.status(401); throw new Error('Current password is incorrect')
  }

  user.password = newPassword
  await user.save()

  clearTokenCookies(res)
  res.json({ success: true, message: 'Password changed. Please log in again.' })
})

module.exports = { register, login, logout, refreshToken, getMe, forgotPassword, resetPassword, changePassword }