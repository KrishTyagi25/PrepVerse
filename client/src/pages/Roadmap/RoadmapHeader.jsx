import React from 'react'
import { Badge }  from '../../components/ui/Atoms'

const ROLES = [
  { id:'fe', icon:'⚛️', label:'Frontend'  },
  { id:'be', icon:'⚙️', label:'Backend'   },
  { id:'fs', icon:'🔷', label:'Fullstack' },
  { id:'ml', icon:'🧠', label:'ML / AI'   },
]

export function RoadmapHeader({ role, onRoleChange, targetDate, onDateChange, donePct, weeksLeft, totalWeeks, roadmapLabel }) {
  const color = donePct >= 80 ? '#10b981' : donePct >= 40 ? '#00d2ff' : '#7c3aed'

  return (
    <div>
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', flexWrap:'wrap', gap:16, marginBottom:24 }}>
        <div>
          <Badge variant="violet" pulse>Study Roadmap</Badge>
          <h1 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:'clamp(1.8rem,3vw,2.4rem)', letterSpacing:'-.03em', lineHeight:1.1, margin:'12px 0 8px' }}>
            {roadmapLabel} — 12 Weeks
          </h1>
          <p style={{ fontSize:14, color:'#475569', lineHeight:1.7 }}>
            Structured week-by-week plan covering DSA, concepts, and mock interviews.
          </p>
        </div>

        {/* Target date picker */}
        <div style={{ padding:'14px 18px', borderRadius:14, background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.07)' }}>
          <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#475569', textTransform:'uppercase', letterSpacing:'.07em', marginBottom:6 }}>Target date</div>
          <input type="date" value={targetDate} onChange={e => onDateChange(e.target.value)}
            style={{ background:'#111214', border:'1px solid rgba(255,255,255,.08)', borderRadius:8, outline:'none', padding:'6px 10px', fontFamily:'JetBrains Mono,monospace', fontSize:13, color:'#f8fafc', cursor:'pointer' }}
          />
          <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color: weeksLeft <= 4 ? '#f43f5e' : '#10b981', marginTop:6 }}>
            {weeksLeft} weeks left
          </div>
        </div>
      </div>

      {/* Role tabs */}
      <div style={{ display:'flex', gap:8, marginBottom:20, flexWrap:'wrap' }}>
        {ROLES.map(r => (
          <button key={r.id} onClick={() => onRoleChange(r.id)} style={{ display:'flex', alignItems:'center', gap:6, padding:'7px 16px', borderRadius:999, border:`1px solid ${role===r.id ? 'rgba(0,210,255,.4)' : 'rgba(255,255,255,.07)'}`, background: role===r.id ? 'rgba(0,210,255,.1)' : 'rgba(255,255,255,.025)', fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:600, fontSize:13, color: role===r.id ? '#00d2ff' : '#475569', cursor:'pointer', transition:'all .2s' }}>
            <span style={{ fontSize:15 }}>{r.icon}</span>{r.label}
          </button>
        ))}
      </div>

      {/* Overall progress bar */}
      <div style={{ padding:'16px 20px', borderRadius:14, background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.07)', marginBottom:4 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
          <span style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:14, color:'#f8fafc' }}>Overall progress</span>
          <span style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:20, color }}>{donePct}%</span>
        </div>
        <div style={{ height:8, borderRadius:999, background:'rgba(255,255,255,.06)', overflow:'hidden', marginBottom:8 }}>
          <div style={{ height:'100%', width:`${donePct}%`, borderRadius:999, background:`linear-gradient(90deg,${color}80,${color})`, transition:'width .8s ease' }}/>
        </div>
        <div style={{ display:'flex', justifyContent:'space-between' }}>
          <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#475569' }}>Week 1 of {totalWeeks}</span>
          <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#475569' }}>{totalWeeks} weeks total</span>
        </div>
      </div>
    </div>
  )
}