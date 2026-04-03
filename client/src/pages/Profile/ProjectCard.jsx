import React, { useState } from 'react'
import { GlassCard } from '../../components/ui/Atoms'

const STATUS_COLORS = { Live:'#10b981', 'In Progress':'#f59e0b', Archived:'#475569' }

export function ProjectCard({ project: p }) {
  const [hov, setHov] = useState(false)
  return (
    <GlassCard hover className="p-5" onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {/* Status + stars */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
        <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:STATUS_COLORS[p.status], background:`${STATUS_COLORS[p.status]}15`, border:`1px solid ${STATUS_COLORS[p.status]}35`, borderRadius:4, padding:'2px 8px' }}>● {p.status}</span>
        <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#f59e0b' }}>⭐ {p.stars}</span>
      </div>

      {/* Name + desc */}
      <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:16, color:'#f8fafc', marginBottom:6 }}>{p.name}</div>
      <p style={{ fontFamily:'Geist,sans-serif', fontSize:13, color:'#475569', lineHeight:1.6, marginBottom:12 }}>{p.desc}</p>

      {/* Stack */}
      <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginBottom:14 }}>
        {p.stack.map(s => (
          <span key={s} style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#475569', background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.07)', borderRadius:4, padding:'2px 7px' }}>{s}</span>
        ))}
      </div>

      {/* Links */}
      <div style={{ display:'flex', gap:8 }}>
        {p.github && (
          <a href={p.github} target="_blank" rel="noreferrer" style={{ display:'flex', alignItems:'center', gap:5, padding:'6px 12px', borderRadius:8, background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.07)', fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:600, fontSize:12, color:'#94a3b8', textDecoration:'none', transition:'all .15s', flex:1, justifyContent:'center' }}>
            🐙 GitHub
          </a>
        )}
        {p.live && (
          <a href={p.live} target="_blank" rel="noreferrer" style={{ display:'flex', alignItems:'center', gap:5, padding:'6px 12px', borderRadius:8, background:'rgba(0,210,255,.08)', border:'1px solid rgba(0,210,255,.25)', fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:600, fontSize:12, color:'#00d2ff', textDecoration:'none', transition:'all .15s', flex:1, justifyContent:'center' }}>
            🚀 Live
          </a>
        )}
      </div>
    </GlassCard>
  )
}