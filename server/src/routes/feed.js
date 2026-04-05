const express = require('express')
const router  = express.Router()
const { protect, optionalAuth } = require('../middleware/auth')
const { getFeed, createPost, deletePost, toggleLike, addComment, deleteComment } = require('../controllers/feedController')

router.get   ('/',                         optionalAuth, getFeed)
router.post  ('/',                         protect,      createPost)
router.delete('/:id',                      protect,      deletePost)
router.post  ('/:id/like',                 protect,      toggleLike)
router.post  ('/:id/comment',              protect,      addComment)
router.delete('/:id/comment/:commentId',   protect,      deleteComment)

module.exports = router