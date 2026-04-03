import React, { useState } from 'react'

export function RankRow({ user }) {
  const [hov, setHov] = useState(false)
  const isMe = user.rank === 6  // simulate "you"

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display:'grid', gridTemplateColumns:'56px 1fr 80px 80px 70px',
        padding:'13px 16px', cursor:'pointer', transition:'background .15s',
        background: isMe ? 'rgba(0,210,255,.05)' : hov ? 'rgba(255,255,255,.03)' : 'transparent',
        borderBottom:'1px solid rgba(255,255,255,.04)',
        outline: isMe ? '1px solid rgba(0,210,255,.15)' : 'none',
      }}
    >
      <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:13, color: user.rank <= 3 ? '#f59e0b' : '#475569', fontWeight: user.rank <= 3 ? 700 : 400 }}>
        #{user.rank}
      </span>
      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
        <div style={{ width:30, height:30, borderRadius:'50%', background:'rgba(0,210,255,.1)', border:'1px solid rgba(0,210,255,.2)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:11, color:'#00d2ff', flexShrink:0 }}>
          {user.avatar}
        </div>
        <div>
          <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:600, fontSize:13, color:'#f8fafc', display:'flex', alignItems:'center', gap:6 }}>
            {user.name}{isMe && <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9, color:'#00d2ff', background:'rgba(0,210,255,.1)', border:'1px solid rgba(0,210,255,.25)', borderRadius:4, padding:'1px 5px' }}>you</span>}
          </div>
          <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#1e293b' }}>{user.college}</div>
        </div>
      </div>
      <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:12, color:'#f8fafc', alignSelf:'center' }}>{user.score.toLocaleString()}</span>
      <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:12, color:'#f59e0b', alignSelf:'center' }}>🔥 {user.streak}d</span>
      <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:12, color:'#475569', alignSelf:'center' }}>{user.solved}</span>
    </div>
  )
}