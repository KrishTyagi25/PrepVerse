import React from 'react'
import { GlassCard } from '../../components/ui/Atoms'

const TRACKS = [
  { label: 'DSA',        val: 72, color: '#00d2ff', solved: 87,  total: 120 },
  { label: 'Frontend',   val: 88, color: '#10b981', solved: 44,  total: 50  },
  { label: 'Interviews', val: 61, color: '#7c3aed', solved: 6,   total: 10  },
]

function Ring({ val, color, size = 72 }) {
  const r = (size - 8) / 2
  const circ = 2 * Math.PI * r
  const dash = (val / 100) * circ
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="6"/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="6"
        strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round"
        style={{ transition: 'stroke-dasharray 1s ease' }}
      />
    </svg>
  )
}

export function ProgressRings() {
  return (
    <GlassCard className="p-5">
      <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: 14, color: '#f8fafc', marginBottom: 18 }}>Track Progress</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {TRACKS.map(t => (
          <div key={t.label} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <Ring val={t.val} color={t.color}/>
              <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: t.color, fontWeight: 700 }}>
                {t.val}%
              </span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: 13, color: '#f8fafc' }}>{t.label}</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#475569', marginTop: 2 }}>{t.solved}/{t.total} solved</div>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  )
}