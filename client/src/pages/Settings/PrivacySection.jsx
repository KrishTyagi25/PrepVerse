import React, { useState } from 'react'
import { GlassCard } from '../../components/ui/Atoms'
import { Button }    from '../../components/ui/Button'
import { Modal, ModalFooter } from '../../components/ui/Modal'
import { SectionHeader } from './SectionHeader'


const PRIVACY = [
  { id:'publicProfile',  label:'Public profile',         desc:'Recruiters and other users can discover you',     default:true  },
  { id:'showSolved',     label:'Show solved problems',   desc:'Display which problems you\'ve solved publicly',   default:true  },
  { id:'showStreak',     label:'Show streak publicly',   desc:'Your streak appears on your public profile',       default:true  },
  { id:'showCollege',    label:'Show college',           desc:'Display your college on your profile',             default:true  },
  { id:'recruiterDiscover',label:'Recruiter discovery',  desc:'Appear in recruiter search results',               default:true  },
]

export function PrivacySection() {
  const [prefs,       setPrefs]       = useState(Object.fromEntries(PRIVACY.map(p => [p.id, p.default])))
  const [deleteModal, setDeleteModal] = useState(false)
  const [saved,       setSaved]       = useState(false)

  const toggle = id => setPrefs(p => ({ ...p, [id]: !p[id] }))
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  return (
    <div>
      <SectionHeader title="Privacy" desc="Control who can see your profile and data."/>

      <GlassCard hover={false} className="p-6" style={{ marginBottom:16 }}>
        <div style={{ display:'flex', flexDirection:'column' }}>
          {PRIVACY.map((p, i) => (
            <div key={p.id} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'16px 0', borderBottom: i < PRIVACY.length-1 ? '1px solid rgba(255,255,255,.05)' : 'none' }}>
              <div>
                <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:600, fontSize:14, color:'#f8fafc', marginBottom:3 }}>{p.label}</div>
                <div style={{ fontFamily:'Geist,sans-serif', fontSize:13, color:'#475569' }}>{p.desc}</div>
              </div>
              <div onClick={() => toggle(p.id)} style={{ width:44, height:24, borderRadius:999, background: prefs[p.id] ? 'linear-gradient(90deg,#00d2ff,#7c3aed)' : 'rgba(255,255,255,.08)', cursor:'pointer', position:'relative', transition:'background .25s', flexShrink:0 }}>
                <div style={{ position:'absolute', top:3, left: prefs[p.id] ? 23 : 3, width:18, height:18, borderRadius:'50%', background:'#fff', transition:'left .25s cubic-bezier(.34,1.56,.64,1)', boxShadow:'0 1px 4px rgba(0,0,0,.3)' }}/>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <Button variant="ghost" size="sm" style={{ color:'#f43f5e', borderColor:'rgba(244,63,94,.25)' }} onClick={() => setDeleteModal(true)}>
          Delete account
        </Button>
        <Button variant="primary" size="md" onClick={handleSave}>{saved ? '✓ Saved!' : 'Save preferences'}</Button>
      </div>

      <Modal open={deleteModal} onClose={() => setDeleteModal(false)} title="Delete account" width={420}>
        <p style={{ fontSize:14, color:'#475569', lineHeight:1.7, marginBottom:16 }}>
          This is permanent. All your progress, streaks, badges, and data will be deleted and cannot be recovered.
        </p>
        <p style={{ fontFamily:'JetBrains Mono,monospace', fontSize:12, color:'#f43f5e' }}>Are you absolutely sure?</p>
        <ModalFooter>
          <Button variant="ghost"   size="sm" onClick={() => setDeleteModal(false)}>Cancel</Button>
          <Button variant="outline" size="sm" style={{ color:'#f43f5e', borderColor:'rgba(244,63,94,.35)' }}>Yes, delete my account</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}