import React, { useState, useRef, useEffect } from 'react'
import { MessageBubble } from './MessageBubble'
import { Button }        from '../../components/ui/Button'
import { messageService } from '../../api/services/messageService'

export function ChatWindow({ convo }) {
const [messages, setMessages] = useState([])
const [input,    setInput]    = useState('')
const [loading,  setLoading]  = useState(true)
const [sending,  setSending]  = useState(false)

useEffect(() => {
  if (!convo?._id) return
  setLoading(true)
  messageService.getMessages(convo._id)
    .then(({ data }) => setMessages(data.data.messages))
    .catch(() => {})
    .finally(() => setLoading(false))
}, [convo?._id])


const send = async () => {
  const text = input.trim()
  if (!text || sending) return
  setInput('')
  setSending(true)
  try {
    const { data } = await messageService.sendMessage(convo._id, text)
    setMessages(m => [...m, data.data.message])
  } catch {
    toast('Failed to send', 'error')
    setInput(text)
  } finally {
    setSending(false)
  }
}
  if (!convo) return <div style={{ display:'flex', alignItems:'center', justifyContent:'center', color:'#475569', fontFamily:'JetBrains Mono,monospace', fontSize:13 }}>Select a conversation</div>

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%' }}>
      {/* Header */}
      <div style={{ padding:'14px 18px', borderBottom:'1px solid rgba(255,255,255,.06)', display:'flex', alignItems:'center', gap:12, flexShrink:0 }}>
        <div style={{ position:'relative' }}>
          <div style={{ width:38, height:38, borderRadius:'50%', background:'linear-gradient(135deg,rgba(0,210,255,.2),rgba(124,58,237,.2))', border:'1.5px solid rgba(0,210,255,.2)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:13, color:'#00d2ff' }}>{convo.avatar}</div>
          {convo.online && <div style={{ position:'absolute', bottom:1, right:1, width:9, height:9, borderRadius:'50%', background:'#10b981', border:'1.5px solid #080909' }}/>}
        </div>
        <div>
          <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:14, color:'#f8fafc' }}>{convo.name}</div>
          <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color: convo.online ? '#10b981' : '#475569' }}>{convo.online ? '● Online' : '○ Offline'} · {convo.college}</div>
        </div>
        <div style={{ marginLeft:'auto', display:'flex', gap:8 }}>
          <Button variant="ghost" size="sm">View profile</Button>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex:1, overflowY:'auto', padding:'16px 18px', display:'flex', flexDirection:'column', gap:10 }}>
        {messages.map((m,i) => <MessageBubble key={i} message={m} convo={convo}/>)}
        {typing && (
          <div style={{ display:'flex', gap:10, alignItems:'flex-end' }}>
            <div style={{ width:28, height:28, borderRadius:'50%', background:'rgba(0,210,255,.1)', border:'1px solid rgba(0,210,255,.2)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:10, color:'#00d2ff', flexShrink:0 }}>{convo.avatar}</div>
            <div style={{ padding:'10px 14px', borderRadius:'16px 16px 16px 4px', background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.07)', display:'flex', gap:4, alignItems:'center' }}>
              {[0,1,2].map(i => <span key={i} style={{ width:5, height:5, borderRadius:'50%', background:'#475569', display:'inline-block', animation:`dotB 1.2s ${i*.2}s infinite` }}/>)}
            </div>
          </div>
        )}
        <div ref={bottomRef}/>
      </div>

      {/* Input */}
      <div style={{ padding:'12px 16px', borderTop:'1px solid rgba(255,255,255,.06)', display:'flex', gap:10, flexShrink:0 }}>
        <input
          value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder={`Message ${convo.name.split(' ')[0]}…`}
          style={{ flex:1, padding:'10px 14px', background:'#111214', border:'1px solid rgba(255,255,255,.08)', borderRadius:10, outline:'none', fontFamily:'Geist,sans-serif', fontSize:14, color:'#f8fafc' }}
        />
        <Button variant="primary" size="md" onClick={send} disabled={!input.trim()}>Send →</Button>
      </div>

      <style>{`@keyframes dotB{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-5px)}}`}</style>
    </div>
  )
}