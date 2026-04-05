const jwt = require('jsonwebtoken')

const generateAccessToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  })

const generateRefreshToken = (id) =>
  jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE,
  })

const setTokenCookies = (res, accessToken, refreshToken) => {
  const isProd = process.env.NODE_ENV === 'production'

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure:   isProd,
    sameSite: isProd ? 'none' : 'lax',
    maxAge:   15 * 60 * 1000,           // 15 minutes
  })

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure:   isProd,
    sameSite: isProd ? 'none' : 'lax',
    maxAge:   7 * 24 * 60 * 60 * 1000, // 7 days
  })
}

const clearTokenCookies = (res) => {
  res.cookie('accessToken',  '', { maxAge: 0, httpOnly: true })
  res.cookie('refreshToken', '', { maxAge: 0, httpOnly: true })
}

module.exports = { generateAccessToken, generateRefreshToken, setTokenCookies, clearTokenCookies }