import React, { useState, useEffect } from "react";
import { useCanvasBg } from "../../hooks/useCanvasBg";
import { useCursor } from "../../hooks/useCursor";
import { Button } from "../../components/ui/Button";
import { GlassCard } from "../../components/ui/Atoms";
import { Badge } from "../../components/ui/Atoms";
import { Logo } from "../../components/ui/Logo";
import { Field } from "../../components/ui/Field";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "../../components/ui/Toast";

/* ── Progress bars for the left panel ── */
const PROGRESS = [
  { label: "DSA", val: 72, color: "#00d2ff" },
  { label: "Frontend", val: 88, color: "#10b981" },
  { label: "Interviews", val: 61, color: "#7c3aed" },
];

export default function LoginPage({ onNavigateSignup }) {
  useCanvasBg("login-canvas");
  useCursor();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [mounted, setMounted] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  useEffect(() => {
    setTimeout(() => setMounted(true), 60);
  }, []);

  const validate = () => {
    const e = {};
    if (!email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email";
    if (!password) e.password = "Password is required";
    else if (password.length < 6) e.password = "Minimum 6 characters";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      await login(email, password);
      toast("Welcome back! 👋", "success");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      const msg =
        err.response?.data?.message ?? "Login failed. Check your credentials.";
      toast(msg, "error");
      setErrors({ email: " ", password: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        fontFamily: "Geist, sans-serif",
        minHeight: "100vh",
        background: "#080909",
        color: "#f8fafc",
        display: "flex",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;700&family=Geist:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />
      <style>{`
        @keyframes authGlow { 0%,100%{transform:scale(1);opacity:.6} 50%{transform:scale(1.1);opacity:1} }
        @keyframes float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes spin     { to{transform:rotate(360deg)} }
        @keyframes dotPulse { 0%,100%{opacity:1} 50%{opacity:.3} }
        input::placeholder  { color:#1e293b }
        input:-webkit-autofill,input:-webkit-autofill:focus {
          -webkit-box-shadow:0 0 0 1000px #111214 inset !important;
          -webkit-text-fill-color:#f8fafc !important;
        }
        body { cursor: none }
        #cur-dot  { width:5px;height:5px;border-radius:50%;background:#00d2ff;box-shadow:0 0 8px #00d2ff;position:fixed;top:0;left:0;pointer-events:none;z-index:9999;transition:transform .08s }
        #cur-ring { width:28px;height:28px;border-radius:50%;border:1.5px solid rgba(0,210,255,.5);position:fixed;top:0;left:0;pointer-events:none;z-index:9998 }
        body.hov #cur-ring { width:44px;height:44px;border-color:rgba(124,58,237,.7);margin:-8px }
        .login-left { display:none }
        .login-mlogo{ display:flex }
        @media(min-width:1024px){ .login-left{ display:flex !important } .login-mlogo{ display:none !important } }
      `}</style>

      {/* Canvas bg */}
      <canvas
        id="login-canvas"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Glow blobs */}
      <div
        style={{
          position: "fixed",
          top: "-20%",
          left: "-10%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(0,210,255,.08) 0%,transparent 65%)",
          pointerEvents: "none",
          zIndex: 1,
          animation: "authGlow 9s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: "-20%",
          right: "-10%",
          width: 450,
          height: 450,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(124,58,237,.07) 0%,transparent 65%)",
          pointerEvents: "none",
          zIndex: 1,
          animation: "authGlow 11s ease-in-out infinite 2s",
        }}
      />
      {/* Grid overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px)",
          backgroundSize: "52px 52px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%,black,transparent)",
        }}
      />

      <div style={{ display: "flex", width: "100%", zIndex: 2 }}>
        {/* ── LEFT PANEL ── */}
        <div
          className="login-left"
          style={{
            flex: "0 0 44%",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "48px 52px",
            background: "linear-gradient(145deg,#0c0d0e 0%,#111214 100%)",
            borderRight: "1px solid rgba(255,255,255,.06)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 1,
              height: "100%",
              background:
                "linear-gradient(180deg,transparent,rgba(0,210,255,.15),transparent)",
            }}
          />

          {/* Logo */}
          <Logo size={32} />

          <div>
            <Badge variant="cyan" pulse>
              12,000+ active learners
            </Badge>

            <h2
              style={{
                fontFamily: "Bricolage Grotesque, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.8rem,2.5vw,2.6rem)",
                lineHeight: 1.08,
                letterSpacing: "-.03em",
                margin: "20px 0 16px",
              }}
            >
              Welcome back.
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg,#00d2ff,#7c3aed)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Keep pushing.
              </span>
            </h2>
            <p
              style={{
                fontSize: 14,
                lineHeight: 1.7,
                color: "#475569",
                maxWidth: 340,
                marginBottom: 28,
              }}
            >
              Your prep streak, problem progress and interview scores are
              waiting.
            </p>

            {/* Progress card — uses GlassCard */}
            <GlassCard
              hover={false}
              className="p-5 mb-6"
              style={{ animation: "float 6s ease-in-out infinite" }}
            >
              <div
                style={{
                  fontFamily: "Bricolage Grotesque, sans-serif",
                  fontWeight: 700,
                  fontSize: 13,
                  color: "#f8fafc",
                  marginBottom: 14,
                }}
              >
                Your Progress Snapshot
              </div>
              {PROGRESS.map(({ label, val, color }) => (
                <div key={label} style={{ marginBottom: 10 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 11,
                      color: "#475569",
                      marginBottom: 5,
                    }}
                  >
                    <span>{label}</span>
                    <span style={{ color }}>{val}%</span>
                  </div>
                  <div
                    style={{
                      height: 4,
                      borderRadius: 999,
                      background: "#1c1f23",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        borderRadius: 999,
                        width: `${val}%`,
                        background: `linear-gradient(90deg,${color}80,${color})`,
                      }}
                    />
                  </div>
                </div>
              ))}
              <div
                style={{
                  display: "flex",
                  gap: 16,
                  marginTop: 16,
                  paddingTop: 14,
                  borderTop: "1px solid rgba(255,255,255,.05)",
                }}
              >
                {[
                  ["🔥", "14", "day streak"],
                  ["⭐", "94", "avg score"],
                  ["✅", "87", "solved"],
                ].map(([ic, n, l]) => (
                  <div key={l} style={{ textAlign: "center", flex: 1 }}>
                    <div
                      style={{
                        fontFamily: "Bricolage Grotesque, sans-serif",
                        fontWeight: 800,
                        fontSize: "1.05rem",
                        color: "#f8fafc",
                      }}
                    >
                      {ic} {n}
                    </div>
                    <div
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        fontSize: 10,
                        color: "#1e293b",
                        marginTop: 1,
                      }}
                    >
                      {l}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {[
                ["🧩", "500+ DSA problems"],
                ["🤖", "AI interviews 24/7"],
                ["👥", "Live recruiters"],
              ].map(([ic, t]) => (
                <Badge key={t} variant="ghost">
                  {ic} {t}
                </Badge>
              ))}
            </div>
          </div>

          <div
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 11,
              color: "#1e293b",
            }}
          >
            © 2025 PrepVerse · Built for tech dreamers
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 24px",
            minHeight: "100vh",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 420,
              opacity: mounted ? 1 : 0,
              transform: mounted ? "none" : "translateY(18px)",
              transition: "opacity .6s ease, transform .6s ease",
            }}
          >
            <div
              className="login-mlogo"
              style={{
                alignItems: "center",
                gap: 8,
                marginBottom: 36,
                justifyContent: "center",
              }}
            >
              <Logo size={26} />
            </div>

            <div style={{ marginBottom: 28 }}>
              <h1
                style={{
                  fontFamily: "Bricolage Grotesque, sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(1.6rem,3vw,2rem)",
                  letterSpacing: "-.03em",
                  lineHeight: 1.1,
                  marginBottom: 8,
                }}
              >
                Sign in to PrepVerse
              </h1>
              <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.6 }}>
                Continue your prep journey and track your progress.
              </p>
            </div>

            {/* Social — reuse Button */}
            <div style={{ display: "flex", gap: 10, marginBottom: 22 }}>
              <Button variant="ghost" size="sm" style={{ flex: 1 }}>
                🔵 Google
              </Button>
              <Button variant="ghost" size="sm" style={{ flex: 1 }}>
                🐙 GitHub
              </Button>
            </div>

            <OrDivider />

            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                marginTop: 22,
              }}
            >
              <Field
                label="Email address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<EmailIcon />}
                error={errors.email}
              />
              <Field
                label="Password"
                type={showPw ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<LockIcon />}
                error={errors.password}
                rightEl={
                  <span onClick={() => setShowPw(!showPw)}>
                    {showPw ? "🙈" : "👁"}
                  </span>
                }
              />

              <div style={{ textAlign: "right", marginTop: -8 }}>
                <a
                  href="#"
                  style={{
                    fontSize: 13,
                    color: "#00d2ff",
                    textDecoration: "none",
                  }}
                >
                  Forgot password?
                </a>
              </div>

              {/* Reuse Button component */}
              <Button
                variant="primary"
                size="lg"
                style={{ width: "100%" }}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      style={{
                        width: 16,
                        height: 16,
                        border: "2px solid rgba(255,255,255,.3)",
                        borderTopColor: "#fff",
                        borderRadius: "50%",
                        animation: "spin .7s linear infinite",
                        display: "inline-block",
                      }}
                    />{" "}
                    Signing in…
                  </>
                ) : (
                  "Sign In →"
                )}
              </Button>

              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  style={{ accentColor: "#00d2ff", width: 14, height: 14 }}
                />
                <span style={{ fontSize: 13, color: "#475569" }}>
                  Keep me signed in for 30 days
                </span>
              </label>
            </form>

            <div
              style={{
                marginTop: 28,
                paddingTop: 20,
                borderTop: "1px solid rgba(255,255,255,.06)",
                textAlign: "center",
                fontSize: 14,
                color: "#475569",
              }}
            >
              Don't have an account?{" "}
              <span
                onClick={onNavigateSignup}
                style={{
                  color: "#00d2ff",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontFamily: "Bricolage Grotesque, sans-serif",
                }}
              >
                Create one free →
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 16,
                marginTop: 20,
              }}
            >
              {["🔒 Secure", "🆓 Free forever", "⚡ Instant access"].map(
                (b) => (
                  <span
                    key={b}
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 10,
                      color: "#1e293b",
                    }}
                  >
                    {b}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cursor elements for useCursor() hook */}
      <div id="cur-dot" />
      <div id="cur-ring" />
    </div>
  );
}

/* ── Shared tiny helpers (move to components/ui/ if you want) ── */

function OrDivider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div
        style={{ flex: 1, height: 1, background: "rgba(255,255,255,.07)" }}
      />
      <span
        style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 11,
          color: "#1e293b",
          letterSpacing: ".06em",
          textTransform: "uppercase",
        }}
      >
        or
      </span>
      <div
        style={{ flex: 1, height: 1, background: "rgba(255,255,255,.07)" }}
      />
    </div>
  );
}

function EmailIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 8 10 6 10-6" />
    </svg>
  );
}
function LockIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
