import React, { useState } from 'react'
import { useAuth }     from '../../context/AuthContext'
import { userService } from '../../api/services/userService'
import { authService } from '../../api/services/authService'
import { useToast }    from '../../components/ui/Toast'
import { GlassCard }   from '../../components/ui/Badge'
import { Field }       from '../../components/ui/Field'
import { Button }      from '../../components/ui/Button'

export function AccountSection() {
  const { user, updateUser } = useAuth()
  const toast  = useToast()

  const [name,    setName]    = useState(user?.name    ?? '')
  const [bio,     setBio]     = useState(user?.bio     ?? '')
  const [college, setCollege] = useState(user?.college ?? '')
  const [github,  setGithub]  = useState(user?.github  ?? '')
  const [linkedin,setLinkedin]= useState(user?.linkedin ?? '')
  const [saving,  setSaving]  = useState(false)

  // Password fields
  const [currentPw,  setCurrentPw]  = useState('')
  const [newPw,      setNewPw]      = useState('')
  const [confirmPw,  setConfirmPw]  = useState('')
  const [pwSaving,   setPwSaving]   = useState(false)

  // Avatar
  const [avatarFile,    setAvatarFile]    = useState(null)
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar ?? '')
  const [avatarSaving,  setAvatarSaving]  = useState(false)

  const handleSaveProfile = async () => {
    setSaving(true)
    try {
      const { data } = await userService.updateProfile({ name, bio, college, github, linkedin })
      updateUser(data.data.user)
      toast('Profile updated ✓', 'success')
    } catch (err) {
      toast(err.response?.data?.message ?? 'Failed to save', 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setAvatarFile(file)
    setAvatarPreview(URL.createObjectURL(file))
  }

  const handleAvatarUpload = async () => {
    if (!avatarFile) return
    setAvatarSaving(true)
    try {
      const fd = new FormData()
      fd.append('avatar', avatarFile)
      const { data } = await userService.updateAvatar(fd)
      updateUser({ avatar: data.data.avatar })
      toast('Avatar updated ✓', 'success')
      setAvatarFile(null)
    } catch (err) {
      toast(err.response?.data?.message ?? 'Upload failed', 'error')
    } finally {
      setAvatarSaving(false)
    }
  }

  const handleChangePassword = async () => {
    if (!currentPw || !newPw || !confirmPw) { toast('All password fields required', 'error'); return }
    if (newPw !== confirmPw) { toast('New passwords do not match', 'error'); return }
    if (newPw.length < 8)   { toast('Password must be at least 8 characters', 'error'); return }
    setPwSaving(true)
    try {
      await authService.changePassword({ currentPassword: currentPw, newPassword: newPw })
      toast('Password changed. Please log in again.', 'success')
      setCurrentPw(''); setNewPw(''); setConfirmPw('')
    } catch (err) {
      toast(err.response?.data?.message ?? 'Failed to change password', 'error')
    } finally {
      setPwSaving(false)
    }
  }

  const initials = user?.name?.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase() ?? 'U'

  return (
    <div>
      <SectionHeader title="Account" desc="Manage your personal information and public profile."/>

      {/* Profile card */}
      <GlassCard hover={false} className="p-6" style={{ marginBottom:16 }}>
        <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:14, color:'#f8fafc', marginBottom:18 }}>Profile</div>

        {/* Avatar */}
        <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:22, paddingBottom:20, borderBottom:'1px solid rgba(255,255,255,.06)' }}>
          <div style={{ position:'relative' }}>
            <div style={{ width:64, height:64, borderRadius:'50%', background:'rgba(0,210,255,.2)', border:'2px solid rgba(0,210,255,.3)', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden', flexShrink:0 }}>
              {avatarPreview
                ? <img src={avatarPreview} alt="avatar" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                : <span style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:22, color:'#00d2ff' }}>{initials}</span>
              }
            </div>
          </div>
          <div>
            <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:600, fontSize:13, color:'#f8fafc', marginBottom:8 }}>Profile photo</div>
            <div style={{ display:'flex', gap:8, alignItems:'center' }}>
              <label style={{ padding:'6px 14px', borderRadius:8, border:'1px solid rgba(255,255,255,.08)', background:'rgba(255,255,255,.025)', fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:600, fontSize:12, color:'#94a3b8', cursor:'pointer', transition:'all .15s' }}>
                Choose file
                <input type="file" accept="image/*" onChange={handleAvatarChange} style={{ display:'none' }}/>
              </label>
              {avatarFile && (
                <Button variant="primary" size="sm" onClick={handleAvatarUpload} disabled={avatarSaving}>
                  {avatarSaving ? 'Uploading…' : 'Upload'}
                </Button>
              )}
            </div>
          </div>
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <Field label="Full name"  value={name}     onChange={e => setName(e.target.value)}     icon={<UserIcon/>}/>
          <Field label="Bio"        value={bio}       onChange={e => setBio(e.target.value)}       hint="Shows on your public profile"/>
          <Field label="College"    value={college}   onChange={e => setCollege(e.target.value)}   icon={<SchoolIcon/>}/>
          <Field label="GitHub URL" value={github}    onChange={e => setGithub(e.target.value)}    placeholder="https://github.com/username"/>
          <Field label="LinkedIn"   value={linkedin}  onChange={e => setLinkedin(e.target.value)}  placeholder="https://linkedin.com/in/username"/>
        </div>

        <div style={{ display:'flex', justifyContent:'flex-end', gap:10, marginTop:18 }}>
          <Button variant="primary" size="md" onClick={handleSaveProfile} disabled={saving}>
            {saving ? 'Saving…' : 'Save changes'}
          </Button>
        </div>
      </GlassCard>

      {/* Change password */}
      <GlassCard hover={false} className="p-6">
        <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:14, color:'#f8fafc', marginBottom:16 }}>Change password</div>
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <Field label="Current password" type="password" value={currentPw} onChange={e => setCurrentPw(e.target.value)} placeholder="••••••••" icon={<LockIcon/>}/>
          <Field label="New password"     type="password" value={newPw}     onChange={e => setNewPw(e.target.value)}     placeholder="Min. 8 characters" icon={<LockIcon/>}/>
          <Field label="Confirm new"      type="password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} placeholder="Repeat new password" icon={<LockIcon/>}/>
        </div>
        <div style={{ display:'flex', justifyContent:'flex-end', marginTop:16 }}>
          <Button variant="primary" size="md" onClick={handleChangePassword} disabled={pwSaving}>
            {pwSaving ? 'Updating…' : 'Update password'}
          </Button>
        </div>
      </GlassCard>
    </div>
  )
}

function SectionHeader({ title, desc }) {
  return (
    <div style={{ marginBottom:24 }}>
      <h2 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:'1.6rem', letterSpacing:'-.03em', marginBottom:6 }}>{title}</h2>
      <p style={{ fontSize:14, color:'#475569', lineHeight:1.6 }}>{desc}</p>
    </div>
  )
}

function UserIcon()   { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="7" r="4"/><path d="M4 21v-1a8 8 0 0 1 16 0v1"/></svg> }
function LockIcon()   { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> }
function SchoolIcon() { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg> }