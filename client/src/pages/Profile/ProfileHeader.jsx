import React from 'react'
import { Badge }  from '../../components/ui/Atoms'
import { Button } from '../../components/ui/Button'

export function ProfileHeader() {
  return (
    <div style={{ display:'flex', alignItems:'flex-start', gap:20, flexWrap:'wrap', marginBottom:28, padding:'22px 24px', borderRadius:16, background:'rgba(255,255,255,.02)', border:'1px solid rgba(255,255,255,.07)' }}>
      {/* Avatar */}
      <div style={{ width:72, height:72, borderRadius:'50%', background:'linear-gradient(135deg,rgba(0,210,255,.3),rgba(124,58,237,.3))', border:'2px solid rgba(0,210,255,.3)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:24, color:'#00d2ff', flexShrink:0 }}>AS</div>

      <div style={{ flex:1, minWidth:220 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, flexWrap:'wrap', marginBottom:6 }}>
          <h1 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:'1.5rem', letterSpacing:'-.02em', margin:0 }}>Aryan Sharma</h1>
          <Badge variant="cyan" pulse>Verified</Badge>
          <Badge variant="ghost">Frontend</Badge>
        </div>
        <p style={{ fontSize:13, color:'#475569', marginBottom:10, lineHeight:1.6 }}>
          Final year @ DTU • Prepping for FAANG • 14-day streak 🔥
        </p>
        <div style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
          {[['DTU','🎓'],['Delhi, IN','📍'],['Since Jan 2025','📅']].map(([t,ic]) => (
            <span key={t} style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#475569' }}>{ic} {t}</span>
          ))}
        </div>
      </div>

      <div style={{ display:'flex', gap:8, flexWrap:'wrap', alignSelf:'flex-start' }}>
        <Button variant="ghost" size="sm">Share profile</Button>
        <Button variant="primary" size="sm">Edit profile</Button>
      </div>
    </div>
  )
}