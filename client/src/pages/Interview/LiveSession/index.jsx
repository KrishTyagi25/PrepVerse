import React, { useState, useEffect, useRef } from 'react'
import { GlassCard }      from '../../../components/ui/Atoms'
import { Button }         from '../../../components/ui/Button'
import { AIMessageBubble } from './AIMessageBubble'
import { InterviewTimer }  from './InterviewTimer'

const OPENING = {
  fe: "Hi! I'm your AI interviewer today. We'll be covering **{topic}**. Let's start with something foundational — can you explain the difference between `==` and `===` in JavaScript, and when you'd use each?",
  be: "Welcome! Today we're exploring **{topic}**. To kick things off — walk me through how you'd design a rate limiter for a public REST API. What data structure would you use and why?",
  fs: "Great to have you! Our focus is **{topic}**. Let's start broad — how do you decide whether to put logic on the frontend vs the backend in a full-stack app?",
  ml: "Hello! We're diving into **{topic}** today. Let's begin — can you explain the bias-variance tradeoff and how it affects your choice of model complexity?",
}

const FOLLOW_UPS = [
  "That's a solid answer. Can you walk me through a concrete example from a project you've worked on?",
  "Good. Now let's push a bit further — what are the edge cases or failure modes you'd watch for in production?",
  "Interesting approach. How would your answer change if you had to scale this to 10 million users?",
  "Nice. Let's shift gears a little — how does this concept relate to performance optimization?",
  "Great explanation. Last question for this section — if you were reviewing a junior developer's code and spotted this pattern being misused, what feedback would you give?",
]

export function LiveSession({ config, onFinish }) {
  const [messages,    setMessages]    = useState([])
  const [input,       setInput]       = useState('')
  const [aiTyping,    setAiTyping]    = useState(false)
  const [turnCount,   setTurnCount]   = useState(0)
  const [sessionDone, setSessionDone] = useState(false)
  const bottomRef = useRef(null)

  // Open with first AI message
  useEffect(() => {
    const opening = OPENING[config.role]?.replace('{topic}', config.topic) ?? "Let's begin the interview. Tell me about yourself."
    setTimeout(() => {
      setMessages([{ role:'ai', text: opening, ts: now() }])
    }, 600)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior:'smooth' })
  }, [messages, aiTyping])

  const sendMessage = () => {
    const text = input.trim()
    if (!text || aiTyping || sessionDone) return
    setInput('')
    const newMessages = [...messages, { role:'user', text, ts: now() }]
    setMessages(newMessages)
    const nextTurn = turnCount + 1
    setTurnCount(nextTurn)

    if (nextTurn >= 5) {
      // End session
      setAiTyping(true)
      setTimeout(() => {
        setMessages(m => [...m, { role:'ai', text:"That wraps up our session — excellent work! I'm now generating your personalised feedback report.", ts: now() }])
        setAiTyping(false)
        setSessionDone(true)
        setTimeout(() => {
          onFinish(buildReport(config, newMessages))
        }, 2000)
      }, 1400)
    } else {
      // Follow-up question
      setAiTyping(true)
      setTimeout(() => {
        setMessages(m => [...m, { role:'ai', text: FOLLOW_UPS[nextTurn - 1] ?? FOLLOW_UPS[0], ts: now() }])
        setAiTyping(false)
      }, 1200 + Math.random() * 800)
    }
  }

  const handleKey = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }

  return (
    <div style={{ display:'grid', gridTemplateColumns:'1fr 320px', gap:20, alignItems:'start' }}>

      {/* Chat panel */}
      <GlassCard hover={false} className="p-0" style={{ display:'flex', flexDirection:'column', height:'calc(100vh - 180px)' }}>

        {/* Header */}
        <div style={{ padding:'16px 20px', borderBottom:'1px solid rgba(255,255,255,.06)', display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:36, height:36, borderRadius:'50%', background:'linear-gradient(135deg,rgba(124,58,237,.4),rgba(0,210,255,.4))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>🤖</div>
            <div>
              <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:14, color:'#f8fafc' }}>PrepVerse AI</div>
              <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#10b981', display:'flex', alignItems:'center', gap:4 }}>
                <span style={{ width:6, height:6, borderRadius:'50%', background:'#10b981', display:'inline-block', animation:'pulse 2s infinite' }}/>
                Live · {config.topic}
              </div>
            </div>
          </div>
          <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#475569' }}>Q {Math.min(turnCount + 1, 5)} of 5</div>
        </div>

        {/* Messages */}
        <div style={{ flex:1, overflowY:'auto', padding:'20px', display:'flex', flexDirection:'column', gap:16 }}>
          {messages.map((m, i) => <AIMessageBubble key={i} message={m}/>)}
          {aiTyping && (
            <div style={{ display:'flex', gap:12, alignItems:'flex-end' }}>
              <div style={{ width:28, height:28, borderRadius:'50%', background:'linear-gradient(135deg,rgba(124,58,237,.3),rgba(0,210,255,.3))', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14 }}>🤖</div>
              <div style={{ padding:'10px 14px', borderRadius:'16px 16px 16px 4px', background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.07)', display:'flex', gap:4, alignItems:'center' }}>
                {[0,1,2].map(i => <span key={i} style={{ width:6, height:6, borderRadius:'50%', background:'#475569', display:'inline-block', animation:`dotBounce 1.2s ${i*0.2}s infinite` }}/>)}
              </div>
            </div>
          )}
          <div ref={bottomRef}/>
        </div>

        {/* Input */}
        <div style={{ padding:'14px 16px', borderTop:'1px solid rgba(255,255,255,.06)', flexShrink:0 }}>
          {sessionDone ? (
            <div style={{ textAlign:'center', fontFamily:'JetBrains Mono,monospace', fontSize:12, color:'#475569', padding:'8px 0' }}>Generating your report…</div>
          ) : (
            <div style={{ display:'flex', gap:10, alignItems:'flex-end' }}>
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Type your answer… (Enter to send)"
                rows={3}
                style={{ flex:1, padding:'10px 12px', background:'#111214', border:'1px solid rgba(255,255,255,.08)', borderRadius:10, outline:'none', fontFamily:'Geist,sans-serif', fontSize:14, color:'#f8fafc', resize:'none', lineHeight:1.5 }}
              />
              <Button variant="primary" size="md" onClick={sendMessage} disabled={!input.trim() || aiTyping}>Send →</Button>
            </div>
          )}
        </div>
      </GlassCard>

      {/* Sidebar */}
      <div style={{ display:'flex', flexDirection:'column', gap:14, position:'sticky', top:100 }}>
        <InterviewTimer totalMinutes={config.duration} onTimeUp={() => onFinish(buildReport(config, messages))}/>

        <GlassCard hover={false} className="p-4">
          <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:13, color:'#f8fafc', marginBottom:12 }}>Session info</div>
          {[['Role', config.role?.toUpperCase()], ['Topic', config.topic], ['Duration', `${config.duration} min`]].map(([k,v]) => (
            <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'7px 0', borderBottom:'1px solid rgba(255,255,255,.05)' }}>
              <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#475569' }}>{k}</span>
              <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#f8fafc' }}>{v}</span>
            </div>
          ))}
        </GlassCard>

        <GlassCard hover={false} className="p-4">
          <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:13, color:'#f8fafc', marginBottom:10 }}>Tips</div>
          {['Give concrete examples','Mention edge cases','Think out loud','Ask clarifying questions'].map(t => (
            <div key={t} style={{ display:'flex', gap:8, padding:'5px 0', fontFamily:'Geist,sans-serif', fontSize:12, color:'#475569' }}>
              <span style={{ color:'#10b981', flexShrink:0 }}>→</span>{t}
            </div>
          ))}
        </GlassCard>
      </div>

      <style>{`
        @keyframes dotBounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
        textarea::placeholder { color:#1e293b }
        textarea:focus { border-color:rgba(0,210,255,.4) !important; box-shadow:0 0 0 3px rgba(0,210,255,.06) }
        ::-webkit-scrollbar { width:4px } ::-webkit-scrollbar-track { background:transparent } ::-webkit-scrollbar-thumb { background:rgba(255,255,255,.1); border-radius:4px }
      `}</style>
    </div>
  )
}

function now() { return new Date().toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit' }) }

function buildReport(config, messages) {
  // Simulate score generation from message count and length
  const userMessages = messages.filter(m => m.role === 'user')
  const avgLen = userMessages.reduce((s,m) => s + m.text.length, 0) / (userMessages.length || 1)
  const base = Math.min(95, 55 + Math.floor(avgLen / 8))
  return {
    overall:    base,
    clarity:    Math.min(100, base + Math.floor(Math.random()*10) - 5),
    depth:      Math.min(100, base + Math.floor(Math.random()*12) - 6),
    examples:   Math.min(100, base + Math.floor(Math.random()*14) - 7),
    confidence: Math.min(100, base + Math.floor(Math.random()*10) - 4),
    config,
    messages,
  }
}