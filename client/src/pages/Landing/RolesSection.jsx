import React from 'react'
import { SectionLabel, GlassCard } from '../../components/ui/Atoms'

/* ── Ticker ──────────────────────────────────────────────────── */
export function Ticker() {
  const items = [
    'DSA Mastery', 'AI Interviews', 'Frontend Prep', 'Backend Prep',
    'ML Interviews', 'Live Recruiters', 'Fullstack Prep', 'Code Practice',
    'Placement Ready', 'System Design', 'Community Network', 'Offer Letters',
  ]
  const full = [...items, ...items]

  return (
    <div className="py-3.5 border-y border-white/[.06] overflow-hidden relative"
         style={{ background: 'linear-gradient(90deg,#080909,#0c0d0e,#080909)' }}>
      <div className="flex gap-0 w-max" style={{ animation: 'ticker 30s linear infinite' }}>
        {full.map((item, i) => (
          <div key={i} className="flex items-center gap-3 px-8 font-mono text-[11px] text-t3 tracking-widest uppercase whitespace-nowrap">
            <span className="text-cyan/40">◆</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Roles ───────────────────────────────────────────────────── */
const roles = [
  {
    id: 'fe',
    icon: '⚛️',
    tag: 'Frontend',
    name: 'Frontend Developer',
    desc: 'React, TypeScript, browser internals, accessibility, performance, CSS architecture and UI system design.',
    topics: ['React / Vue', 'TypeScript', 'CSS Systems', 'Browser APIs', 'Performance', 'Testing'],
    color: '#00d2ff',
    glow:  'rgba(0,210,255,.1)',
    border:'rgba(0,210,255,.25)',
    problems: 142,
    qs: 380,
  },
  {
    id: 'be',
    icon: '⚙️',
    tag: 'Backend',
    name: 'Backend Developer',
    desc: 'Node.js, databases, REST / GraphQL APIs, microservices, caching layers and distributed systems.',
    topics: ['Node.js', 'Databases', 'REST/GraphQL', 'Redis', 'System Design', 'Docker'],
    color: '#10b981',
    glow:  'rgba(16,185,129,.1)',
    border:'rgba(16,185,129,.25)',
    problems: 165,
    qs: 420,
  },
  {
    id: 'fs',
    icon: '🔷',
    tag: 'Fullstack',
    name: 'Fullstack Developer',
    desc: 'End-to-end engineering combining modern frontend with scalable backend, DevOps and deployment.',
    topics: ['MERN Stack', 'Next.js', 'CI/CD', 'AWS', 'Auth', 'Serverless'],
    color: '#7c3aed',
    glow:  'rgba(124,58,237,.1)',
    border:'rgba(124,58,237,.25)',
    problems: 198,
    qs: 510,
  },
  {
    id: 'ml',
    icon: '🧠',
    tag: 'ML / AI',
    name: 'ML Engineer',
    desc: 'Algorithms, deep learning, NLP, computer vision, statistical ML and MLOps for AI-first roles.',
    topics: ['Python', 'PyTorch', 'Statistics', 'NLP', 'MLOps', 'Transformers'],
    color: '#f59e0b',
    glow:  'rgba(245,158,11,.1)',
    border:'rgba(245,158,11,.25)',
    problems: 110,
    qs: 295,
  },
]

export function RolesSection() {
  return (
    <section id="roles" className="py-28 relative">
      <div className="max-w-[1280px] mx-auto px-6">

        <div className="text-center mb-14 reveal">
          <SectionLabel>🎯 Career Tracks</SectionLabel>
          <h2 className="font-display font-bold leading-tight tracking-tight mb-4"
              style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)' }}>
            Pick Your <span className="grad-text">Role. Own It.</span>
          </h2>
          <p className="text-t1 text-[15px] max-w-[480px] mx-auto leading-relaxed">
            Structured roadmaps, curated question banks and targeted interview prep — built around how companies actually hire.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {roles.map((r, i) => (
            <div
              key={r.id}
              className={`reveal d${i + 1} group relative p-6 rounded-2xl bg-bg2 border border-white/[.07] overflow-hidden cursor-none transition-all duration-350`}
              style={{ '--card-glow': r.glow, '--card-border': r.border, '--card-color': r.color }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = r.border
                e.currentTarget.style.transform    = 'translateY(-6px)'
                e.currentTarget.style.boxShadow    = `0 24px 56px rgba(0,0,0,.5), 0 0 40px ${r.glow}`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = ''
                e.currentTarget.style.transform    = ''
                e.currentTarget.style.boxShadow    = ''
              }}
            >
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px]"
                   style={{ background: `linear-gradient(90deg,transparent,${r.color},transparent)`, opacity: 0 }}
                   ref={el => el && (el.style.opacity = '0')}
                   data-accent/>

              {/* Icon */}
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4 border border-white/[.06] bg-white/[.03] transition-all duration-300 group-hover:border-current"
                   style={{ '--tw-border-opacity': 1 }}>
                {r.icon}
              </div>

              {/* Tag */}
              <div className="font-mono text-[10px] tracking-widest uppercase mb-2.5 font-semibold"
                   style={{ color: r.color }}>
                {r.tag}
              </div>

              <h3 className="font-display font-bold text-[1rem] text-t0 mb-2.5">{r.name}</h3>
              <p className="text-t2 text-[13px] leading-relaxed mb-4">{r.desc}</p>

              {/* Topics */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {r.topics.map(t => (
                  <span key={t} className="px-2 py-0.5 rounded-md bg-white/[.03] border border-white/[.06] font-mono text-[10px] text-t2">
                    {t}
                  </span>
                ))}
              </div>

              {/* Stats row */}
              <div className="flex items-center justify-between pt-4 border-t border-white/[.06] font-mono text-[11px]">
                <span className="text-t2">{r.problems} problems</span>
                <span className="text-t2">{r.qs} Q&As</span>
              </div>

              {/* CTA */}
              <div className="flex items-center gap-1.5 mt-4 text-[13px] font-display font-semibold text-t3 group-hover:text-t1 transition-all duration-200">
                <span>Explore track</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}