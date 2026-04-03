import React, { useState, useEffect } from 'react'
import { GlassCard } from '../../../components/ui/Atoms'
import { Button }    from '../../../components/ui/Button'

export function VideoCallRoom({ onEnd }) {
  const [muted,      setMuted]      = useState(false)
  const [camOff,     setCamOff]     = useState(false)
  const [elapsed,    setElapsed]    = useState(0)
  const [chatOpen,   setChatOpen]   = useState(false)
  const [chatInput,  setChatInput]  = useState('')
  const [messages,   setMessages]   = useState([
    { from:'recruiter', text:"Hi! Ready to start? We'll begin with a quick intro, then I'll ask you 2-3 technical questions." }
  ])

  useEffect(() => {
    const id = setInterval(() => setElapsed(e => e + 1), 1000)
    return () => clearInterval(id)
  }, [])

  const mins = String(Math.floor(elapsed / 60)).padStart(2,'0')
  const secs = String(elapsed % 60).padStart(2,'0')

  const sendChat = () => {
    if (!chatInput.trim()) return
    setMessages(m => [...m, { from:'me', text: chatInput }])
    setChatInput('')
  }

  return (
    <div>
      {/* Top bar */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16, padding:'12px 16px', borderRadius:12, background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.07)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <span style={{ width:8, height:8, borderRadius:'50%', background:'#10b981', display:'inline-block', animation:'pulse 2s infinite' }}/>
          <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:12, color:'#10b981' }}>Live · {mins}:{secs}</span>
        </div>
        <span style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:14, color:'#f8fafc' }}>Interview with Arjun Nair · Google</span>
        <Button variant="ghost" size="sm" style={{ color:'#f43f5e', borderColor:'rgba(244,63,94,.25)' }} onClick={onEnd}>End call</Button>
      </div>

      <div style={{ display:'grid', gridTemplateColumns: chatOpen ? '1fr 300px' : '1fr', gap:16 }}>
        {/* Video grid */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          {/* Recruiter video */}
          <GlassCard hover={false} style={{ aspectRatio:'16/9', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:10, position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(124,58,237,.15),rgba(0,0,0,.3))' }}/>
            <div style={{ position:'relative', zIndex:1, width:64, height:64, borderRadius:'50%', background:'linear-gradient(135deg,rgba(66,133,244,.4),rgba(66,133,244,.2))', border:'2px solid rgba(66,133,244,.4)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:22, color:'#4285f4' }}>AN</div>
            <span style={{ position:'relative', zIndex:1, fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:600, fontSize:13, color:'#f8fafc' }}>Arjun Nair</span>
            <div style={{ position:'absolute', bottom:10, left:10, fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'rgba(255,255,255,.5)', background:'rgba(0,0,0,.4)', padding:'2px 8px', borderRadius:4 }}>Google · Recruiter</div>
          </GlassCard>

          {/* My video */}
          <GlassCard hover={false} style={{ aspectRatio:'16/9', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:10, position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', inset:0, background: camOff ? 'rgba(0,0,0,.6)' : 'linear-gradient(135deg,rgba(0,210,255,.1),rgba(0,0,0,.3))' }}/>
            {camOff
              ? <div style={{ position:'relative', zIndex:1, fontSize:32 }}>📷</div>
              : <div style={{ position:'relative', zIndex:1, width:64, height:64, borderRadius:'50%', background:'linear-gradient(135deg,rgba(0,210,255,.4),rgba(124,58,237,.4))', border:'2px solid rgba(0,210,255,.4)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:22, color:'#00d2ff' }}>AS</div>
            }
            <span style={{ position:'relative', zIndex:1, fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:600, fontSize:13, color:'#f8fafc' }}>You</span>
            {muted && <div style={{ position:'absolute', top:10, right:10, fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#f43f5e', background:'rgba(244,63,94,.15)', border:'1px solid rgba(244,63,94,.3)', borderRadius:4, padding:'2px 6px' }}>Muted</div>}
          </GlassCard>
        </div>

        {/* Chat panel */}
        {chatOpen && (
          <GlassCard hover={false} className="p-0" style={{ display:'flex', flexDirection:'column', height:360 }}>
            <div style={{ padding:'12px 14px', borderBottom:'1px solid rgba(255,255,255,.06)', fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:13, color:'#f8fafc' }}>Chat</div>
            <div style={{ flex:1, overflowY:'auto', padding:'12px 14px', display:'flex', flexDirection:'column', gap:8 }}>
              {messages.map((m,i) => (
                <div key={i} style={{ textAlign: m.from === 'me' ? 'right' : 'left' }}>
                  <div style={{ display:'inline-block', padding:'8px 12px', borderRadius: m.from === 'me' ? '12px 12px 2px 12px' : '12px 12px 12px 2px', background: m.from === 'me' ? 'rgba(0,210,255,.15)' : 'rgba(255,255,255,.05)', border:`1px solid ${m.from === 'me' ? 'rgba(0,210,255,.25)' : 'rgba(255,255,255,.07)'}`, fontFamily:'Geist,sans-serif', fontSize:13, color:'#f8fafc', maxWidth:'90%', textAlign:'left' }}>{m.text}</div>
                </div>
              ))}
            </div>
            <div style={{ padding:'10px 12px', borderTop:'1px solid rgba(255,255,255,.06)', display:'flex', gap:8 }}>
              <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendChat()} placeholder="Type a message…" style={{ flex:1, padding:'8px 10px', background:'#111214', border:'1px solid rgba(255,255,255,.08)', borderRadius:8, outline:'none', fontFamily:'Geist,sans-serif', fontSize:13, color:'#f8fafc' }}/>
              <Button variant="primary" size="sm" onClick={sendChat}>Send</Button>
            </div>
          </GlassCard>
        )}
      </div>

      {/* Controls */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:12, marginTop:16 }}>
        <ControlBtn active={muted}  label={muted  ? 'Unmute' : 'Mute'}    icon={muted  ? '🔇' : '🎙'} onClick={() => setMuted(m => !m)}  danger={muted}/>
        <ControlBtn active={camOff} label={camOff ? 'Start cam' : 'Stop cam'} icon={camOff ? '📷' : '📹'} onClick={() => setCamOff(c => !c)} danger={camOff}/>
        <ControlBtn active={chatOpen} label="Chat" icon="💬" onClick={() => setChatOpen(c => !c)}/>
        <ControlBtn label="Share screen" icon="🖥" onClick={() => alert('Screen share would use WebRTC in production')}/>
        <button onClick={onEnd} style={{ padding:'10px 20px', borderRadius:10, border:'none', background:'rgba(244,63,94,.2)', border:'1px solid rgba(244,63,94,.4)', color:'#f43f5e', fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:13, cursor:'pointer', transition:'all .15s' }}>
          End call
        </button>
      </div>

      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
    </div>
  )
}

function ControlBtn({ icon, label, onClick, active, danger }) {
  return (
    <button onClick={onClick} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4, padding:'10px 14px', borderRadius:10, border:`1px solid ${danger ? 'rgba(244,63,94,.3)' : active ? 'rgba(0,210,255,.3)' : 'rgba(255,255,255,.07)'}`, background: danger ? 'rgba(244,63,94,.1)' : active ? 'rgba(0,210,255,.08)' : 'rgba(255,255,255,.03)', cursor:'pointer', transition:'all .15s' }}>
      <span style={{ fontSize:18 }}>{icon}</span>
      <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9, color: danger ? '#f43f5e' : '#475569' }}>{label}</span>
    </button>
  )
}