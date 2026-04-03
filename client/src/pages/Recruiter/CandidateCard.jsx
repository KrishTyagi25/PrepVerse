import React, { useState } from 'react'
import { GlassCard } from '../../components/ui/Atoms'
import { Button }    from '../../components/ui/Button'

export function CandidateCard({ candidate: c, onBook }) {
  const [hov, setHov] = useState(false)
  const scoreColor = c.score >= 90 ? '#10b981' : c.score >= 75 ? '#00d2ff' : '#f59e0b'

  return (
    <GlassCard hover className="p-5"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Header */}
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:14 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:44, height:44, borderRadius:'50%', background:'linear-gradient(135deg,rgba(0,210,255,.2),rgba(124,58,237,.2))', border:'1.5px solid rgba(0,210,255,.25)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:15, color:'#00d2ff', flexShrink:0 }}>
            {c.name.split(' ').map(n=>n[0]).join('')}
          </div>
          <div>
            <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:14, color:'#f8fafc' }}>{c.name}</div>
            <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#475569' }}>{c.college}</div>
          </div>
        </div>
        <div style={{ textAlign:'right' }}>
          <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:20, color:scoreColor }}>{c.score}</div>
          <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9, color:'#1e293b' }}>score</div>
        </div>
      </div>

      {/* Role + availability */}
      <div style={{ display:'flex', gap:8, marginBottom:12, flexWrap:'wrap' }}>
        <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#7c3aed', background:'rgba(124,58,237,.1)', border:'1px solid rgba(124,58,237,.25)', borderRadius:4, padding:'2px 8px' }}>{c.role}</span>
        <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color: c.available ? '#10b981' : '#475569', background: c.available ? 'rgba(16,185,129,.1)' : 'rgba(255,255,255,.03)', border:`1px solid ${c.available ? 'rgba(16,185,129,.25)' : 'rgba(255,255,255,.06)'}`, borderRadius:4, padding:'2px 8px' }}>
          {c.available ? '● Available' : '○ Unavailable'}
        </span>
      </div>

      {/* Stats */}
      <div style={{ display:'flex', gap:16, marginBottom:14 }}>
        {[['🔥', `${c.streak}d streak`], ['✅', `${c.solved} solved`]].map(([ic, t]) => (
          <span key={t} style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#475569' }}>{ic} {t}</span>
        ))}
      </div>

      {/* Skills */}
      <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:16 }}>
        {c.skills.map(s => (
          <span key={s} style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#475569', background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.07)', borderRadius:4, padding:'2px 7px' }}>{s}</span>
        ))}
      </div>

      <div style={{ display:'flex', gap:8 }}>
        <Button variant="ghost"   size="sm" style={{ flex:1 }}>View profile</Button>
        <Button variant="primary" size="sm" style={{ flex:1 }} onClick={onBook} disabled={!c.available}>Book session</Button>
      </div>
    </GlassCard>
  )
}