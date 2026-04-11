const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    // ── Basic info ──────────────────────────────
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [50, "Name max 50 chars"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password min 8 chars"],
      select: false,
    },

    // ── Profile ─────────────────────────────────
    avatar: { type: String, default: "" },
    bio: { type: String, default: "", maxlength: [200, "Bio max 200 chars"] },
    college: { type: String, default: "", trim: true },
    role: { type: String, enum: ["fe", "be", "fs", "ml"], default: "fe" },
    goal: {
      type: String,
      enum: ["campus", "offcampus", "switch", "explore"],
      default: "campus",
    },

    // ── Social links ─────────────────────────────
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    portfolio: { type: String, default: "" },

    // ── Resume data ──────────────────────────────
    resume: {
      name:       { type: String, default: '' },
      title:      { type: String, default: '' },
      email:      { type: String, default: '' },
      phone:      { type: String, default: '' },
      location:   { type: String, default: '' },
      linkedin:   { type: String, default: '' },
      github:     { type: String, default: '' },
      portfolio:  { type: String, default: '' },
      summary:    { type: String, default: '' },
      experience: { type: mongoose.Schema.Types.Mixed, default: [] },
      education:  { type: mongoose.Schema.Types.Mixed, default: [] },
      projects:   { type: mongoose.Schema.Types.Mixed, default: [] },
      skills:     { type: mongoose.Schema.Types.Mixed, default: {} },
      achievements:{ type: [String], default: [] },
    },

    // ── Roadmap progress ─────────────────────────
    roadmapProgress: {
      role:      { type: String, default: 'fe' },
      completed: { type: mongoose.Schema.Types.Mixed, default: {} },
      targetDate:{ type: Date, default: null },
    },

    // ── Projects ────────────────────────────────
    projects: [{
      name:        { type: String, required: true },
      description: { type: String, default: '' },
      stack:       { type: String, default: '' },
      github:      { type: String, default: '' },
      live:        { type: String, default: '' },
      stars:       { type: Number, default: 0 },
    }],

    // ── 🔔 Notification Preferences (NEW) ───────
    notificationPrefs: {
      emailOnLike:       { type: Boolean, default: true },
      emailOnComment:    { type: Boolean, default: true },
      emailOnConnection: { type: Boolean, default: true },
      pushOnMessage:     { type: Boolean, default: true },
      dailyReminder:     { type: Boolean, default: true },
      weeklyDigest:      { type: Boolean, default: false },
    },

    // ── Prep stats ───────────────────────────────
    xp: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
    lastSolvedAt: { type: Date, default: null },
    score: { type: Number, default: 0 },
    solved: { type: Number, default: 0 },

    // ── Connections ──────────────────────────────
    connections: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    pendingSent: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    pendingReceived: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    // ── Account ─────────────────────────────────
    isVerified: { type: Boolean, default: false },
    onboardingDone: { type: Boolean, default: false },
    isRecruiter: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },

    // ── Tokens ──────────────────────────────────
    refreshToken: { type: String, select: false },
    resetPasswordToken: { type: String, select: false },
    resetPasswordExpire: { type: Date, select: false },
  },
  { timestamps: true },
);

// ── Indexes ─────────────────────────────────────
userSchema.index({ name: "text", college: "text" });
userSchema.index({ xp: -1 });
userSchema.index({ streak: -1 });

// ── Hash password ───────────────────────────────
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

// ── Compare password ────────────────────────────
userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// ── Reset token ─────────────────────────────────
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

// ── Streak logic ────────────────────────────────
userSchema.methods.updateStreak = function () {
  const now = new Date();
  const last = this.lastSolvedAt;
  const oneDayMs = 24 * 60 * 60 * 1000;

  if (!last) {
    this.streak = 1;
    this.lastSolvedAt = now;
    return;
  }

  const diffMs = now - last;
  const diffDays = Math.floor(diffMs / oneDayMs);

  if (diffDays === 0) return;
  if (diffDays === 1) this.streak += 1;
  else this.streak = 1;

  this.lastSolvedAt = now;
};

// ── Public profile ──────────────────────────────
userSchema.methods.toPublicProfile = function () {
  return {
    _id: this._id,
    name: this.name,
    avatar: this.avatar,
    bio: this.bio,
    college: this.college,
    role: this.role,
    github: this.github,
    linkedin: this.linkedin,
    portfolio: this.portfolio,
    xp: this.xp,
    streak: this.streak,
    score: this.score,
    solved: this.solved,
    connections: this.connections.length,
    createdAt: this.createdAt,
  };
};

module.exports = mongoose.model("User", userSchema);