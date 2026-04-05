const express = require('express')
const router  = express.Router()
const { protect, optionalAuth } = require('../middleware/auth')
const { upload } = require('../config/cloudinary')
const {
  getUserProfile, updateProfile, updateAvatar,
  searchUsers, sendConnectionRequest, acceptConnection,
  removeConnection, completeOnboarding,
} = require('../controllers/userController')

router.get  ('/search',          optionalAuth, searchUsers)
router.get  ('/profile/:id',     optionalAuth, getUserProfile)
router.put  ('/profile',         protect,      updateProfile)
router.put  ('/avatar',          protect,      upload.single('avatar'), updateAvatar)
router.post ('/connect/:id',     protect,      sendConnectionRequest)
router.post ('/accept/:id',      protect,      acceptConnection)
router.delete('/disconnect/:id', protect,      removeConnection)
router.post ('/onboarding',      protect,      completeOnboarding)

module.exports = router