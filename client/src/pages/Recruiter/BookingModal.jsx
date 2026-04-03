import React, { useState } from 'react'
import { Modal, ModalFooter } from '../../components/ui/Modal'
import { Button }             from '../../components/ui/Button'

const SLOTS = [
  'Today  2:00 PM','Today  4:30 PM',
  'Tomorrow  10:00 AM','Tomorrow  3:00 PM',
  'Wed  11:00 AM','Wed  5:00 PM',
  'Thu  9:00 AM','Thu  2:00 PM',
]

export function BookingModal({ candidate, onClose }) {
  const [slot,      setSlot]      = useState('')
  const [duration,  setDuration]  = useState(30)
  const [confirmed, setConfirmed] = useState(false)

  const handleConfirm = () => {
    if (!slot) return
    setConfirmed(true)
    setTimeout(onClose, 2200)
  }

  // Reset when re-opening
  const handleClose = () => { setSlot(''); setConfirmed(false); onClose() }

  return (
    <Modal open={!!candidate} onClose={handleClose} title={`Book session — ${candidate?.name ?? ''}`} width={480}>
      {!confirmed ? (
        <>
          <p style={{ fontSize:13, color:'#475569', marginBottom:20, lineHeight:1.6 }}>
            Select a time slot and duration. The candidate will receive an invite automatically.
          </p>

          {/* Duration */}
          <div style={{ marginBottom:20 }}>
            <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:11, color:'#475569', letterSpacing:'.07em', textTransform:'uppercase', marginBottom:10 }}>Duration</div>
            <div style={{ display:'flex', gap:8 }}>
              {[15,30,45].map(d => (
                <button key={d} onClick={() => setDuration(d)} style={{
                  flex:1, padding:'9px', borderRadius:9, border:`1px solid ${duration===d ? 'rgba(0,210,255,.4)' : 'rgba(255,255,255,.07)'}`,
                  background: duration===d ? 'rgba(0,210,255,.1)' : '#111214',
                  fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:13,
                  color: duration===d ? '#00d2ff' : '#475569', cursor:'pointer', transition:'all .15s',
                }}>{d} min</button>
              ))}
            </div>
          </div>

          {/* Slots */}
          <div style={{ marginBottom:8 }}>
            <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:11, color:'#475569', letterSpacing:'.07em', textTransform:'uppercase', marginBottom:10 }}>Available slots</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
              {SLOTS.map(s => (
                <button key={s} onClick={() => setSlot(s)} style={{
                  padding:'9px 12px', borderRadius:9, textAlign:'left', cursor:'pointer', transition:'all .15s',
                  background: slot===s ? 'rgba(0,210,255,.1)' : '#111214',
                  border:`1px solid ${slot===s ? 'rgba(0,210,255,.4)' : 'rgba(255,255,255,.07)'}`,
                  fontFamily:'JetBrains Mono,monospace', fontSize:11,
                  color: slot===s ? '#00d2ff' : '#475569',
                }}>{s}</button>
              ))}
            </div>
          </div>

          <ModalFooter>
            <Button variant="ghost"   size="sm" onClick={handleClose}>Cancel</Button>
            <Button variant="primary" size="sm" onClick={handleConfirm} disabled={!slot}>Confirm booking →</Button>
          </ModalFooter>
        </>
      ) : (
        <div style={{ textAlign:'center', padding:'20px 0' }}>
          <div style={{ fontSize:40, marginBottom:12 }}>✅</div>
          <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:16, color:'#10b981', marginBottom:6 }}>Booking confirmed!</div>
          <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:12, color:'#475569' }}>{slot} · {duration} min · {candidate?.name}</div>
        </div>
      )}
    </Modal>
  )
}