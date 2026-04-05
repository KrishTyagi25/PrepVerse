const nodemailer = require('nodemailer')

const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host:   process.env.EMAIL_HOST,
    port:   process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  await transporter.sendMail({
    from:    process.env.EMAIL_FROM,
    to,
    subject,
    html,
  })
}

// Email templates
const welcomeEmail = (name) => `
  <div style="font-family:sans-serif;max-width:500px;margin:auto;padding:32px">
    <h2 style="color:#00d2ff">Welcome to PrepVerse, ${name}! 🚀</h2>
    <p>Your account is ready. Start your prep journey today.</p>
    <a href="${process.env.CLIENT_URL}/dashboard" style="display:inline-block;padding:12px 24px;background:linear-gradient(135deg,#00d2ff,#7c3aed);color:#fff;border-radius:8px;text-decoration:none;font-weight:700">Go to Dashboard →</a>
    <p style="color:#888;margin-top:24px;font-size:12px">PrepVerse · Built for tech dreamers</p>
  </div>
`

const passwordResetEmail = (name, resetUrl) => `
  <div style="font-family:sans-serif;max-width:500px;margin:auto;padding:32px">
    <h2 style="color:#00d2ff">Reset your password</h2>
    <p>Hi ${name}, you requested a password reset. Click below — link expires in 10 minutes.</p>
    <a href="${resetUrl}" style="display:inline-block;padding:12px 24px;background:#f43f5e;color:#fff;border-radius:8px;text-decoration:none;font-weight:700">Reset Password →</a>
    <p style="color:#888;margin-top:24px;font-size:12px">If you didn't request this, ignore this email.</p>
  </div>
`

module.exports = { sendEmail, welcomeEmail, passwordResetEmail }