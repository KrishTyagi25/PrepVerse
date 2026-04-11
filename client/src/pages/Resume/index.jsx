import React, { useState } from "react";
import { useEffect } from "react";
import { userService } from "../../api/services/userService";
import { useAuth } from "../../context/AuthContext";
import { Navbar } from "../../components/layout/Navbar";
import { useCanvasBg } from "../../hooks/useCanvasBg";
import { useCursor } from "../../hooks/useCursor";
import { useToast } from "../../components/ui/Toast";
import { Badge } from "../../components/ui/Atoms";
import { Button } from "../../components/ui/Button";
import { ResumeEditor } from "./ResumeEditor";
import { ResumePreview } from "./ResumePreview";
import { ATSTips } from "./ATSTips";
import html2pdf from "html2pdf.js";

export const DEFAULT_RESUME = {
  name: "Aryan Sharma",
  title: "Frontend Developer",
  email: "aryan@example.com",
  phone: "+91 98765 43210",
  location: "Delhi, India",
  linkedin: "linkedin.com/in/aryan",
  github: "github.com/aryan",
  portfolio: "aryan.dev",
  summary:
    "Passionate frontend developer with strong DSA fundamentals. 150+ problems solved on PrepVerse. Targeting top product companies.",
  experience: [
    {
      company: "Startup XYZ",
      role: "Frontend Intern",
      duration: "May 2024 – Aug 2024",
      bullets: [
        "Built 5 React components used by 10k+ users",
        "Reduced bundle size by 32% using code splitting",
        "Collaborated with design team on a full UI redesign",
      ],
    },
  ],
  education: [
    {
      college: "Delhi Technological University",
      degree: "B.Tech Computer Science",
      year: "2022 – 2026",
      gpa: "8.6 / 10",
    },
  ],
  projects: [
    {
      name: "PrepVerse",
      stack: "React · Node.js · MongoDB",
      desc: "Full-stack interview prep platform with AI mock interviews and DSA practice.",
      github: "github.com/aryan/prepverse",
      live: "prepverse.vercel.app",
    },
    {
      name: "AlgoVisualizer",
      stack: "React · D3.js",
      desc: "Interactive visualizer for 15+ sorting and graph algorithms. Used by 2k+ students.",
      github: "github.com/aryan/algo-viz",
      live: "",
    },
  ],
  skills: {
    languages: ["JavaScript", "Python", "Java", "C++"],
    frameworks: ["React", "Node.js", "Express", "TailwindCSS"],
    tools: ["Git", "Docker", "VS Code", "Figma"],
    databases: ["MongoDB", "PostgreSQL", "Redis"],
  },
  achievements: [
    "🔥 14-day streak on PrepVerse — Top 6% globally",
    "⭐ Average interview score 84/100 across 8 mock sessions",
    "🏆 2nd place — Internal Hackathon, DTU (200+ participants)",
  ],
};

export default function ResumePage() {
  useCanvasBg("resume-canvas");
  useCursor();
  const toast = useToast();

  const { user } = useAuth();
  const [saving, setSaving] = useState(false);

  const [resume, setResume] = useState(DEFAULT_RESUME);
  const [tab, setTab] = useState("editor"); // 'editor' | 'preview' | 'tips'
  const [template, setTemplate] = useState("classic"); // 'classic' | 'modern' | 'minimal'

  const update = (field, value) => setResume((r) => ({ ...r, [field]: value }));

  useEffect(() => {
    if (!user) return;
    userService
      .getResume()
      .then(({ data }) => {
        const saved = data.data.resume;
        if (saved?.name) {
          setResume(saved);
        } else {
          setResume((r) => ({
            ...r,
            name: user.name ?? r.name,
            email: user.email ?? r.email,
            github: user.github ?? r.github,
            linkedin: user.linkedin ?? r.linkedin,
          }));
        }
      })
      .catch(() => {});
  }, [user]);

  useEffect(() => {
    if (!user) return;

    setSaving(true);

    const timer = setTimeout(() => {
      userService
        .saveResume(resume)
        .then(() => setSaving(false))
        .catch(() => setSaving(false));
    }, 2000);

    return () => clearTimeout(timer);
  }, [resume]);

  const handleDownload = () => {
    const element = document.getElementById("resume-preview-content");
    if (!element) {
      toast("Preview not found", "error");
      return;
    }

    const opt = {
      margin: [8, 8, 8, 8],
      filename: `${resume.name.replace(/\s+/g, "_")}_Resume.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, letterRendering: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };

    toast("Generating PDF…", "info", 2000);
    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => toast("✅ Resume downloaded!", "success"))
      .catch(() => toast("PDF generation failed", "error"));
  };

  const TEMPLATES = ["classic", "modern", "minimal"];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#080909",
        color: "#f8fafc",
        fontFamily: "Geist,sans-serif",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;700&family=Geist:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />
      <style>{`
        body{cursor:none}
        #cur-dot{width:5px;height:5px;border-radius:50%;background:#00d2ff;box-shadow:0 0 8px #00d2ff;position:fixed;top:0;left:0;pointer-events:none;z-index:9999}
        #cur-ring{width:28px;height:28px;border-radius:50%;border:1.5px solid rgba(0,210,255,.5);position:fixed;top:0;left:0;pointer-events:none;z-index:9998;transition:width .2s,height .2s}
        body.hov #cur-ring{width:44px;height:44px;border-color:rgba(124,58,237,.7);margin:-8px}
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-track{background:transparent} ::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:4px}
        textarea::placeholder,input::placeholder{color:#1e293b}
      `}</style>
      <canvas
        id="resume-canvas"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />

        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            background: "rgba(8,9,9,.95)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(255,255,255,.07)",
            padding: "12px 24px",
            display: "flex",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
            marginTop: 64,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              flex: 1,
              minWidth: 200,
            }}
          >
            <Badge variant="violet" pulse>
              Resume Builder
            </Badge>
            <span
              style={{
                fontFamily: "Bricolage Grotesque,sans-serif",
                fontWeight: 700,
                fontSize: 15,
                color: "#f8fafc",
              }}
            >
              {resume.name}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              gap: 4,
              background: "rgba(255,255,255,.04)",
              border: "1px solid rgba(255,255,255,.07)",
              borderRadius: 10,
              padding: 4,
            }}
          >
            {[
              ["editor", "✏️ Edit"],
              ["preview", "👁 Preview"],
              ["tips", "💡 ATS Tips"],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 7,
                  border: "none",
                  background:
                    tab === id ? "rgba(0,210,255,.15)" : "transparent",
                  fontFamily: "Bricolage Grotesque,sans-serif",
                  fontWeight: 600,
                  fontSize: 12,
                  color: tab === id ? "#00d2ff" : "#475569",
                  cursor: "pointer",
                  transition: "all .15s",
                  outline: tab === id ? "1px solid rgba(0,210,255,.3)" : "none",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                fontFamily: "JetBrains Mono,monospace",
                fontSize: 11,
                color: "#475569",
              }}
            >
              Template
            </span>
            <div style={{ display: "flex", gap: 4 }}>
              {TEMPLATES.map((t) => (
                <button
                  key={t}
                  onClick={() => setTemplate(t)}
                  style={{
                    padding: "4px 10px",
                    borderRadius: 6,
                    border: `1px solid ${template === t ? "rgba(124,58,237,.4)" : "rgba(255,255,255,.07)"}`,
                    background:
                      template === t
                        ? "rgba(124,58,237,.1)"
                        : "rgba(255,255,255,.025)",
                    fontFamily: "JetBrains Mono,monospace",
                    fontSize: 10,
                    color: template === t ? "#a78bfa" : "#475569",
                    cursor: "pointer",
                    transition: "all .15s",
                    textTransform: "capitalize",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                fontSize: 11,
                fontFamily: "JetBrains Mono,monospace",
                color: saving ? "#f59e0b" : "#10b981",
              }}
            >
              {saving ? "Saving..." : "Saved ✓"}
            </span>
            <button
              onClick={async () => {
                setSaving(true);
                try {
                  await userService.saveResume(resume);
                  toast("Resume saved ✓", "success");
                } catch {
                  toast("Save failed", "error");
                } finally {
                  setSaving(false);
                }
              }}
              style={{
                padding: "7px 14px",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,.08)",
                background: "rgba(255,255,255,.03)",
                fontFamily: "Bricolage Grotesque,sans-serif",
                fontWeight: 600,
                fontSize: 12,
                color: "#94a3b8",
                cursor: "pointer",
              }}
            >
              {saving ? "Saving…" : "💾 Save"}
            </button>

            <Button variant="primary" size="sm" onClick={handleDownload}>
              ⬇ Download PDF
            </Button>
          </div>
        </div>

        <main
          style={{
            maxWidth: 1300,
            margin: "0 auto",
            padding: "28px 24px 60px",
          }}
        >
          {tab === "editor" && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 24,
                alignItems: "start",
              }}
            >
              <ResumeEditor resume={resume} update={update} />
              <div style={{ position: "sticky", top: 130 }}>
                <ResumePreview resume={resume} template={template} />
              </div>
            </div>
          )}
          {tab === "preview" && (
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
              <ResumePreview resume={resume} template={template} large />
            </div>
          )}
          {tab === "tips" && <ATSTips resume={resume} />}
        </main>
      </div>
      <div id="cur-dot" />
      <div id="cur-ring" />
    </div>
  );
}
