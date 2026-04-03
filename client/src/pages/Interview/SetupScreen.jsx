import React, { useState } from 'react'
import { GlassCard } from '../../components/ui/Atoms'
import { Badge }     from '../../components/ui/Atoms'
import { Button }    from '../../components/ui/Button'

const ROLES = [
  { id:'fe', icon:'⚛️', label:'Frontend',  desc:'React, CSS, JS, Web APIs',   color:'#00d2ff' },
  { id:'be', icon:'⚙️', label:'Backend',   desc:'Node, APIs, DBs, System Design', color:'#10b981' },
  { id:'fs', icon:'🔷', label:'Fullstack', desc:'End-to-end, architecture',    color:'#7c3aed' },
  { id:'ml', icon:'🧠', label:'ML / AI',   desc:'PyTorch, NLP, CV, MLOps',     color:'#f59e0b' },
]

const TOPICS = {
  fe: ['HTML & CSS','JavaScript','React','Performance','Accessibility','Web APIs','TypeScript'],
  be: ['REST APIs','Databases','Authentication','Caching','Message Queues','System Design','Node.js'],
  fs: ['Full Stack Architecture','MERN Stack','Database Design','Auth Flows','Deployment','APIs'],
  ml: ['Python Fundamentals','ML Algorithms','Deep Learning','NLP','Computer Vision','MLOps'],
}

const DURATIONS = [
  { val:15, label:'15 min', desc:'Quick warm-up' },
  { val:30, label:'30 min', desc:'Standard session' },
  { val:45, label:'45 min', desc:'Deep dive' },
]

export function SetupScreen({ onStart }) {
  const [role,     setRole]     = useState('')
  const [topic,    setTopic]    = useState('')
  const [duration, setDuration] = useState(30)
  const [error,    setError]    = useState('')

  const handleStart = () => {
    if (!role)  { setError('Please select a role first.'); return }
    if (!topic) { setError('Please select a topic.'); return }
    setError('')
    onStart({ role, topic, duration })
  }

  return (
    <div style={{ animation:'fadeUp .35s ease' }}>
      <div style={{ marginBottom:32 }}>
        <Badge variant="violet" pulse>AI Interview</Badge>
        <h1 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:'clamp(1.8rem,3vw,2.4rem)', letterSpacing:'-.03em', lineHeight:1.1, margin:'12px 0 8px' }}>
          Configure your session
        </h1>
        <p style={{ fontSize:14, color:'#475569', lineHeight:1.7 }}>
          Our AI interviewer adapts to your level in real-time. Pick a role, topic, and duration to begin.
        </p>
      </div>

      {/* Step 1 — Role */}
      <Section label="1. Choose your role">
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
          {ROLES.map(r => {
            const active = role === r.id
            return (
              <button key={r.id} onClick={() => { setRole(r.id); setTopic('') }} style={{
                display:'flex', alignItems:'center', gap:12, padding:'14px 16px',
                borderRadius:12, cursor:'pointer', textAlign:'left',
                background: active ? `${r.color}12` : '#111214',
                border:`1px solid ${active ? r.color+'55' : 'rgba(255,255,255,.07)'}`,
                boxShadow: active ? `0 0 24px ${r.color}18` : 'none',
                transition:'all .2s',
              }}>
                <span style={{ fontSize:22 }}>{r.icon}</span>
                <div>
                  <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:14, color: active ? '#f8fafc' : '#94a3b8' }}>{r.label}</div>
                  <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color: active ? r.color : '#1e293b', marginTop:2 }}>{r.desc}</div>
                </div>
                {active && <div style={{ marginLeft:'auto', width:20, height:20, borderRadius:'50%', background:r.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, color:'#fff', flexShrink:0 }}>✓</div>}
              </button>
            )
          })}
        </div>
      </Section>

      {/* Step 2 — Topic */}
      {role && (
        <Section label="2. Pick a topic">
          <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
            {TOPICS[role].map(t => (
              <button key={t} onClick={() => setTopic(t)} style={{
                padding:'7px 14px', borderRadius:999, cursor:'pointer', transition:'all .15s',
                background: topic === t ? 'rgba(0,210,255,.12)' : 'rgba(255,255,255,.03)',
                border:`1px solid ${topic === t ? 'rgba(0,210,255,.4)' : 'rgba(255,255,255,.07)'}`,
                fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:600, fontSize:13,
                color: topic === t ? '#00d2ff' : '#475569',
              }}>{t}</button>
            ))}
          </div>
        </Section>
      )}

      {/* Step 3 — Duration */}
      <Section label="3. Session duration">
        <div style={{ display:'flex', gap:10 }}>
          {DURATIONS.map(d => (
            <button key={d.val} onClick={() => setDuration(d.val)} style={{
              flex:1, padding:'12px', borderRadius:11, cursor:'pointer', textAlign:'center',
              background: duration === d.val ? 'rgba(124,58,237,.12)' : '#111214',
              border:`1px solid ${duration === d.val ? 'rgba(124,58,237,.45)' : 'rgba(255,255,255,.07)'}`,
              transition:'all .2s',
            }}>
              <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:16, color: duration === d.val ? '#a78bfa' : '#94a3b8' }}>{d.label}</div>
              <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#1e293b', marginTop:3 }}>{d.desc}</div>
            </button>
          ))}
        </div>
      </Section>

      {error && <p style={{ fontFamily:'JetBrains Mono,monospace', fontSize:12, color:'#f43f5e', marginBottom:12 }}>{error}</p>}

      <Button variant="primary" size="lg" style={{ width:'100%', marginTop:4 }} onClick={handleStart}>
        Start Interview →
      </Button>

      <div style={{ display:'flex', justifyContent:'center', gap:20, marginTop:20 }}>
        {['🤖 AI-powered','🎯 Adaptive','📊 Scored'].map(b => (
          <span key={b} style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#1e293b' }}>{b}</span>
        ))}
      </div>
    </div>
  )
}

function Section({ label, children }) {
  return (
    <div style={{ marginBottom:24 }}>
      <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:12, color:'#475569', letterSpacing:'.06em', textTransform:'uppercase', marginBottom:12 }}>{label}</div>
      {children}
    </div>
  )
}