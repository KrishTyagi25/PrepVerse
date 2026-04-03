import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { DiffBadge } from '../../components/ui/Atoms'


export function ProblemTable({ problems }) {
    const navigate = useNavigate()

  const [hovered, setHovered] = useState(null)

  if (!problems.length) {
    return (
      <div style={{ textAlign:'center', padding:'60px 0', color:'#475569', fontFamily:'JetBrains Mono,monospace', fontSize:13 }}>
        No problems match your filters.
      </div>
    )
  }

  return (
    <div style={{ border:'1px solid rgba(255,255,255,.07)', borderRadius:14, overflow:'hidden' }}>
      {/* Header */}
      <div style={{ display:'grid', gridTemplateColumns:'40px 1fr 100px 120px 80px 60px', gap:0, padding:'10px 16px', borderBottom:'1px solid rgba(255,255,255,.07)', background:'rgba(255,255,255,.02)' }}>
        {['#','Title','Difficulty','Tags','Company','Status'].map(h => (
          <span key={h} style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#475569', textTransform:'uppercase', letterSpacing:'.05em' }}>{h}</span>
        ))}
      </div>

      {/* Rows */}
      {problems.map((p, i) => (
        <div
          key={p.id}
          onMouseEnter={() => setHovered(p.id)}
          onMouseLeave={() => setHovered(null)}
          style={{
            display:'grid', gridTemplateColumns:'40px 1fr 100px 120px 80px 60px', gap:0,
            padding:'13px 16px', cursor:'pointer', transition:'background .15s',
            background: hovered === p.id ? 'rgba(255,255,255,.04)' : 'transparent',
            borderBottom: i < problems.length - 1 ? '1px solid rgba(255,255,255,.04)' : 'none',
          }}
        >
          <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:12, color:'#1e293b' }}>{p.id}</span>
          <span style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:600, fontSize:13, color: p.solved ? '#10b981' : '#f8fafc' }}>
            {p.solved && <span style={{ marginRight:6 }}>✓</span>}{p.title}
          </span>
          <span><DiffBadge level={p.diff}/></span>
          <span style={{ display:'flex', gap:4, flexWrap:'wrap' }}>
            {p.tags.slice(0,2).map(t => (
              <span key={t} style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9, color:'#475569', background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.06)', borderRadius:4, padding:'1px 5px' }}>{t}</span>
            ))}
          </span>
          <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#475569' }}>{p.company}</span>
          <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color: p.solved ? '#10b981' : '#1e293b' }}>{p.solved ? 'Done' : '—'}</span>
        </div>
      ))}
    </div>
  )
}