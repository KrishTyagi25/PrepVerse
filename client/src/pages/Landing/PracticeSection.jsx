import React, { useState } from 'react'
import { SectionLabel, DiffBadge, GlassCard } from '../../components/ui/Atoms'
import { Button } from '../../components/ui/Button'

/* ── DSA Problems Preview ────────────────────────────────────── */
const problems = [
  { id: 1,  title: 'Two Sum',                    topic: 'Arrays',  diff: 'Easy',   company: 'Google' },
  { id: 2,  title: 'Longest Substring Without Repeating', topic: 'Strings', diff: 'Medium', company: 'Amazon' },
  { id: 3,  title: 'Binary Tree Level Order',    topic: 'Trees',   diff: 'Medium', company: 'Microsoft' },
  { id: 4,  title: 'Coin Change',                topic: 'DP',      diff: 'Medium', company: 'Meta' },
  { id: 5,  title: 'Merge K Sorted Lists',       topic: 'Heap',    diff: 'Hard',   company: 'Google' },
  { id: 6,  title: 'Word Break II',              topic: 'DP',      diff: 'Hard',   company: 'Amazon' },
]

const topics = ['All', 'Arrays', 'Strings', 'Trees', 'DP', 'Graphs', 'Heap', 'Backtracking']

export function DSAPracticeSection() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? problems : problems.filter(p => p.topic === active)

  return (
    <section id="practice" className="py-28">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left — text */}
          <div className="reveal-l">
            <SectionLabel>🧩 DSA + Code Practice</SectionLabel>
            <h2 className="font-display font-bold tracking-tight mt-1 mb-4"
                style={{ fontSize: 'clamp(1.7rem,3vw,2.5rem)' }}>
              Problems That <span className="grad-text">Actually</span> Get You Hired
            </h2>
            <p className="text-t1 text-[15px] leading-relaxed mb-8">
              Every problem is sourced from real interview reports. Hints, multiple solutions with complexity 
              analysis, and company tags — so you know exactly what to prioritise.
            </p>

            {[
              ['🎯', 'Company-Filtered Sets', 'Filter by Google, Amazon, Flipkart and 50+ companies'],
              ['⚡', 'In-Browser Code Editor', 'Run JS, Python, Java, C++ instantly — no setup'],
              ['🤖', 'AI Hints Engine',         'Get progressive hints without spoiling the answer'],
              ['📊', 'Weakness Analytics',      'Know exactly which topics need more work'],
              ['🔄', 'Spaced Repetition',       'Smart review scheduling keeps concepts fresh'],
            ].map(([icon, title, desc]) => (
              <div key={title} className="flex gap-4 mb-5 group">
                <div className="w-9 h-9 flex-shrink-0 rounded-lg flex items-center justify-center bg-bg3 border border-white/[.07] text-base transition-all duration-200 group-hover:border-cyan/30">
                  {icon}
                </div>
                <div>
                  <div className="font-display font-semibold text-[14px] text-t0 mb-0.5">{title}</div>
                  <div className="font-body text-[13px] text-t2 leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}

            <Button variant="primary" size="md" className="mt-2" iconRight={<span>→</span>}>
              Browse All 500+ Problems
            </Button>
          </div>

          {/* Right — problems table */}
          <div className="reveal-r">
            {/* Topic filter */}
            <div className="flex flex-wrap gap-2 mb-4">
              {topics.map(t => (
                <button
                  key={t}
                  onClick={() => setActive(t)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-[11px] border transition-all duration-200 cursor-none ${
                    t === active
                      ? 'bg-cyan/10 border-cyan/35 text-cyan'
                      : 'bg-bg3 border-white/[.07] text-t2 hover:border-white/[.14] hover:text-t1'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Table */}
            <div className="rounded-2xl border border-white/[.07] overflow-hidden bg-bg2">
              {/* Header */}
              <div className="grid grid-cols-[1fr,90px,80px] gap-3 px-5 py-3 bg-bg3 border-b border-white/[.06] font-mono text-[10px] text-t3 tracking-widest uppercase">
                <span>Problem</span>
                <span>Difficulty</span>
                <span>Company</span>
              </div>

              {/* Rows */}
              {filtered.map((p, i) => (
                <div
                  key={p.id}
                  className={`grid grid-cols-[1fr,90px,80px] gap-3 px-5 py-3.5 items-center border-b border-white/[.04] cursor-none group transition-all duration-200 hover:bg-white/[.025] ${
                    i === filtered.length - 1 ? 'border-b-0' : ''
                  }`}
                >
                  <div className="font-body text-[13px] text-t1 group-hover:text-t0 transition-colors">
                    {p.title}
                  </div>
                  <DiffBadge level={p.diff}/>
                  <span className="font-mono text-[11px] text-t3 group-hover:text-t2 transition-colors">
                    {p.company}
                  </span>
                </div>
              ))}

              {/* Footer */}
              <div className="px-5 py-3 bg-bg3 border-t border-white/[.06] flex items-center justify-between">
                <span className="font-mono text-[11px] text-t3">Showing {filtered.length} of 500+</span>
                <span className="font-mono text-[11px] text-cyan cursor-none hover:underline">View all →</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Features Grid ───────────────────────────────────────────── */
const features = [
  {
    n: '01', icon: '🤖', grad: 'from-cyan to-violet',
    title: 'AI Mock Interviews',
    desc: '24/7 AI interviewer that adapts to your answers, asks real follow-ups, evaluates communication style and delivers detailed scoring.',
  },
  {
    n: '02', icon: '👨‍💼', grad: 'from-emerald to-cyan',
    title: 'Live Recruiter Sessions',
    desc: 'Book slots with real engineers from top companies. Authentic interview simulation with written feedback reports after each session.',
  },
  {
    n: '03', icon: '📚', grad: 'from-violet to-rose',
    title: 'Written Q&A Library',
    desc: '5,000+ curated written questions with model answers across all tracks. Study on the go — no code editor required.',
  },
  {
    n: '04', icon: '🏗️', grad: 'from-amber to-rose',
    title: 'System Design Prep',
    desc: 'End-to-end system design modules covering HLD, LLD, CAP theorem, databases, caching and real FAANG design questions.',
  },
  {
    n: '05', icon: '🔍', grad: 'from-cyan to-emerald',
    title: 'Recruiter Dashboard',
    desc: 'Recruiters search and filter candidates by role, skill, score and activity. View verified prep metrics and message directly.',
  },
  {
    n: '06', icon: '💬', grad: 'from-violet to-cyan',
    title: 'Community & DMs',
    desc: 'LinkedIn-style discovery — search profiles, follow peers, send DMs, share resources and build your tech network.',
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-28 border-t border-white/[.06]">
      <div className="max-w-[1280px] mx-auto px-6">

        <div className="text-center mb-14 reveal">
          <SectionLabel>✦ Full Platform</SectionLabel>
          <h2 className="font-display font-bold tracking-tight mb-3"
              style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)' }}>
            Everything in <span className="grad-text">One Place</span>
          </h2>
          <p className="text-t1 text-[15px] max-w-[480px] mx-auto">
            Six core systems working together — so you never need to juggle five different tools to prepare.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={f.n}
              className={`reveal d${(i % 3) + 1} group relative p-6 rounded-2xl bg-bg2 border border-white/[.07] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-white/[.14]`}
            >
              {/* Top gradient bar */}
              <div className={`absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r ${f.grad} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}/>

              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-bg3 border border-white/[.06] text-lg transition-all duration-200 group-hover:bg-bg4">
                  {f.icon}
                </div>
                <span className="font-mono text-[11px] text-t3">{f.n}</span>
              </div>
              <h3 className="font-display font-bold text-[1rem] text-t0 mb-2.5">{f.title}</h3>
              <p className="text-t2 text-[13px] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}