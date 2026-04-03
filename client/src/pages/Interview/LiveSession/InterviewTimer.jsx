import React, { useState, useEffect } from 'react'
import { GlassCard } from '../../../components/ui/Atoms'

export function InterviewTimer({ totalMinutes, onTimeUp }) {
  const total = totalMinutes * 60
  const [secs, setSecs] = useState(total)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || secs <= 0) return
    const id = setInterval(() => setSecs(s => {
      if (s <= 1) { clearInterval(id); onTimeUp(); return 0 }
      return s - 1
    }), 1000)
    return () => clearInterval(id)
  }, [paused, secs])

  const pct  = (secs / total) * 100
  const mins = String(Math.floor(secs / 60)).padStart(2,'0')
  const sec  = String(secs % 60).padStart(2,'0')
  const color = secs < 120 ? '#f43f5e' : secs < 300 ? '#f59e0b' : '#00d2ff'
  const r = 38, circ = 2 * Math.PI * r

  return (
    <GlassCard hover={false} className="p-4" style={{ textAlign:'center' }}>
      <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:13, color:'#f8fafc', marginBottom:14 }}>Time remaining</div>
      <div style={{ position:'relative', width:100, height:100, margin:'0 auto 14px' }}>
        <svg width="100" height="100" style={{ transform:'rotate(-90deg)' }}>
          <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="6"/>
          <circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="6"
            strokeDasharray={`${(pct/100)*circ} ${circ}`} strokeLinecap="round"
            style={{ transition:'stroke-dasharray .5s, stroke .5s' }}
          />
        </svg>
        <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
          <span style={{ fontFamily:'JetBrains Mono,monospace', fontWeight:700, fontSize:18, color, letterSpacing:'.04em' }}>{mins}:{sec}</span>
        </div>
      </div>
      <button onClick={() => setPaused(p => !p)} style={{
        padding:'6px 16px', borderRadius:8, border:'1px solid rgba(255,255,255,.08)',
        background:'rgba(255,255,255,.03)', color:'#475569', fontFamily:'Bricolage Grotesque,sans-serif',
        fontWeight:600, fontSize:12, cursor:'pointer', transition:'all .15s',
      }}>
        {paused ? '▶ Resume' : '⏸ Pause'}
      </button>
    </GlassCard>
  )
}