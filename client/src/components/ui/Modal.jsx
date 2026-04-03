import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'

export function Modal({ open, onClose, title, children, width = 480 }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
        animation: 'modalFadeIn .18s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: width,
          background: '#111214',
          border: '1px solid rgba(255,255,255,.09)',
          borderRadius: 18,
          boxShadow: '0 24px 80px rgba(0,0,0,.7)',
          animation: 'modalSlideUp .22s cubic-bezier(.34,1.56,.64,1)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        {title && (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '18px 22px 16px',
            borderBottom: '1px solid rgba(255,255,255,.06)',
          }}>
            <span style={{
              fontFamily: 'Bricolage Grotesque, sans-serif',
              fontWeight: 700, fontSize: 16, color: '#f8fafc',
              letterSpacing: '-.02em',
            }}>{title}</span>
            <button
              onClick={onClose}
              style={{
                width: 28, height: 28, borderRadius: 8,
                background: 'rgba(255,255,255,.04)',
                border: '1px solid rgba(255,255,255,.07)',
                color: '#475569', fontSize: 16, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all .15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,.09)'; e.currentTarget.style.color = '#f8fafc' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.04)'; e.currentTarget.style.color = '#475569' }}
            >✕</button>
          </div>
        )}

        {/* Body */}
        <div style={{ padding: '20px 22px' }}>
          {children}
        </div>
      </div>

      <style>{`
        @keyframes modalFadeIn   { from{opacity:0} to{opacity:1} }
        @keyframes modalSlideUp  { from{opacity:0;transform:translateY(16px) scale(.97)} to{opacity:1;transform:none} }
      `}</style>
    </div>,
    document.body
  )
}

/* ── Modal sub-components for clean usage ── */
export function ModalFooter({ children }) {
  return (
    <div style={{
      display: 'flex', gap: 10, justifyContent: 'flex-end',
      paddingTop: 16, marginTop: 16,
      borderTop: '1px solid rgba(255,255,255,.06)',
    }}>
      {children}
    </div>
  )
}