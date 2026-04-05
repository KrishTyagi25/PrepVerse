const jwt              = require('jsonwebtoken')
const asyncHandler     = require('express-async-handler')
const User             = require('../models/User')

// Protect routes — require valid access token
const protect = asyncHandler(async (req, res, next) => {
  let token

  // Check Authorization header first, then cookie
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  } else if (req.cookies?.accessToken) {
    token = req.cookies.accessToken
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorised — no token')
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  req.user = await User.findById(decoded.id).select('-password -refreshToken')

  if (!req.user) {
    res.status(401)
    throw new Error('Not authorised — user not found')
  }

  next()
})

// Optional auth — attach user if token present but don't block
const optionalAuth = asyncHandler(async (req, res, next) => {
  let token
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  } else if (req.cookies?.accessToken) {
    token = req.cookies.accessToken
  }
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select('-password -refreshToken')
    } catch (_) {}
  }
  next()
})

module.exports = { protect, optionalAuth }