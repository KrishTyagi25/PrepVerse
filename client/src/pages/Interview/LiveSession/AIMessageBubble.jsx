import React from 'react'

export function AIMessageBubble({ message }) {
  const isAI = message.role === 'ai'
  return (
    <div style={{ display:'flex', gap:12, alignItems:'flex-end', flexDirection: isAI ? 'row' : 'row-reverse' }}>
      {isAI && (
        <div style={{ width:28, height:28, borderRadius:'50%', background:'linear-gradient(135deg,rgba(124,58,237,.3),rgba(0,210,255,.3))', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14 }}>🤖</div>
      )}
      <div style={{ maxWidth:'75%' }}>
        <div style={{
          padding:'12px 16px',
          borderRadius: isAI ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
          background: isAI ? 'rgba(255,255,255,.05)' : 'linear-gradient(135deg,rgba(0,210,255,.18),rgba(124,58,237,.18))',
          border:`1px solid ${isAI ? 'rgba(255,255,255,.07)' : 'rgba(0,210,255,.25)'}`,
          fontFamily:'Geist,sans-serif', fontSize:14, color:'#f8fafc', lineHeight:1.6,
        }}>
          {/* Render **bold** markdown */}
          {message.text.split(/\*\*(.*?)\*\*/g).map((part, i) =>
            i % 2 === 1
              ? <strong key={i} style={{ color:'#00d2ff', fontWeight:600 }}>{part}</strong>
              : <span key={i}>{part}</span>
          )}
        </div>
        <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9, color:'#1e293b', marginTop:4, textAlign: isAI ? 'left' : 'right' }}>
          {message.ts}
        </div>
      </div>
    </div>
  )
}