import React, { useState } from 'react'
import { Field }  from '../../components/ui/Field'
import { Button } from '../../components/ui/Button'

export function Step2Profile({ data, onNext, onBack }) {
  const [college, setCollege] = useState(data.college)
  const [bio,     setBio]     = useState(data.bio)

  return (
    <div>
      <div style={{ textAlign:'center', marginBottom:32 }}>
        <h1 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:'clamp(1.6rem,3vw,2rem)', letterSpacing:'-.03em', lineHeight:1.1, marginBottom:8 }}>
          Tell us a bit about yourself
        </h1>
        <p style={{ fontSize:14, color:'#475569', lineHeight:1.7 }}>This builds your public profile — recruiters can discover you based on this.</p>
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:16, marginBottom:28 }}>
        <Field
          label="College / University"
          placeholder="IIT Delhi, NIT Surathkal, BITS Pilani…"
          value={college}
          onChange={e => setCollege(e.target.value)}
          hint="Optional — helps recruiters filter by college"
          icon={<SchoolIcon/>}
        />
        <div>
          <label style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:11, fontWeight:700, letterSpacing:'.09em', textTransform:'uppercase', color:'#475569', display:'block', marginBottom:6 }}>
            Bio <span style={{ color:'#1e293b', fontWeight:400, textTransform:'none', letterSpacing:0 }}>(optional)</span>
          </label>
          <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} placeholder="Final year CSE at IIT Delhi. Targeting FAANG. Love competitive programming 🚀"
            style={{ width:'100%', padding:'11px 13px', background:'#111214', border:'1px solid rgba(255,255,255,.08)', borderRadius:11, outline:'none', fontFamily:'Geist,sans-serif', fontSize:14, color:'#f8fafc', resize:'none', lineHeight:1.5, boxSizing:'border-box' }}
          />
          <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#475569', marginTop:4 }}>This shows on your public profile. Recruiters see this.</div>
        </div>

        {/* What recruiters see preview */}
        <div style={{ padding:'14px 16px', borderRadius:12, background:'rgba(0,210,255,.04)', border:'1px solid rgba(0,210,255,.15)' }}>
          <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#00d2ff', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:8 }}>Recruiter preview</div>
          <div style={{ display:'flex', gap:10, alignItems:'center' }}>
            <div style={{ width:36, height:36, borderRadius:'50%', background:'rgba(0,210,255,.2)', border:'1.5px solid rgba(0,210,255,.3)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:13, color:'#00d2ff' }}>AS</div>
            <div>
              <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:13, color:'#f8fafc' }}>Aryan Sharma</div>
              <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#475569' }}>{college || 'Your college'}</div>
            </div>
          </div>
          {bio && <p style={{ fontFamily:'Geist,sans-serif', fontSize:12, color:'#475569', lineHeight:1.6, marginTop:8 }}>{bio}</p>}
        </div>
      </div>

      <div style={{ display:'flex', gap:10 }}>
        <Button variant="ghost"   size="lg" onClick={onBack}>← Back</Button>
        <Button variant="primary" size="lg" style={{ flex:1 }} onClick={() => onNext({ college, bio })}>Continue →</Button>
      </div>
    </div>
  )
}

function SchoolIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
}