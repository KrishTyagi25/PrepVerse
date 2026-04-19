const express      = require('express')
const http         = require('http')
const { Server }   = require('socket.io')
const cors         = require('cors')
const helmet       = require('helmet')
const morgan       = require('morgan')
const rateLimit    = require('express-rate-limit')
const cookieParser = require('cookie-parser')
const dotenv       = require('dotenv')

dotenv.config()

const connectDB      = require('./src/config/db')
const errorHandler   = require('./src/middleware/errorHandler')
const { initSocket } = require('./src/socket')

// Routes
const authRoutes         = require('./src/routes/auth')
const userRoutes         = require('./src/routes/users')
const problemRoutes      = require('./src/routes/problems')
const feedRoutes         = require('./src/routes/feed')
const messageRoutes      = require('./src/routes/messages')
const notificationRoutes = require('./src/routes/notifications')
const leaderboardRoutes  = require('./src/routes/leaderboard')
const interviewRoutes    = require('./src/routes/interview')

// Connect DB
connectDB()

const app    = express()
const server = http.createServer(app)

// ── Allowed Origins ────────────────────────────────
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://prepverse-gntaq1bot-krishtyagi25s-projects.vercel.app',
  process.env.CLIENT_URL,
].filter(Boolean)

// ── Socket.io ─────────────────────────────────────
const io = new Server(server, {
  cors: {
    origin:      allowedOrigins,
    credentials: true,
  },
})
initSocket(io)

// Make io accessible in controllers
app.set('io', io)

// ── Global middleware ──────────────────────────────
app.use(helmet())
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error(`CORS blocked: ${origin}`))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
}))
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(cookieParser())

// Global rate limit
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max:      300,
  message:  { success: false, message: 'Too many requests' },
}))

// ── Routes ─────────────────────────────────────────
app.use('/api/auth',          authRoutes)
app.use('/api/users',         userRoutes)
app.use('/api/problems',      problemRoutes)
app.use('/api/feed',          feedRoutes)
app.use('/api/messages',      messageRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/leaderboard',   leaderboardRoutes)
app.use('/api/interview',     interviewRoutes)

// Health check
app.get('/api/health', (req, res) =>
  res.json({ success: true, message: 'PrepVerse API running', env: process.env.NODE_ENV })
)

// 404 handler
app.use((req, res) =>
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` })
)

// ── Error handler (must be last) ───────────────────
app.use(errorHandler)

// ── Start server ───────────────────────────────────
const PORT = process.env.PORT || 5000

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
  console.log(`📡 Socket.io ready`)
  console.log(`🌐 Allowed origins: ${allowedOrigins.join(', ')}`)
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`❌ Unhandled Rejection: ${err.message}`)
  server.close(() => process.exit(1))
})