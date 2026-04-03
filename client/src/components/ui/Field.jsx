 import React, { useState, useEffect } from 'react'

 
 export function Field({ label, type = 'text', placeholder, value, onChange, icon, rightEl, error, hint }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{
        fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: 11, fontWeight: 700,
        letterSpacing: '0.09em', textTransform: 'uppercase',
        color: focused ? '#00d2ff' : '#475569', transition: 'color .2s',
      }}>{label}</label>
      <div style={{
        position: 'relative', display: 'flex', alignItems: 'center', background: '#111214',
        border: `1px solid ${error ? '#f43f5e' : focused ? 'rgba(0,210,255,.45)' : 'rgba(255,255,255,.08)'}`,
        borderRadius: 12,
        boxShadow: focused && !error ? '0 0 0 3px rgba(0,210,255,.08)' : error ? '0 0 0 3px rgba(244,63,94,.08)' : 'none',
        transition: 'border-color .2s, box-shadow .2s',
      }}>
        {icon && <span style={{ position: 'absolute', left: 14, color: focused ? '#00d2ff' : '#475569', fontSize: 15, pointerEvents: 'none', transition: 'color .2s', display: 'flex', alignItems: 'center' }}>{icon}</span>}
        <input type={type} placeholder={placeholder} value={value} onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{ width: '100%', padding: icon ? '13px 14px 13px 42px' : '13px 14px', paddingRight: rightEl ? 44 : 14, background: 'transparent', border: 'none', outline: 'none', fontFamily: 'Geist, sans-serif', fontSize: 14, color: '#f8fafc' }}
        />
        {rightEl && <span style={{ position: 'absolute', right: 14, cursor: 'pointer', color: '#475569', fontSize: 15, display: 'flex', alignItems: 'center' }}>{rightEl}</span>}
      </div>
      {error     && <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#f43f5e' }}>{error}</span>}
      {!error && hint && <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#475569' }}>{hint}</span>}
    </div>
  )
}