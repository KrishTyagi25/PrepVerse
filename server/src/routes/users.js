const express = require('express')
const router  = express.Router()
const { protect, optionalAuth } = require('../middleware/auth')
const { upload } = require('../config/cloudinary')
const asyncHandler = require('express-async-handler')
const User = require('../models/User')

const {
  getUserProfile, updateProfile, updateAvatar,
  searchUsers, sendConnectionRequest, acceptConnection,
  removeConnection, completeOnboarding,saveResume, getResume,
  saveRoadmap, getRoadmap,
  saveProjects, getProjects,

} = require('../controllers/userController')

router.get  ('/search',          optionalAuth, searchUsers)
router.get  ('/profile/:id',     optionalAuth, getUserProfile)
router.put  ('/profile',         protect,      updateProfile)
router.put  ('/avatar',          protect,      upload.single('avatar'), updateAvatar)
router.post ('/connect/:id',     protect,      sendConnectionRequest)
router.post ('/accept/:id',      protect,      acceptConnection)
router.delete('/disconnect/:id', protect,      removeConnection)
router.post ('/onboarding',      protect,      completeOnboarding)
router.get ('/resume',    protect, getResume)
router.put ('/resume',    protect, saveResume)
router.get ('/roadmap',   protect, getRoadmap)
router.put ('/roadmap',   protect, saveRoadmap)
router.get ('/projects',  protect, getProjects)
router.put ('/projects',  protect, saveProjects)
router.get('/notification-prefs', protect, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('notificationPrefs')
  res.json({ success: true, data: { prefs: user.notificationPrefs } })
}))

router.put('/notification-prefs', protect, asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { notificationPrefs: req.body },
    { new: true }
  ).select('notificationPrefs')
  res.json({ success: true, data: { prefs: user.notificationPrefs } })
}))

module.exports = router