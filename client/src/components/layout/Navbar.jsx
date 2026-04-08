import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { GlobalSearchBar } from "../ui/GlobalSearchBar";
import { notificationService } from "../../api/notificationService";
import { useAuth } from "../../context/AuthContext";

const links = [
  { label: "Practice", href: "/practice" },
  { label: "Interview", href: "/interview" },
  { label: "Daily", href: "/daily" },
  { label: "Feed", href: "/feed" },
  { label: "People", href: "/people" },
  { label: "Messages", href: "/messages" },
  { label: "Leaderboard", href: "/leaderboard" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const { user, logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className={`
      fixed top-0 left-0 right-0 z-50
      transition-all duration-400
      ${scrolled
          ? "py-3 bg-bg/85 backdrop-blur-xl border-b border-white/[.06]"
          : "py-5 bg-transparent"
        }
    `}
    >
      <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 group cursor-none">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <polygon
              points="15,2 28,26 2,26"
              stroke="url(#nl)"
              strokeWidth="2"
              fill="none"
            />
            <polygon points="15,10 22,22 8,22" fill="url(#nl)" opacity=".35" />
            <defs>
              <linearGradient id="nl" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00d2ff" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
            </defs>
          </svg>
          <span className="font-display font-bold text-[1.1rem] tracking-tight text-t0">
            Prep<span className="text-cyan">Verse</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="px-3.5 py-2 rounded-lg font-body text-[13px] text-t2 hover:text-t0 hover:bg-white/[.04] transition-all duration-200 cursor-none"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right */}
        <div className="hidden md:flex items-center gap-3">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald/10 border border-emerald/25 font-mono text-[10px] text-emerald tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse2" />
            Beta Live
          </span>
          <GlobalSearchBar />
          {isLoggedIn ? (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <NotifBell />
              <div
                onClick={() => navigate(`/profile/${user?._id}`)}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  background: "rgba(0,210,255,.15)",
                  border: "1.5px solid rgba(0,210,255,.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "Bricolage Grotesque,sans-serif",
                  fontWeight: 800,
                  fontSize: 12,
                  color: "#00d2ff",
                  cursor: "pointer",
                }}
              >
                {user?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Sign out
              </Button>
            </div>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate("/signup")}
              >
                Get Started
              </Button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg border border-white/[.07] text-t1 cursor-none"
          onClick={() => setOpen(!open)}
        >
          <svg
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {open ? (
              <>
                <line x1="4" y1="4" x2="14" y2="14" />
                <line x1="14" y1="4" x2="4" y2="14" />
              </>
            ) : (
              <>
                <line x1="2" y1="6" x2="16" y2="6" />
                <line x1="2" y1="10" x2="16" y2="10" />
                <line x1="2" y1="14" x2="16" y2="14" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden mt-2 mx-4 p-4 rounded-2xl bg-bg2 border border-white/[.08] flex flex-col gap-2">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="px-3 py-2 rounded-lg text-t1 hover:text-t0 hover:bg-white/[.04] text-[14px] font-body"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <div className="flex gap-2 mt-2 pt-2 border-t border-white/[.06]">
            <Button variant="ghost" size="sm" className="flex-1">
              Sign In
            </Button>
            <Button variant="primary" size="sm" className="flex-1">
              Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

function NotifBell() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const UNREAD = 4;
  const { user } = useAuth();
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    if (!user) return;
    notificationService
      .getNotifications({ limit: 1 })
      .then(({ data }) => setUnread(data.data.unreadCount))
      .catch(() => { });
  }, [user]);

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          position: "relative",
          background: "rgba(255,255,255,.04)",
          border: "1px solid rgba(255,255,255,.07)",
          borderRadius: 9,
          width: 36,
          height: 36,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "#475569",
          fontSize: 16,
          transition: "all .15s",
        }}
      >
        🔔
        {UNREAD > 0 && (
          <span
            style={{
              position: "absolute",
              top: -4,
              right: -4,
              width: 16,
              height: 16,
              borderRadius: "50%",
              background: "#f43f5e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "JetBrains Mono,monospace",
              fontSize: 9,
              color: "#fff",
              fontWeight: 700,
              border: "2px solid #080909",
            }}
          >
            {UNREAD}
          </span>
        )}
      </button>
      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            style={{ position: "fixed", inset: 0, zIndex: 100 }}
          />
          <div
            style={{
              position: "absolute",
              top: 44,
              right: 0,
              width: 320,
              background: "#111214",
              border: "1px solid rgba(255,255,255,.09)",
              borderRadius: 14,
              boxShadow: "0 16px 48px rgba(0,0,0,.7)",
              zIndex: 101,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "12px 16px",
                borderBottom: "1px solid rgba(255,255,255,.06)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "Bricolage Grotesque,sans-serif",
                  fontWeight: 700,
                  fontSize: 14,
                  color: "#f8fafc",
                }}
              >
                Notifications
              </span>
              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/notifications");
                }}
                style={{
                  fontFamily: "JetBrains Mono,monospace",
                  fontSize: 10,
                  color: "#00d2ff",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                See all →
              </button>
            </div>
            {[
              {
                icon: "🤝",
                text: "Priya Sharma sent you a connection request",
                time: "2m",
              },
              { icon: "♥", text: "Rahul Verma liked your post", time: "15m" },
              {
                icon: "🤖",
                text: "Interview session confirmed for Today 3 PM",
                time: "1h",
              },
              {
                icon: "🏅",
                text: "You earned the 7-Day Streak badge!",
                time: "2h",
              },
            ].map((n, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 10,
                  padding: "12px 16px",
                  borderBottom: "1px solid rgba(255,255,255,.04)",
                  cursor: "pointer",
                  transition: "background .15s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(255,255,255,.03)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <span style={{ fontSize: 16, flexShrink: 0 }}>{n.icon}</span>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "Geist,sans-serif",
                      fontSize: 12,
                      color: "#94a3b8",
                      lineHeight: 1.5,
                    }}
                  >
                    {n.text}
                  </div>
                  <div
                    style={{
                      fontFamily: "JetBrains Mono,monospace",
                      fontSize: 9,
                      color: "#1e293b",
                      marginTop: 2,
                    }}
                  >
                    {n.time} ago
                  </div>
                </div>
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#00d2ff",
                    flexShrink: 0,
                    marginTop: 4,
                  }}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
