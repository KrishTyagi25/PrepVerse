import React from 'react'
import { GlassCard } from '../../components/ui/Atoms'

export function SectionBlock({ title, icon, open, onToggle, children, onAdd, addLabel }) {
  return (
    <GlassCard hover={false} className="p-0" style={{ overflow:'hidden' }}>
      {/* Header */}
      <button
        onClick={onToggle}
        style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 16px', background:'none', border:'none', cursor:'pointer', borderBottom: open ? '1px solid rgba(255,255,255,.06)' : 'none', transition:'background .15s' }}
        onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,.02)'}
        onMouseLeave={e => e.currentTarget.style.background='none'}
      >
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <span style={{ fontSize:16 }}>{icon}</span>
          <span style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:14, color:'#f8fafc' }}>{title}</span>
        </div>
        <span style={{ color:'#475569', fontSize:16, transition:'transform .2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>▾</span>
      </button>

      {/* Body */}
      {open && (
        <div style={{ padding:'16px', animation:'fadeUp .2s ease' }}>
          {children}
          {onAdd && (
            <button onClick={onAdd} style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 12px', borderRadius:8, border:'1px dashed rgba(0,210,255,.25)', background:'rgba(0,210,255,.04)', color:'#00d2ff', fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:600, fontSize:12, cursor:'pointer', marginTop:4, transition:'all .15s', width:'100%', justifyContent:'center' }}>
              {addLabel}
            </button>
          )}
        </div>
      )}
    </GlassCard>
  )
}