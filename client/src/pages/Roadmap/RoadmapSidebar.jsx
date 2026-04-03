import React from 'react'
import { GlassCard } from '../../components/ui/Atoms'
import { Button }    from '../../components/ui/Button'
import { useNavigate } from 'react-router-dom'

export function RoadmapSidebar({ roadmap, donePct, weeksLeft, completed, isTopicDone }) {
  const navigate = useNavigate()

  const weeksDone   = roadmap.weeks.filter(w => w.topics.every((t,i) => isTopicDone(w.week, i, t.done))).length
  const totalTopics = roadmap.weeks.flatMap(w => w.topics).length
  const doneTopics  = roadmap.weeks.reduce((acc, w) => acc + w.topics.filter((t,i) => isTopicDone(w.week, i, t.done)).length, 0)

  const milestones = [
    { pct:25, label:'Quarter done',       achieved: donePct >= 25, icon:'🌱' },
    { pct:50, label:'Halfway there',      achieved: donePct >= 50, icon:'⚡' },
    { pct:75, label:'Three quarters',     achieved: donePct >= 75, icon:'🔥' },
    { pct:100,label:'Roadmap complete!',  achieved: donePct >= 100,icon:'🏆' },
  ]

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>

      {/* Stats */}
      <GlassCard hover={false} className="p-5">
        <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:14, color:'#f8fafc', marginBottom:14 }}>Your progress</div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
          {[['Weeks done',`${weeksDone} / ${roadmap.weeks.length}`,'#00d2ff'],['Topics done',`${doneTopics} / ${totalTopics}`,'#10b981'],['Weeks left',weeksLeft,'#f59e0b'],['Completion',`${donePct}%`,'#7c3aed']].map(([label,val,color]) => (
            <div key={label} style={{ padding:'10px 12px', borderRadius:10, background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.06)', textAlign:'center' }}>
              <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:18, color, marginBottom:2 }}>{val}</div>
              <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9, color:'#1e293b' }}>{label}</div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Milestones */}
      <GlassCard hover={false} className="p-5">
        <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:14, color:'#f8fafc', marginBottom:14 }}>Milestones</div>
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {milestones.map(m => (
            <div key={m.pct} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 12px', borderRadius:10, background: m.achieved ? 'rgba(16,185,129,.07)' : 'rgba(255,255,255,.02)', border:`1px solid ${m.achieved ? 'rgba(16,185,129,.25)' : 'rgba(255,255,255,.05)'}`, opacity: m.achieved ? 1 : 0.5, transition:'all .3s' }}>
              <span style={{ fontSize:20 }}>{m.icon}</span>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:600, fontSize:13, color: m.achieved ? '#f8fafc' : '#475569' }}>{m.label}</div>
                <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#1e293b' }}>{m.pct}% complete</div>
              </div>
              {m.achieved && <span style={{ color:'#10b981', fontSize:16 }}>✓</span>}
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Quick actions */}
      <GlassCard hover={false} className="p-5">
        <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:14, color:'#f8fafc', marginBottom:12 }}>Quick actions</div>
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          <Button variant="primary" size="sm" style={{ width:'100%' }} onClick={() => navigate('/practice')}>🧩 Go to practice</Button>
          <Button variant="glow"    size="sm" style={{ width:'100%' }} onClick={() => navigate('/interview')}>🤖 Start mock interview</Button>
          <Button variant="ghost"   size="sm" style={{ width:'100%' }} onClick={() => navigate('/daily')}>🎯 Daily challenge</Button>
          <Button variant="outline" size="sm" style={{ width:'100%' }} onClick={() => navigate('/resume')}>📄 Update resume</Button>
        </div>
      </GlassCard>
    </div>
  )
}