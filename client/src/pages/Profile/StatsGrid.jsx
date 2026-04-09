import React from 'react'
import { GlassCard } from '../../components/ui/Atoms'
import { useCountUp } from '../../hooks/useCountUp'

function StatCell({ label, value, suffix, color, icon }) {
  const ref = useCountUp(value)
  return (
    <GlassCard className="p-5" hover={false}>
      <div style={{ fontSize: 22, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontWeight: 800, fontSize: '1.8rem', color, marginBottom: 4 }}>
        <span ref={ref}>0</span>{suffix}
      </div>
      <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 11, color: '#475569' }}>{label}</div>
    </GlassCard>
  )
}

export function StatsGrid({ profile }) {
  if (!profile) return null;

  const STATS = [
    { label: 'Problems solved', value: profile.solved || 0, suffix: '', color: '#00d2ff', icon: '🧩' },
    { label: 'Current streak', value: profile.streak || 0, suffix: 'd', color: '#f59e0b', icon: '🔥' },
    { label: 'Connections     ', value: profile.connections?.length || profile.connections || 0, suffix: '', color: '#7c3aed', icon: '👥' },
    { label: 'Interview score', value: profile.score || 0, suffix: '', color: '#10b981', icon: '⭐' },
  ]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 20 }}>
      {STATS.map(s => <StatCell key={s.label} {...s} />)}
    </div>
  )
}