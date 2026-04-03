import React, { useState } from 'react'
import { Button } from '../../components/ui/Button'

const ROLES = [
  { id:'fe', icon:'⚛️', label:'Frontend',  desc:'React, CSS, JavaScript, Web APIs', color:'#00d2ff' },
  { id:'be', icon:'⚙️', label:'Backend',   desc:'Node.js, APIs, Databases, System Design', color:'#10b981' },
  { id:'fs', icon:'🔷', label:'Fullstack', desc:'End-to-end development, architecture', color:'#7c3aed' },
  { id:'ml', icon:'🧠', label:'ML / AI',   desc:'PyTorch, NLP, Computer Vision, MLOps', color:'#f59e0b' },
]

const GOALS = [
  { id:'campus',  icon:'🎓', label:'Campus placement', desc:'Placement season prep' },
  { id:'offcampus',icon:'💼',label:'Off-campus job',  desc:'Applying on your own' },
  { id:'switch',  icon:'🔄', label:'Career switch',    desc:'Moving into tech' },
  { id:'explore', icon:'🔍', label:'Just exploring',   desc:'Curious about the platform' },
]

export function Step1Track({ data, onNext }) {
  const [role, setRole] = useState(data.role)
  const [goal, setGoal] = useState(data.goal)
  const [error, setError] = useState('')

  const handleNext = () => {
    if (!role) { setError('Please select a track to continue.'); return }
    if (!goal) { setError('Please select your current goal.'); return }
    onNext({ role, goal })
  }

  return (
    <div>
      <div style={{ textAlign:'center', marginBottom:32 }}>
        <h1 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:'clamp(1.6rem,3vw,2rem)', letterSpacing:'-.03em', lineHeight:1.1, marginBottom:8 }}>
          What do you want to master?
        </h1>
        <p style={{ fontSize:14, color:'#475569', lineHeight:1.7 }}>We'll personalise your roadmap, problems, and interviews based on this.</p>
      </div>

      <div style={{ marginBottom:24 }}>
        <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:12, color:'#475569', letterSpacing:'.07em', textTransform:'uppercase', marginBottom:10 }}>Your track</div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
          {ROLES.map(r => {
            const active = role === r.id
            return (
              <button key={r.id} onClick={() => { setRole(r.id); setError('') }} style={{ display:'flex', alignItems:'center', gap:12, padding:'14px 16px', borderRadius:12, cursor:'pointer', textAlign:'left', background: active ? `${r.color}10` : '#111214', border:`1px solid ${active ? r.color+'50' : 'rgba(255,255,255,.07)'}`, boxShadow: active ? `0 0 20px ${r.color}15` : 'none', transition:'all .2s' }}>
                <span style={{ fontSize:24 }}>{r.icon}</span>
                <div>
                  <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:14, color: active ? '#f8fafc' : '#94a3b8' }}>{r.label}</div>
                  <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color: active ? r.color : '#1e293b', marginTop:2 }}>{r.desc}</div>
                </div>
                {active && <div style={{ marginLeft:'auto', width:20, height:20, borderRadius:'50%', background:r.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, color:'#fff', flexShrink:0 }}>✓</div>}
              </button>
            )
          })}
        </div>
      </div>

      <div style={{ marginBottom:24 }}>
        <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:12, color:'#475569', letterSpacing:'.07em', textTransform:'uppercase', marginBottom:10 }}>Your goal</div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
          {GOALS.map(g => {
            const active = goal === g.id
            return (
              <button key={g.id} onClick={() => { setGoal(g.id); setError('') }} style={{ display:'flex', alignItems:'center', gap:10, padding:'12px 14px', borderRadius:10, cursor:'pointer', textAlign:'left', background: active ? 'rgba(0,210,255,.08)' : '#111214', border:`1px solid ${active ? 'rgba(0,210,255,.4)' : 'rgba(255,255,255,.07)'}`, transition:'all .2s' }}>
                <span style={{ fontSize:20 }}>{g.icon}</span>
                <div>
                  <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:13, color: active ? '#f8fafc' : '#94a3b8' }}>{g.label}</div>
                  <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color: active ? '#00d2ff' : '#1e293b' }}>{g.desc}</div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {error && <p style={{ fontFamily:'JetBrains Mono,monospace', fontSize:12, color:'#f43f5e', marginBottom:12 }}>{error}</p>}
      <Button variant="primary" size="lg" style={{ width:'100%' }} onClick={handleNext}>Continue →</Button>
    </div>
  )
}