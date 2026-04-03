import React from 'react'
import { useCountUp } from '../../hooks/useCountUp'
import { SectionLabel } from '../../components/ui/Atoms'

/* ── Stat Cell ───────────────────────────────────────────────── */
function StatCell({ target, suffix, label, sub, delay = 0 }) {
  const ref = useCountUp(target)
  return (
    <div className={`reveal d${delay + 1} text-center py-12 px-8 relative group`}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"/>
      <div className="font-display font-bold leading-none mb-2"
           style={{ fontSize: 'clamp(2.2rem,3.5vw,3rem)' }}>
        <span ref={ref}>0</span>
        <span className="text-cyan">{suffix}</span>
      </div>
      <div className="font-display font-semibold text-[13px] text-t2 tracking-wider uppercase mb-1">{label}</div>
      {sub && <div className="font-mono text-[11px] text-t3">{sub}</div>}
    </div>
  )
}

export function StatsSection() {
  const stats = [
    { target: 12000, suffix: '+', label: 'Active Learners',  sub: 'across all tracks',    delay: 0 },
    { target: 500,   suffix: '+', label: 'DSA Problems',     sub: 'easy → hard',          delay: 1 },
    { target: 98,    suffix: '%', label: 'Placement Rate',   sub: 'past 12 months',       delay: 2 },
    { target: 50,    suffix: '+', label: 'Top Companies',    sub: 'Google, Amazon, Meta…', delay: 3 },
  ]

  return (
    <section className="border-y border-white/[.06]" style={{ background: '#0c0d0e' }}>
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/[.06]">
          {stats.map(s => <StatCell key={s.label} {...s}/>)}
        </div>
      </div>
    </section>
  )
}

/* ── How It Works ────────────────────────────────────────────── */
const steps = [
  {
    n: '01',
    icon: '🎯',
    color: '#00d2ff',
    title: 'Pick Your Track',
    desc: 'Choose from Frontend, Backend, Fullstack or ML. Get a custom learning roadmap with prioritized topics.',
  },
  {
    n: '02',
    icon: '🧩',
    color: '#7c3aed',
    title: 'Practice & Learn',
    desc: 'Solve DSA problems with the in-browser editor. Study domain-specific Q&As and important concept sheets.',
  },
  {
    n: '03',
    icon: '🤖',
    color: '#10b981',
    title: 'Mock Interviews',
    desc: 'Take unlimited AI interviews 24/7. Book sessions with real recruiters for authentic feedback.',
  },
  {
    n: '04',
    icon: '🚀',
    color: '#f59e0b',
    title: 'Get Discovered',
    desc: 'Your verified profile shows real interview scores and progress. Recruiters find and approach you directly.',
  },
]

export function HowItWorks() {
  return (
    <section className="py-28 border-y border-white/[.06]" style={{ background: '#0c0d0e' }}>
      <div className="max-w-[1280px] mx-auto px-6">

        <div className="text-center mb-16 reveal">
          <SectionLabel>⚡ How It Works</SectionLabel>
          <h2 className="font-display font-bold tracking-tight mb-3"
              style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)' }}>
            From Zero to <span className="grad-text">Offer Letter</span>
          </h2>
          <p className="text-t1 text-[15px] max-w-[440px] mx-auto">Four clear steps that take you from beginner to interview-ready in weeks, not months.</p>
        </div>

        {/* Connector */}
        <div className="relative">
          <div className="hidden lg:block absolute top-7 left-[12%] right-[12%] h-px opacity-30"
               style={{ background: 'linear-gradient(90deg,transparent,#00d2ff 20%,#7c3aed 50%,#10b981 80%,transparent)' }}/>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={s.n} className={`reveal d${i+1} relative text-center`}>
                {/* Number circle */}
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 font-display font-black text-[1rem] relative z-10"
                     style={{
                       background: `${s.color}18`,
                       border: `1px solid ${s.color}40`,
                       color: s.color,
                       boxShadow: `0 0 24px ${s.color}25`,
                     }}>
                  {s.n}
                </div>
                <div className="text-2xl mb-3">{s.icon}</div>
                <h3 className="font-display font-bold text-[1rem] text-t0 mb-2">{s.title}</h3>
                <p className="text-t2 text-[13px] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}