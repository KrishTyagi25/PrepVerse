import React, { useState } from 'react'
import { GlassCard } from '../../../components/ui/Atoms'
import { Badge }     from '../../../components/ui/Atoms'
import { Button }    from '../../../components/ui/Button'
import { Modal, ModalFooter } from '../../../components/ui/Modal'

const RECRUITERS = [
  { id:1, name:'Arjun Nair',     company:'Google',    role:'Senior SWE',    rating:4.9, sessions:312, tags:['DSA','System Design','Frontend'], available:'Today 3 PM', avatar:'AN' },
  { id:2, name:'Sneha Kapoor',   company:'Amazon',    role:'SDE-2',         rating:4.8, sessions:241, tags:['Backend','APIs','Java'],          available:'Today 5 PM', avatar:'SK' },
  { id:3, name:'Rahul Das',      company:'Meta',      role:'Staff Eng',     rating:4.9, sessions:189, tags:['Frontend','React','Performance'],  available:'Tomorrow 11 AM', avatar:'RD' },
  { id:4, name:'Priya Menon',    company:'Flipkart',  role:'SDE-3',         rating:4.7, sessions:156, tags:['ML','Python','Data Structures'],   available:'Tomorrow 2 PM', avatar:'PM' },
  { id:5, name:'Vikram Singh',   company:'Microsoft', role:'Senior SWE',    rating:4.8, sessions:203, tags:['System Design','C++','Algorithms'],'available':'Wed 10 AM', avatar:'VS' },
]

const COMPANY_COLORS = { Google:'#4285f4', Amazon:'#ff9900', Meta:'#0668e1', Flipkart:'#2874f0', Microsoft:'#00a4ef' }

export function WaitingRoom({ onJoin, onBack }) {
  const [selected, setSelected]   = useState(null)
  const [bookModal, setBookModal] = useState(false)
  const [booked,   setBooked]     = useState(false)

  const handleBook = () => {
    setBooked(true)
    setTimeout(() => { setBookModal(false); setBooked(false); onJoin() }, 2200)
  }

  return (
    <div>
      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:8 }}>
        <button onClick={onBack} style={{ background:'none', border:'none', color:'#475569', cursor:'pointer', fontSize:20, padding:0 }}>←</button>
        <Badge variant="violet" pulse>Live Recruiters</Badge>
      </div>
      <h1 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:'clamp(1.6rem,3vw,2rem)', letterSpacing:'-.03em', lineHeight:1.1, margin:'10px 0 8px' }}>
        Book a session
      </h1>
      <p style={{ fontSize:14, color:'#475569', marginBottom:28, lineHeight:1.7 }}>
        Choose a recruiter, pick a slot, and get real human feedback on your interview skills.
      </p>

      <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
        {RECRUITERS.map(r => (
          <GlassCard key={r.id} hover className="p-5" style={{ cursor:'pointer', outline: selected?.id === r.id ? '1px solid rgba(0,210,255,.35)' : 'none' }}
            onClick={() => setSelected(r)}>
            <div style={{ display:'flex', alignItems:'center', gap:14, flexWrap:'wrap' }}>
              {/* Avatar */}
              <div style={{ width:48, height:48, borderRadius:'50%', background:`${COMPANY_COLORS[r.company]}22`, border:`2px solid ${COMPANY_COLORS[r.company]}55`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:16, color:COMPANY_COLORS[r.company], flexShrink:0 }}>{r.avatar}</div>

              <div style={{ flex:1, minWidth:180 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap', marginBottom:3 }}>
                  <span style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:15, color:'#f8fafc' }}>{r.name}</span>
                  <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:COMPANY_COLORS[r.company], background:`${COMPANY_COLORS[r.company]}15`, border:`1px solid ${COMPANY_COLORS[r.company]}35`, borderRadius:4, padding:'1px 7px' }}>{r.company}</span>
                </div>
                <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#475569', marginBottom:8 }}>{r.role} · ⭐ {r.rating} · {r.sessions} sessions</div>
                <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                  {r.tags.map(t => <span key={t} style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#475569', background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.07)', borderRadius:4, padding:'1px 6px' }}>{t}</span>)}
                </div>
              </div>

              <div style={{ textAlign:'right', flexShrink:0 }}>
                <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#10b981', marginBottom:8 }}>● {r.available}</div>
                <Button variant={selected?.id === r.id ? 'primary' : 'ghost'} size="sm"
                  onClick={e => { e.stopPropagation(); setSelected(r); setBookModal(true) }}>
                  Book →
                </Button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Booking modal */}
      <Modal open={bookModal} onClose={() => { setBookModal(false); setBooked(false) }} title={`Book with ${selected?.name ?? ''}`} width={440}>
        {!booked ? (
          <>
            <p style={{ fontSize:13, color:'#475569', lineHeight:1.7, marginBottom:18 }}>
              You're booking a 30-min live interview with <strong style={{ color:'#f8fafc' }}>{selected?.name}</strong> ({selected?.company}). You'll get an email confirmation and a meeting link.
            </p>
            <div style={{ padding:'12px 14px', borderRadius:10, background:'rgba(0,210,255,.05)', border:'1px solid rgba(0,210,255,.15)', fontFamily:'JetBrains Mono,monospace', fontSize:12, color:'#00d2ff', marginBottom:16 }}>
              📅 {selected?.available} · 30 minutes · Video call
            </div>
            <ModalFooter>
              <Button variant="ghost"   size="sm" onClick={() => setBookModal(false)}>Cancel</Button>
              <Button variant="primary" size="sm" onClick={handleBook}>Confirm booking →</Button>
            </ModalFooter>
          </>
        ) : (
          <div style={{ textAlign:'center', padding:'20px 0' }}>
            <div style={{ fontSize:40, marginBottom:12 }}>✅</div>
            <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:16, color:'#10b981', marginBottom:6 }}>Booked! Joining session…</div>
            <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:12, color:'#475569' }}>{selected?.available} · {selected?.name}</div>
          </div>
        )}
      </Modal>
    </div>
  )
}