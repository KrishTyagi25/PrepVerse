import React from 'react'
import { Badge } from '../../components/ui/Atoms'

export function WelcomeBanner({ name = 'there', streak = 0 }) {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
      <div>
        <h1 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 800, fontSize: 'clamp(1.6rem,3vw,2.2rem)', letterSpacing: '-.03em', lineHeight: 1.1, marginBottom: 6 }}>
          {greeting}, {name} 👋
        </h1>
        <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.6 }}>
          You're on a <span style={{ color: '#00d2ff', fontWeight: 600 }}>{streak}-day streak</span>. Keep the momentum going.
        </p>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Badge variant="cyan" pulse>🔥 {streak} day streak</Badge>
        <Badge variant="ghost">📅 {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}</Badge>
      </div>
    </div>
  )
}