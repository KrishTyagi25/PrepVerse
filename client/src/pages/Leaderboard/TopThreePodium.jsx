import React from 'react'

const MEDALS = ['🥇','🥈','🥉']
const HEIGHTS = [120, 90, 75]
const COLORS  = ['#f59e0b','#94a3b8','#cd7c3f']
const ORDER   = [1, 0, 2]  // silver left, gold center, bronze right

export function TopThreePodium({ users }) {
  return (
    <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'center', gap:16, padding:'0 0 8px' }}>
      {ORDER.map(i => {
        const u = users[i]
        if (!u) return null
        return (
          <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
            {/* Avatar */}
            <div style={{ width:52, height:52, borderRadius:'50%', background:`linear-gradient(135deg,${COLORS[i]}40,${COLORS[i]}20)`, border:`2px solid ${COLORS[i]}60`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:16, color:COLORS[i] }}>
              {u.avatar}
            </div>
            <span style={{ fontSize:20 }}>{MEDALS[i]}</span>
            <div style={{ textAlign:'center' }}>
              <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:13, color:'#f8fafc' }}>{u.name.split(' ')[0]}</div>
              <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:COLORS[i] }}>{u.score.toLocaleString()}</div>
            </div>
            {/* Podium block */}
            <div style={{ width:100, height:HEIGHTS[i], borderRadius:'10px 10px 0 0', background:`linear-gradient(180deg,${COLORS[i]}22,${COLORS[i]}0a)`, border:`1px solid ${COLORS[i]}30`, borderBottom:'none', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <span style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:24, color:`${COLORS[i]}60` }}>#{i+1}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}