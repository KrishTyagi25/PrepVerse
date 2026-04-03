import React from 'react'

const NAV = [
  { id:'account',       label:'Account',       icon:'👤' },
  { id:'notifications', label:'Notifications', icon:'🔔' },
  { id:'privacy',       label:'Privacy',       icon:'🔒' },
]

export function SettingsSidebar({ active, onChange }) {
  return (
    <div style={{ position:'sticky', top:100 }}>
      <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#1e293b', textTransform:'uppercase', letterSpacing:'.08em', marginBottom:12, paddingLeft:12 }}>Settings</div>
      <div style={{ display:'flex', flexDirection:'column', gap:2 }}>
        {NAV.map(n => (
          <button key={n.id} onClick={() => onChange(n.id)} style={{
            display:'flex', alignItems:'center', gap:10,
            padding:'10px 12px', borderRadius:10, border:'none', textAlign:'left', cursor:'pointer', transition:'all .15s',
            background: active === n.id ? 'rgba(0,210,255,.08)' : 'transparent',
            outline: active === n.id ? '1px solid rgba(0,210,255,.2)' : 'none',
            fontFamily:'Bricolage Grotesque,sans-serif', fontWeight: active === n.id ? 700 : 500, fontSize:14,
            color: active === n.id ? '#f8fafc' : '#475569',
          }}>
            <span style={{ fontSize:16 }}>{n.icon}</span>
            {n.label}
            {active === n.id && <span style={{ marginLeft:'auto', width:6, height:6, borderRadius:'50%', background:'#00d2ff', flexShrink:0 }}/>}
          </button>
        ))}
      </div>
    </div>
  )
}