import React, { createContext, useContext, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'

const ToastContext = createContext(null)

const ICONS = { success:'✅', error:'❌', info:'ℹ️', warning:'⚠️' }
const COLORS = {
  success: { border:'rgba(16,185,129,.4)',  bg:'rgba(16,185,129,.08)',  text:'#10b981' },
  error:   { border:'rgba(244,63,94,.4)',   bg:'rgba(244,63,94,.08)',   text:'#f43f5e' },
  info:    { border:'rgba(0,210,255,.4)',   bg:'rgba(0,210,255,.08)',   text:'#00d2ff' },
  warning: { border:'rgba(245,158,11,.4)', bg:'rgba(245,158,11,.08)', text:'#f59e0b' },
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const toast = useCallback((message, type = 'info', duration = 3500) => {
    const id = Date.now()
    setToasts(t => [...t, { id, message, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), duration)
  }, [])

  const remove = (id) => setToasts(t => t.filter(x => x.id !== id))

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {createPortal(
        <div style={{ position:'fixed', bottom:24, right:24, zIndex:99999, display:'flex', flexDirection:'column', gap:10, maxWidth:360 }}>
          {toasts.map(t => {
            const c = COLORS[t.type] ?? COLORS.info
            return (
              <div key={t.id} style={{ display:'flex', alignItems:'center', gap:10, padding:'12px 16px', borderRadius:12, background:'#111214', border:`1px solid ${c.border}`, boxShadow:'0 8px 32px rgba(0,0,0,.6)', animation:'toastIn .25s ease', fontFamily:'Geist,sans-serif', fontSize:14, color:'#f8fafc', backdropFilter:'blur(12px)' }}>
                <span style={{ fontSize:16, flexShrink:0 }}>{ICONS[t.type]}</span>
                <span style={{ flex:1, lineHeight:1.5 }}>{t.message}</span>
                <button onClick={() => remove(t.id)} style={{ background:'none', border:'none', color:'#475569', cursor:'pointer', fontSize:16, padding:0, flexShrink:0, lineHeight:1 }}>✕</button>
              </div>
            )
          })}
          <style>{`@keyframes toastIn{from{opacity:0;transform:translateY(12px) scale(.96)}to{opacity:1;transform:none}}`}</style>
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be inside ToastProvider')
  return ctx.toast
}