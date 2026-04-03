import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCanvasBg }  from '../../hooks/useCanvasBg'
import { useCursor }    from '../../hooks/useCursor'
import { Button }       from '../../components/ui/Button'

export default function NotFoundPage() {
  useCanvasBg('nf-canvas')
  useCursor()
  const navigate = useNavigate()

  return (
    <div style={{ minHeight:'100vh', background:'#080909', color:'#f8fafc', fontFamily:'Geist,sans-serif', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', textAlign:'center', padding:24, position:'relative' }}>
      <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;700&family=Geist:wght@300;400;500;600&display=swap" rel="stylesheet"/>
      <style>{`body{cursor:none}#cur-dot{width:5px;height:5px;border-radius:50%;background:#00d2ff;box-shadow:0 0 8px #00d2ff;position:fixed;top:0;left:0;pointer-events:none;z-index:9999}#cur-ring{width:28px;height:28px;border-radius:50%;border:1.5px solid rgba(0,210,255,.5);position:fixed;top:0;left:0;pointer-events:none;z-index:9998;transition:width .2s,height .2s}body.hov #cur-ring{width:44px;height:44px;border-color:rgba(124,58,237,.7);margin:-8px}`}</style>
      <canvas id="nf-canvas" style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none' }}/>

      <div style={{ position:'relative', zIndex:1 }}>
        <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:'clamp(6rem,20vw,10rem)', lineHeight:1, letterSpacing:'-.04em', background:'linear-gradient(135deg,#00d2ff,#7c3aed)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', marginBottom:8 }}>
          404
        </div>
        <h1 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:'clamp(1.4rem,3vw,2rem)', letterSpacing:'-.03em', marginBottom:12 }}>
          Page not found
        </h1>
        <p style={{ fontSize:15, color:'#475569', lineHeight:1.7, maxWidth:380, margin:'0 auto 32px' }}>
          This page doesn't exist or was moved. Let's get you back on track.
        </p>
        <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
          <Button variant="ghost"   size="md" onClick={() => navigate(-1)}>← Go back</Button>
          <Button variant="primary" size="md" onClick={() => navigate('/dashboard')}>Go to dashboard</Button>
          <Button variant="outline" size="md" onClick={() => navigate('/practice')}>Start practising</Button>
        </div>

        <div style={{ display:'flex', justifyContent:'center', gap:20, marginTop:40 }}>
          {[['🧩','Practice'],['🤖','Interview'],['👥','Community']].map(([ic,label]) => (
            <button key={label} onClick={() => navigate(`/${label.toLowerCase()}`)} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6, padding:'14px 20px', borderRadius:12, background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.07)', cursor:'pointer', transition:'all .2s', color:'#475569', fontFamily:'JetBrains Mono,monospace', fontSize:11 }}>
              <span style={{ fontSize:22 }}>{ic}</span>{label}
            </button>
          ))}
        </div>
      </div>
      <div id="cur-dot"/><div id="cur-ring"/>
    </div>
  )
}