import React from 'react'
import { Badge } from '../../components/ui/Atoms'
import { Button } from '../../components/ui/Button'

export function ProfileHeader({ profile }) {
  const initials = profile?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?'

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap', marginBottom: 28, padding: '22px 24px', borderRadius: 16, background: 'rgba(255,255,255,.02)', border: '1px solid rgba(255,255,255,.07)' }}>
      <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg,rgba(0,210,255,.3),rgba(124,58,237,.3))', border: '2px solid rgba(0,210,255,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Bricolage Grotesque,sans-serif', fontWeight: 800, fontSize: 24, color: '#00d2ff', flexShrink: 0 }}>
        {profile?.avatar || initials}
      </div>

      <div style={{ flex: 1, minWidth: 220 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 6 }}>
          <h1 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-.02em', margin: 0 }}>{profile?.name}</h1>
          {profile?.isVerified && <Badge variant="cyan" pulse>Verified</Badge>}
          <Badge variant="ghost">{profile?.role || 'User'}</Badge>
        </div>
        <p style={{ fontSize: 13, color: '#475569', marginBottom: 10, lineHeight: 1.6 }}>
          {profile?.bio || 'Prepping for FAANG'} • {profile?.streak || 0}-day streak 🔥
        </p>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {[[profile?.college || 'Unknown', '🎓'], ['Since ' + (profile?.createdAt ? new Date(profile.createdAt).getFullYear() : 'Unknown'), '📅']].map(([t, ic]) => (
            <span key={t} style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 11, color: '#475569' }}>{ic} {t}</span>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignSelf: 'flex-start' }}>
        <Button variant="ghost" size="sm">Share profile</Button>
        <Button variant="primary" size="sm">Edit profile</Button>
      </div>
    </div>
  )
}