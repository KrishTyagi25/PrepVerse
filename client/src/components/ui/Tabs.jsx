import React, { useState, useRef, useEffect } from 'react'

/**
 * Tabs
 * tabs: [{ id, label, icon? }]
 * active: current tab id
 * onChange: (id) => void
 * variant: 'underline' | 'pill'
 */
export function Tabs({ tabs, active, onChange, variant = 'underline' }) {
  const [inkStyle, setInkStyle] = useState({})
  const refs = useRef({})

  useEffect(() => {
    const el = refs.current[active]
    if (!el || variant !== 'underline') return
    setInkStyle({ left: el.offsetLeft, width: el.offsetWidth })
  }, [active, variant])

  if (variant === 'pill') {
    return (
      <div style={{
        display: 'inline-flex', gap: 4, padding: 4,
        background: 'rgba(255,255,255,.03)',
        border: '1px solid rgba(255,255,255,.07)',
        borderRadius: 12,
      }}>
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '7px 14px', borderRadius: 9, border: 'none',
              background: active === t.id
                ? 'linear-gradient(135deg,rgba(0,210,255,.18),rgba(124,58,237,.18))'
                : 'transparent',
              outline: active === t.id ? '1px solid rgba(0,210,255,.3)' : 'none',
              fontFamily: 'Bricolage Grotesque, sans-serif',
              fontWeight: 600, fontSize: 13,
              color: active === t.id ? '#f8fafc' : '#475569',
              cursor: 'pointer', transition: 'all .2s', whiteSpace: 'nowrap',
            }}
          >
            {t.icon && <span style={{ fontSize: 14 }}>{t.icon}</span>}
            {t.label}
          </button>
        ))}
      </div>
    )
  }

  // underline variant
  return (
    <div style={{ position: 'relative', display: 'flex', gap: 0, borderBottom: '1px solid rgba(255,255,255,.07)' }}>
      {tabs.map(t => (
        <button
          key={t.id}
          ref={el => refs.current[t.id] = el}
          onClick={() => onChange(t.id)}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '10px 18px', border: 'none', background: 'transparent',
            fontFamily: 'Bricolage Grotesque, sans-serif',
            fontWeight: 600, fontSize: 13,
            color: active === t.id ? '#f8fafc' : '#475569',
            cursor: 'pointer', transition: 'color .2s', whiteSpace: 'nowrap',
          }}
        >
          {t.icon && <span style={{ fontSize: 14 }}>{t.icon}</span>}
          {t.label}
        </button>
      ))}
      {/* Sliding ink bar */}
      <div style={{
        position: 'absolute', bottom: -1, height: 2, borderRadius: 999,
        background: 'linear-gradient(90deg,#00d2ff,#7c3aed)',
        transition: 'left .25s cubic-bezier(.34,1.56,.64,1), width .25s cubic-bezier(.34,1.56,.64,1)',
        ...inkStyle,
      }}/>
    </div>
  )
}