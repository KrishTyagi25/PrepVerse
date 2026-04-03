import React from 'react'
import { GlassCard } from '../../components/ui/Atoms'
import { Button }    from '../../components/ui/Button'

const ACTIONS = [
  { label: 'Resume last problem', icon: '▶', variant: 'primary', desc: 'Two Sum — Arrays' },
  { label: 'Start AI interview',  icon: '🤖', variant: 'glow',    desc: 'Frontend · 30 min' },
  { label: 'Daily challenge',     icon: '🎯', variant: 'outline', desc: 'New today' },
]

export function QuickActions() {
  return (
    <GlassCard className="p-5">
      <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: 14, color: '#f8fafc', marginBottom: 14 }}>Quick actions</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {ACTIONS.map(a => (
          <div key={a.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: '10px 12px', borderRadius: 10, background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.06)' }}>
            <div>
              <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 600, fontSize: 13, color: '#f8fafc' }}>{a.icon} {a.label}</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#475569', marginTop: 2 }}>{a.desc}</div>
            </div>
            <Button variant={a.variant} size="sm">Go →</Button>
          </div>
        ))}
      </div>
    </GlassCard>
  )
}