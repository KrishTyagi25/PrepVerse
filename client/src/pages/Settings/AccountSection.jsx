import React, { useState } from 'react'
import { GlassCard } from '../../components/ui/Atoms'
import { Field }     from '../../components/ui/Field'
import { Button }    from '../../components/ui/Button'
import { SectionHeader } from './SectionHeader'

export function AccountSection() {
  const [name,    setName]    = useState('Aryan Sharma')
  const [email,   setEmail]   = useState('aryan@example.com')
  const [bio,     setBio]     = useState('Final year @ DTU • Prepping for FAANG 🔥')
  const [college, setCollege] = useState('Delhi Technological University')
  const [saved,   setSaved]   = useState(false)

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  return (
    <div>
      <SectionHeader title="Account" desc="Manage your personal information and public profile."/>

      <GlassCard hover={false} className="p-6" style={{ marginBottom:16 }}>
        <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:14, color:'#f8fafc', marginBottom:18 }}>Profile</div>

        {/* Avatar row */}
        <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:22, paddingBottom:20, borderBottom:'1px solid rgba(255,255,255,.06)' }}>
          <div style={{ width:60, height:60, borderRadius:'50%', background:'linear-gradient(135deg,rgba(0,210,255,.3),rgba(124,58,237,.3))', border:'2px solid rgba(0,210,255,.3)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:20, color:'#00d2ff', flexShrink:0 }}>AS</div>
          <div>
            <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:600, fontSize:13, color:'#f8fafc', marginBottom:4 }}>Profile photo</div>
            <div style={{ display:'flex', gap:8 }}>
              <Button variant="ghost" size="sm">Upload</Button>
              <Button variant="ghost" size="sm">Remove</Button>
            </div>
          </div>
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          <Field label="Full name"  value={name}    onChange={e=>setName(e.target.value)}    icon={<UserIcon/>}/>
          <Field label="Email"      value={email}   onChange={e=>setEmail(e.target.value)}   type="email" icon={<MailIcon/>}/>
          <Field label="College"    value={college} onChange={e=>setCollege(e.target.value)} icon={<SchoolIcon/>}/>
          <div>
            <label style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:11, fontWeight:700, letterSpacing:'.09em', textTransform:'uppercase', color:'#475569', display:'block', marginBottom:6 }}>Bio</label>
            <textarea value={bio} onChange={e=>setBio(e.target.value)} rows={3} style={{ width:'100%', padding:'11px 13px', background:'#111214', border:'1px solid rgba(255,255,255,.08)', borderRadius:11, outline:'none', fontFamily:'Geist,sans-serif', fontSize:14, color:'#f8fafc', resize:'vertical', lineHeight:1.5, boxSizing:'border-box' }}/>
          </div>
        </div>
      </GlassCard>

      <GlassCard hover={false} className="p-6" style={{ marginBottom:16 }}>
        <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:14, color:'#f8fafc', marginBottom:16 }}>Change password</div>
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <Field label="Current password" type="password" placeholder="••••••••" icon={<LockIcon/>}/>
          <Field label="New password"     type="password" placeholder="••••••••" icon={<LockIcon/>}/>
          <Field label="Confirm new"      type="password" placeholder="••••••••" icon={<LockIcon/>}/>
        </div>
      </GlassCard>

      <div style={{ display:'flex', justifyContent:'flex-end', gap:10 }}>
        <Button variant="ghost"   size="md">Discard</Button>
        <Button variant="primary" size="md" onClick={handleSave}>
          {saved ? '✓ Saved!' : 'Save changes'}
        </Button>
      </div>
    </div>
  )
}

function UserIcon()   { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="7" r="4"/><path d="M4 21v-1a8 8 0 0 1 16 0v1"/></svg> }
function MailIcon()   { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 8 10 6 10-6"/></svg> }
function LockIcon()   { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> }
function SchoolIcon() { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg> }