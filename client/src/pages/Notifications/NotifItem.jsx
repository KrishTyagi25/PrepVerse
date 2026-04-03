import React from 'react'
import { Button } from '../../components/ui/Button'

const TYPE_ICONS = { connection:'🤝', like:'♥', comment:'💬', interview:'🤖', badge:'🏅', solved:'✅' }
const TYPE_COLORS = { connection:'#00d2ff', like:'#f43f5e', comment:'#7c3aed', interview:'#a78bfa', badge:'#f59e0b', solved:'#10b981' }

export function NotifItem({ notif: n, isLast, onRead, onRemove }) {
  const color = TYPE_COLORS[n.type] ?? '#475569'

  return (
    <div
      onClick={onRead}
      style={{
        display:'flex', alignItems:'center', gap:14, padding:'16px 20px',
        borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,.05)',
        background: n.read ? 'transparent' : 'rgba(0,210,255,.03)',
        transition:'background .15s', cursor: n.read ? 'default' : 'pointer',
        position:'relative',
      }}
    >
      {/* Unread dot */}
      {!n.read && <div style={{ position:'absolute', left:6, top:'50%', transform:'translateY(-50%)', width:6, height:6, borderRadius:'50%', background:'#00d2ff', flexShrink:0 }}/>}

      {/* Avatar with type icon */}
      <div style={{ position:'relative', flexShrink:0 }}>
        <div style={{ width:42, height:42, borderRadius:'50%', background:`${color}18`, border:`1.5px solid ${color}35`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:14, color }}>
          {n.avatar === 'PV' ? '🚀' : n.avatar}
        </div>
        <div style={{ position:'absolute', bottom:-2, right:-2, width:18, height:18, borderRadius:'50%', background:'#111214', border:`1px solid ${color}40`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10 }}>
          {TYPE_ICONS[n.type]}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontFamily:'Geist,sans-serif', fontSize:14, color:'#f8fafc', lineHeight:1.5, marginBottom:2 }}>
          <span style={{ fontWeight:600 }}>{n.actor}</span>{' '}
          <span style={{ color:'#475569' }}>{n.msg}</span>
        </div>
        <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#1e293b' }}>{n.time}</div>
      </div>

      {/* Action */}
      <div style={{ display:'flex', gap:6, flexShrink:0 }}>
        <Button variant={n.actionVariant ?? 'ghost'} size="sm" onClick={e => { e.stopPropagation(); onRead() }}>
          {n.action}
        </Button>
        <button onClick={e => { e.stopPropagation(); onRemove() }} style={{ background:'none', border:'none', color:'#1e293b', cursor:'pointer', fontSize:14, padding:'0 4px', display:'flex', alignItems:'center' }}>✕</button>
      </div>
    </div>
  )
}