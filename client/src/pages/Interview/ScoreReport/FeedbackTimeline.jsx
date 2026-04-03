import React from 'react'
import { GlassCard } from '../../../components/ui/Atoms'

export function FeedbackTimeline({ messages }) {
  const pairs = []
  for (let i = 0; i < messages.length - 1; i++) {
    if (messages[i].role === 'ai' && messages[i+1]?.role === 'user') {
      pairs.push({ q: messages[i], a: messages[i+1], idx: pairs.length + 1 })
    }
  }

  return (
    <GlassCard hover={false} className="p-5">
      <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:14, color:'#f8fafc', marginBottom:16 }}>Q&amp;A review</div>
      <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
        {pairs.map(({ q, a, idx }) => (
          <div key={idx} style={{ borderLeft:'2px solid rgba(0,210,255,.2)', paddingLeft:16 }}>
            <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#00d2ff', marginBottom:6, textTransform:'uppercase', letterSpacing:'.06em' }}>Q{idx}</div>
            <div style={{ fontFamily:'Geist,sans-serif', fontSize:13, color:'#475569', lineHeight:1.6, marginBottom:8 }}>{q.text.replace(/\*\*/g,'')}</div>
            <div style={{ padding:'10px 12px', borderRadius:8, background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.06)' }}>
              <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9, color:'#1e293b', marginBottom:4, textTransform:'uppercase' }}>Your answer</div>
              <div style={{ fontFamily:'Geist,sans-serif', fontSize:13, color:'#94a3b8', lineHeight:1.6 }}>{a.text}</div>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  )
}