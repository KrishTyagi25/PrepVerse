const jwt                = require('jsonwebtoken')
const User               = require('../models/User')
const { Message, Conversation } = require('../models/Message')
const Notification       = require('../models/Notification')

const onlineUsers = new Map()   // userId → socketId

const initSocket = (io) => {

  // ── Auth middleware ────────────────────────────
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token || socket.handshake.headers?.authorization?.split(' ')[1]
      if (!token) return next(new Error('Authentication required'))
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      socket.userId = decoded.id
      next()
    } catch {
      next(new Error('Invalid token'))
    }
  })

  io.on('connection', (socket) => {
    const userId = socket.userId
    onlineUsers.set(userId, socket.id)

    // Tell everyone this user is online
    socket.broadcast.emit('user:online', { userId })

    // ── Join personal room ─────────────────────
    socket.join(`user:${userId}`)

    // ── Get online status of connections ───────
    socket.on('users:online_status', async (userIds) => {
      const statuses = {}
      userIds.forEach(id => { statuses[id] = onlineUsers.has(id) })
      socket.emit('users:online_status', statuses)
    })

    // ── Chat ────────────────────────────────────
    socket.on('message:send', async ({ conversationId, text }) => {
      try {
        const convo = await Conversation.findById(conversationId)
        if (!convo || !convo.participants.includes(userId)) return

        const msg = await Message.create({ conversation: conversationId, sender: userId, text, readBy: [userId] })
        const populated = await msg.populate('sender', 'name avatar')

        convo.lastMessage  = msg._id
        convo.lastActivity = new Date()
        await convo.save()

        // Emit to all participants
        convo.participants.forEach(participantId => {
          io.to(`user:${participantId}`).emit('message:new', { conversationId, message: populated })
        })

        // Notify receiver if offline
        convo.participants
          .filter(pid => pid.toString() !== userId)
          .forEach(async (pid) => {
            if (!onlineUsers.has(pid.toString())) {
              await Notification.create({
                recipient: pid,
                sender:    userId,
                type:      'post_like',  // repurpose as message notif
                message:   'sent you a message',
                link:      '/messages',
              })
            }
          })
      } catch (err) {
        socket.emit('error', { message: 'Failed to send message' })
      }
    })

    socket.on('message:typing', ({ conversationId, isTyping }) => {
      socket.to(`conversation:${conversationId}`).emit('message:typing', { userId, isTyping })
    })

    socket.on('conversation:join', (conversationId) => {
      socket.join(`conversation:${conversationId}`)
    })

    socket.on('message:read', async ({ conversationId }) => {
      await Message.updateMany(
        { conversation: conversationId, readBy: { $ne: userId } },
        { $addToSet: { readBy: userId } }
      )
      socket.to(`conversation:${conversationId}`).emit('message:read', { conversationId, userId })
    })

    // ── Notifications ────────────────────────────
    socket.on('notifications:read_all', async () => {
      await Notification.updateMany({ recipient: userId, read: false }, { read: true })
    })

    // ── Disconnect ───────────────────────────────
    socket.on('disconnect', () => {
      onlineUsers.delete(userId)
      socket.broadcast.emit('user:offline', { userId })
    })
  })
}

// Helper — emit notification to a user if online
const emitNotification = (io, userId, notification) => {
  io.to(`user:${userId}`).emit('notification:new', notification)
}

module.exports = { initSocket, emitNotification, onlineUsers }