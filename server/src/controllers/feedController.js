const asyncHandler  = require('express-async-handler')
const Post          = require('../models/Post')
const Notification  = require('../models/Notification')
const { emitNotification } = require('../socket')

// ── GET /api/feed ──────────────────────────────────
const getFeed = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, type } = req.query
  const query = { isActive: true }
  if (type && type !== 'all') query.type = type

  const skip  = (Number(page) - 1) * Number(limit)
  const total = await Post.countDocuments(query)

  const posts = await Post.find(query)
    .populate('author', 'name avatar college role xp streak')
    .populate('comments.user', 'name avatar')
    .populate('problemRef', 'title difficulty')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit))

  // Attach liked status for logged-in user
  const postsWithLiked = posts.map(post => {
    const obj = post.toObject()
    obj.likedByMe = req.user
      ? post.likes.some(id => id.toString() === req.user._id.toString())
      : false
    obj.likesCount    = post.likes.length
    obj.commentsCount = post.comments.length
    return obj
  })

  res.json({
    success: true,
    data: {
      posts: postsWithLiked,
      pagination: { total, page: Number(page), pages: Math.ceil(total / Number(limit)) },
    },
  })
})

// ── POST /api/feed ─────────────────────────────────
const createPost = asyncHandler(async (req, res) => {
  const { type, content, badge, projectName, projectUrl, score, difficulty, problemRef } = req.body

  if (!content?.trim()) { res.status(400); throw new Error('Post content is required') }

  const post = await Post.create({
    author: req.user._id,
    type:   type || 'post',
    content: content.trim(),
    badge, projectName, projectUrl, score, difficulty, problemRef,
  })

  const populated = await post.populate('author', 'name avatar college role')

  res.status(201).json({
    success: true,
    message: 'Post created',
    data: { post: { ...populated.toObject(), likedByMe: false, likesCount: 0, commentsCount: 0 } },
  })
})

// ── DELETE /api/feed/:id ───────────────────────────
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
  if (!post) { res.status(404); throw new Error('Post not found') }
  if (post.author.toString() !== req.user._id.toString()) {
    res.status(403); throw new Error('Not authorised to delete this post')
  }
  post.isActive = false
  await post.save()
  res.json({ success: true, message: 'Post deleted' })
})

// ── POST /api/feed/:id/like ────────────────────────
const toggleLike = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
  if (!post || !post.isActive) { res.status(404); throw new Error('Post not found') }

  const userId   = req.user._id.toString()
  const alreadyLiked = post.likes.some(id => id.toString() === userId)

  if (alreadyLiked) {
    post.likes = post.likes.filter(id => id.toString() !== userId)
  } else {
    post.likes.push(req.user._id)

    // Notify post author (not if liking own post)
    if (post.author.toString() !== userId) {
      const notif = await Notification.create({
        recipient: post.author,
        sender:    req.user._id,
        type:      'post_like',
        message:   `${req.user.name} liked your post`,
        link:      '/feed',
        data:      { postId: post._id },
      })
      const io = req.app.get('io')
      emitNotification(io, post.author.toString(), notif)
    }
  }

  await post.save()

  res.json({
    success: true,
    data: {
      liked:      !alreadyLiked,
      likesCount: post.likes.length,
    },
  })
})

// ── POST /api/feed/:id/comment ─────────────────────
const addComment = asyncHandler(async (req, res) => {
  const { text } = req.body
  if (!text?.trim()) { res.status(400); throw new Error('Comment text is required') }

  const post = await Post.findById(req.params.id)
  if (!post || !post.isActive) { res.status(404); throw new Error('Post not found') }

  post.comments.push({ user: req.user._id, text: text.trim() })
  await post.save()

  // Notify post author
  const userId = req.user._id.toString()
  if (post.author.toString() !== userId) {
    const notif = await Notification.create({
      recipient: post.author,
      sender:    req.user._id,
      type:      'post_comment',
      message:   `${req.user.name} commented on your post`,
      link:      '/feed',
      data:      { postId: post._id },
    })
    const io = req.app.get('io')
    emitNotification(io, post.author.toString(), notif)
  }

  const lastComment = post.comments[post.comments.length - 1]
  res.status(201).json({
    success: true,
    data: {
      comment: {
        _id:       lastComment._id,
        user:      { _id: req.user._id, name: req.user.name, avatar: req.user.avatar },
        text:      lastComment.text,
        createdAt: lastComment.createdAt,
      },
      commentsCount: post.comments.length,
    },
  })
})

// ── DELETE /api/feed/:id/comment/:commentId ────────
const deleteComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
  if (!post) { res.status(404); throw new Error('Post not found') }

  const comment = post.comments.id(req.params.commentId)
  if (!comment) { res.status(404); throw new Error('Comment not found') }

  const isOwner = comment.user.toString() === req.user._id.toString()
  const isPostAuthor = post.author.toString() === req.user._id.toString()

  if (!isOwner && !isPostAuthor) {
    res.status(403); throw new Error('Not authorised')
  }

  post.comments = post.comments.filter(c => c._id.toString() !== req.params.commentId)
  await post.save()

  res.json({ success: true, message: 'Comment deleted', data: { commentsCount: post.comments.length } })
})

module.exports = { getFeed, createPost, deletePost, toggleLike, addComment, deleteComment }