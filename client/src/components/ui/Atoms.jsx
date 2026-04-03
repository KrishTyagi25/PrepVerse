import React from 'react'

/* ── Badge ─────────────────────────────────────────────────── */
export function Badge({ variant = 'cyan', pulse = false, children }) {
  const colors = {
    cyan: 'bg-cyan/10 border-cyan/25 text-cyan',
    violet: 'bg-violet/10 border-violet/25 text-violet',
    emerald: 'bg-emerald/10 border-emerald/25 text-emerald',
    amber: 'bg-amber/10 border-amber/25 text-amber',
    rose: 'bg-rose/10 border-rose/25 text-rose',
    ghost: 'bg-white/[.04] border-white/[.08] text-t1',
  }
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border font-mono text-[10px] tracking-widest uppercase ${colors[variant]}`}>
      {pulse && (
        <span className={`w-1.5 h-1.5 rounded-full bg-current animate-pulse2`} />
      )}
      {children}
    </span>
  )
}

/* ── Chip ──────────────────────────────────────────────────── */
export function Chip({ children, active = false }) {
  return (
    <span className={`
      inline-flex px-3 py-1 rounded-full font-mono text-[11px] border transition-all duration-200 cursor-none
      ${active
        ? 'bg-cyan/10 border-cyan/35 text-cyan'
        : 'bg-white/[.03] border-white/[.07] text-t2 hover:border-white/[.14] hover:text-t1'}
    `}>
      {children}
    </span>
  )
}

/* ── SectionLabel ──────────────────────────────────────────── */
export function SectionLabel({ children }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[.03] border border-white/[.07] font-mono text-[10px] text-t2 tracking-widest uppercase mb-4">
      {children}
    </div>
  )
}

/* ── DiffBadge ─────────────────────────────────────────────── */
export function DiffBadge({ level }) {
  const map = {
    Easy: 'text-emerald bg-emerald/10 border-emerald/25',
    Medium: 'text-amber  bg-amber/10   border-amber/25',
    Hard: 'text-rose   bg-rose/10    border-rose/25',
  }
  return (
    <span className={`px-2 py-0.5 rounded-md border font-mono text-[10px] ${map[level]}`}>
      {level}
    </span>
  )
}

/* ── GlassCard ─────────────────────────────────────────────── */
export function GlassCard({ children, className = '', hover = true, glow = false, ...rest }) {
  return (
    <div
      {...rest}
      className={`
        bg-bg2 border border-white/[.07] rounded-2xl
        ${hover ? 'transition-all duration-300 hover:-translate-y-1.5 hover:border-white/[.14] hover:shadow-xl hover:shadow-black/40' : ''}
        ${glow ? 'shadow-[0_0_28px_rgba(0,210,255,.08)] hover:shadow-[0_0_48px_rgba(0,210,255,.18)]' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}