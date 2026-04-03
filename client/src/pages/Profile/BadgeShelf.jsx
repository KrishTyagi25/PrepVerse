import React from 'react'
import { GlassCard } from '../../components/ui/Atoms'

const BADGES = [
  { icon:'🔥', label:'7-Day Streak',     desc:'Solved 7 days straight',   color:'#f59e0b', earned:true  },
  { icon:'🧩', label:'First Hard',       desc:'Solved first Hard problem', color:'#f43f5e', earned:true  },
  { icon:'⚡', label:'Speed Demon',      desc:'Solved in under 5 mins',    color:'#00d2ff', earned:true  },
  { icon:'🤖', label:'AI Champion',      desc:'10 mock interviews done',   color:'#7c3aed', earned:false },
  { icon:'🏆', label:'Top 100',          desc:'Reached global top 100',    color:'#10b981', earned:false },
  { icon:'🎯', label:'30-Day Streak',    desc:'Solved 30 days straight',   color:'#f59e0b', earned:false },
]

export function BadgeShelf() {
  return (
    <GlassCard className="p-5" hover={false} style={{ marginBottom:20 }}>
      <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:14, color:'#f8fafc', marginBottom:14 }}>Achievements</div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(130px,1fr))', gap:10 }}>
        {BADGES.map(b => (
          <div key={b.label} style={{ padding:'12px', borderRadius:10, textAlign:'center', background: b.earned ? `${b.color}0d` : 'rgba(255,255,255,.02)', border:`1px solid ${b.earned ? b.color+'40' : 'rgba(255,255,255,.05)'}`, opacity: b.earned ? 1 : 0.4, transition:'all .2s' }}>
            <span style={{ fontSize:24, display:'block', marginBottom:6 }}>{b.icon}</span>
            <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:11, color: b.earned ? '#f8fafc' : '#475569', marginBottom:3 }}>{b.label}</div>
            <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9, color:'#1e293b', lineHeight:1.4 }}>{b.desc}</div>
          </div>
        ))}
      </div>
    </GlassCard>
  )
}