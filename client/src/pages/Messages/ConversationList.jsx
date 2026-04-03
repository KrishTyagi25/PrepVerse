import React, { useState } from 'react'

export function ConversationList({ convos, activeId, onSelect }) {
  const [search, setSearch] = useState('')
  const filtered = convos.filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div style={{ borderRight:'1px solid rgba(255,255,255,.07)', display:'flex', flexDirection:'column', background:'rgba(255,255,255,.01)' }}>
      {/* Header */}
      <div style={{ padding:'18px 16px 12px', borderBottom:'1px solid rgba(255,255,255,.06)' }}>
        <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:16, color:'#f8fafc', marginBottom:12 }}>Messages</div>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search conversations…"
          style={{ width:'100%', padding:'8px 12px', background:'#111214', border:'1px solid rgba(255,255,255,.08)', borderRadius:9, outline:'none', fontFamily:'Geist,sans-serif', fontSize:13, color:'#f8fafc', boxSizing:'border-box' }}
        />
      </div>

      {/* List */}
      <div style={{ flex:1, overflowY:'auto' }}>
        {filtered.map(c => (
          <div key={c.id} onClick={() => onSelect(c.id)} style={{
            display:'flex', alignItems:'center', gap:10, padding:'12px 16px', cursor:'pointer', transition:'background .15s',
            background: activeId === c.id ? 'rgba(0,210,255,.07)' : 'transparent',
            borderLeft: activeId === c.id ? '2px solid #00d2ff' : '2px solid transparent',
          }}>
            {/* Avatar with online dot */}
            <div style={{ position:'relative', flexShrink:0 }}>
              <div style={{ width:40, height:40, borderRadius:'50%', background:'linear-gradient(135deg,rgba(0,210,255,.2),rgba(124,58,237,.2))', border:'1.5px solid rgba(0,210,255,.2)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:13, color:'#00d2ff' }}>{c.avatar}</div>
              {c.online && <div style={{ position:'absolute', bottom:1, right:1, width:9, height:9, borderRadius:'50%', background:'#10b981', border:'1.5px solid #080909' }}/>}
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:3 }}>
                <span style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight: c.unread ? 700 : 600, fontSize:13, color:'#f8fafc' }}>{c.name}</span>
                <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9, color:'#1e293b' }}>{c.time}</span>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ fontFamily:'Geist,sans-serif', fontSize:12, color: c.unread ? '#94a3b8' : '#475569', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', maxWidth:170 }}>{c.lastMsg}</span>
                {c.unread > 0 && <span style={{ width:18, height:18, borderRadius:'50%', background:'#00d2ff', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'JetBrains Mono,monospace', fontSize:9, color:'#080909', fontWeight:700, flexShrink:0 }}>{c.unread}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}