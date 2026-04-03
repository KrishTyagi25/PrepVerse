import React from 'react'

export function MessageBubble({ message, convo }) {
  const isMe = message.from === 'me'
  return (
    <div style={{ display:'flex', gap:8, alignItems:'flex-end', flexDirection: isMe ? 'row-reverse' : 'row' }}>
      {!isMe && (
        <div style={{ width:28, height:28, borderRadius:'50%', background:'rgba(0,210,255,.1)', border:'1px solid rgba(0,210,255,.2)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:10, color:'#00d2ff', flexShrink:0 }}>{convo.avatar}</div>
      )}
      <div style={{ maxWidth:'68%' }}>
        <div style={{
          padding:'10px 14px',
          borderRadius: isMe ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
          background: isMe ? 'linear-gradient(135deg,rgba(0,210,255,.2),rgba(124,58,237,.2))' : 'rgba(255,255,255,.05)',
          border:`1px solid ${isMe ? 'rgba(0,210,255,.25)' : 'rgba(255,255,255,.07)'}`,
          fontFamily:'Geist,sans-serif', fontSize:14, color:'#f8fafc', lineHeight:1.6,
        }}>{message.text}</div>
        <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9, color:'#1e293b', marginTop:3, textAlign: isMe ? 'right' : 'left' }}>{message.time}</div>
      </div>
    </div>
  )
}