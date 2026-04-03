import React, { useState } from 'react'
import { Modal, ModalFooter } from '../../components/ui/Modal'
import { Field }              from '../../components/ui/Field'
import { Button }             from '../../components/ui/Button'

const STACK_OPTIONS = ['React','Vue','Angular','Next.js','Node.js','Express','FastAPI','Django','MongoDB','PostgreSQL','MySQL','Redis','TypeScript','Python','Java','C++','Docker','AWS','TailwindCSS','GraphQL','Socket.io','D3.js']

export function AddProjectModal({ open, onClose, onAdd }) {
  const [name,    setName]    = useState('')
  const [desc,    setDesc]    = useState('')
  const [github,  setGithub]  = useState('')
  const [live,    setLive]    = useState('')
  const [stack,   setStack]   = useState([])
  const [errors,  setErrors]  = useState({})

  const toggleStack = (s) => setStack(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])

  const handleAdd = () => {
    const e = {}
    if (!name.trim()) e.name = 'Project name is required'
    if (!desc.trim()) e.desc = 'Description is required'
    if (!github.trim()) e.github = 'GitHub link is required'
    if (Object.keys(e).length) { setErrors(e); return }
    onAdd({ name, desc, github, live: live || null, stack })
    setName(''); setDesc(''); setGithub(''); setLive(''); setStack([]); setErrors({})
    onClose()
  }

  const handleClose = () => {
    setName(''); setDesc(''); setGithub(''); setLive(''); setStack([]); setErrors({})
    onClose()
  }

  return (
    <Modal open={open} onClose={handleClose} title="Add a project" width={520}>
      <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
        <Field label="Project name" placeholder="PrepVerse, AlgoVisualizer…" value={name} onChange={e=>setName(e.target.value)} error={errors.name} required icon={<FolderIcon/>}/>

        <div>
          <label style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:11, fontWeight:700, letterSpacing:'.09em', textTransform:'uppercase', color:'#475569', display:'block', marginBottom:6 }}>Description <span style={{ color:'#f43f5e' }}>*</span></label>
          <textarea value={desc} onChange={e=>setDesc(e.target.value)} rows={3} placeholder="What does this project do? Who uses it?" style={{ width:'100%', padding:'10px 12px', background:'#111214', border:`1px solid ${errors.desc ? '#f43f5e' : 'rgba(255,255,255,.08)'}`, borderRadius:10, outline:'none', fontFamily:'Geist,sans-serif', fontSize:14, color:'#f8fafc', resize:'none', lineHeight:1.5, boxSizing:'border-box' }}/>
          {errors.desc && <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#f43f5e' }}>{errors.desc}</span>}
        </div>

        <Field label="GitHub URL" placeholder="https://github.com/you/project" value={github} onChange={e=>setGithub(e.target.value)} error={errors.github} required icon={<LinkIcon/>}/>
        <Field label="Live URL (optional)" placeholder="https://yourproject.vercel.app" value={live} onChange={e=>setLive(e.target.value)} icon={<GlobeIcon/>}/>

        {/* Stack picker */}
        <div>
          <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:11, fontWeight:700, letterSpacing:'.09em', textTransform:'uppercase', color:'#475569', marginBottom:8 }}>Tech stack</div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
            {STACK_OPTIONS.map(s => (
              <button key={s} onClick={() => toggleStack(s)} style={{
                padding:'4px 10px', borderRadius:999, border:`1px solid ${stack.includes(s) ? 'rgba(0,210,255,.4)' : 'rgba(255,255,255,.07)'}`,
                background: stack.includes(s) ? 'rgba(0,210,255,.12)' : 'rgba(255,255,255,.025)',
                fontFamily:'JetBrains Mono,monospace', fontSize:11, cursor:'pointer', transition:'all .15s',
                color: stack.includes(s) ? '#00d2ff' : '#475569',
              }}>{s}</button>
            ))}
          </div>
        </div>
      </div>

      <ModalFooter>
        <Button variant="ghost"   size="sm" onClick={handleClose}>Cancel</Button>
        <Button variant="primary" size="sm" onClick={handleAdd}>Add project →</Button>
      </ModalFooter>
    </Modal>
  )
}

function FolderIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg> }
function LinkIcon()   { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg> }
function GlobeIcon()  { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> }