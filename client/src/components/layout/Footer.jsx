import { Link } from "react-router-dom";

const links = {
  Platform: ["Practice Arena", "AI Interview", "Live Interviews", "DSA Problems"],
  Domains: ["Frontend", "Backend", "Full Stack", "Machine Learning"],
  Community: ["Leaderboards", "Search Profiles", "Messaging", "Events"],
  Company: ["About", "Blog", "Careers", "Privacy Policy"],
};

export default function Footer() {
  return (
    <footer style={{
      position: "relative", zIndex: 1,
      borderTop: "1px solid rgba(255,255,255,0.06)",
      background: "rgba(8,8,12,0.9)",
      backdropFilter: "blur(20px)",
      padding: "64px 24px 36px",
    }}>
      {/* Top glow */}
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: 600, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
          gap: 40, marginBottom: 56,
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 9,
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 15, fontWeight: 800, color: "#fff",
                boxShadow: "0 0 20px rgba(99,102,241,0.4)",
              }}>P</div>
              <span style={{
                fontSize: 18, fontWeight: 800,
                background: "linear-gradient(90deg, #e2e8f0, #a5b4fc)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                fontFamily: "'Syne', sans-serif",
              }}>PrepVerse</span>
            </div>
            <p style={{
              fontSize: 13.5, color: "rgba(148,163,184,0.7)",
              lineHeight: 1.7, maxWidth: 240,
              fontFamily: "'DM Sans', sans-serif",
            }}>
              The all-in-one platform for placement prep. Practice, interview, and land your dream job.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              {["Twitter", "GitHub", "LinkedIn"].map((s) => (
                <a key={s} href="#" style={{
                  padding: "7px 14px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 8, fontSize: 12,
                  color: "rgba(148,163,184,0.7)",
                  textDecoration: "none",
                  transition: "all 0.2s",
                  fontFamily: "'DM Sans', sans-serif",
                }}
                  onMouseEnter={e => { e.target.style.borderColor = "rgba(99,102,241,0.3)"; e.target.style.color = "#a5b4fc"; }}
                  onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.07)"; e.target.style.color = "rgba(148,163,184,0.7)"; }}
                >{s}</a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading}>
              <h4 style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 13, fontWeight: 700, color: "#e2e8f0",
                marginBottom: 16, letterSpacing: "0.5px", textTransform: "uppercase",
              }}>{heading}</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" style={{
                      fontSize: 13.5, color: "rgba(148,163,184,0.65)",
                      textDecoration: "none", transition: "color 0.2s",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                      onMouseEnter={e => { e.target.style.color = "#a5b4fc"; }}
                      onMouseLeave={e => { e.target.style.color = "rgba(148,163,184,0.65)"; }}
                    >{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          paddingTop: 28,
          borderTop: "1px solid rgba(255,255,255,0.05)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 12,
        }}>
          <p style={{
            fontSize: 12.5, color: "rgba(100,116,139,0.7)",
            fontFamily: "'DM Sans', sans-serif",
          }}>© 2026 PrepVerse. All rights reserved. Built for dreamers, by builders.</p>
          <div style={{ display: "flex", gap: 20 }}>
            {["Terms", "Privacy", "Cookies"].map((t) => (
              <a key={t} href="#" style={{
                fontSize: 12.5, color: "rgba(100,116,139,0.7)",
                textDecoration: "none", fontFamily: "'DM Sans', sans-serif",
                transition: "color 0.2s",
              }}
                onMouseEnter={e => { e.target.style.color = "#a5b4fc"; }}
                onMouseLeave={e => { e.target.style.color = "rgba(100,116,139,0.7)"; }}
              >{t}</a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        @media (max-width: 900px) {
          footer > div > div:first-child { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </footer>
  );
}