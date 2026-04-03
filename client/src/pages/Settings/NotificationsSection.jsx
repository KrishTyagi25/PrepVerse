import React, { useState } from 'react'
import { GlassCard } from '../../components/ui/Atoms'
import { Button }    from '../../components/ui/Button'
import { SectionHeader } from './SectionHeader'


const NOTIFS = [
  { id:'streak',    label:'Streak reminders',       desc:'Daily nudge to keep your streak alive',    default:true  },
  { id:'interview', label:'Interview invites',       desc:'When a recruiter books you for a session', default:true  },
  { id:'leaderboard',label:'Leaderboard updates',   desc:'When your rank changes significantly',     default:false },
  { id:'newproblem',label:'New problems',            desc:'When new company-tagged problems are added',default:false },
  { id:'digest',    label:'Weekly digest',           desc:'Your weekly progress summary email',       default:true  },
]

export function NotificationsSection() {
  const [prefs, setPrefs] = useState(Object.fromEntries(NOTIFS.map(n => [n.id, n.default])))
  const [saved, setSaved] = useState(false)

  const toggle = id => setPrefs(p => ({ ...p, [id]: !p[id] }))
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  return (
    <div>
      <SectionHeader title="Notifications" desc="Choose what you want to be notified about."/>
      <GlassCard hover={false} className="p-6" style={{ marginBottom:16 }}>
        <div style={{ display:'flex', flexDirection:'column' }}>
          {NOTIFS.map((n, i) => (
            <div key={n.id} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'16px 0', borderBottom: i < NOTIFS.length-1 ? '1px solid rgba(255,255,255,.05)' : 'none' }}>
              <div>
                <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:600, fontSize:14, color:'#f8fafc', marginBottom:3 }}>{n.label}</div>
                <div style={{ fontFamily:'Geist,sans-serif', fontSize:13, color:'#475569' }}>{n.desc}</div>
              </div>
              {/* Toggle switch */}
              <div onClick={() => toggle(n.id)} style={{ width:44, height:24, borderRadius:999, background: prefs[n.id] ? 'linear-gradient(90deg,#00d2ff,#7c3aed)' : 'rgba(255,255,255,.08)', cursor:'pointer', position:'relative', transition:'background .25s', flexShrink:0 }}>
                <div style={{ position:'absolute', top:3, left: prefs[n.id] ? 23 : 3, width:18, height:18, borderRadius:'50%', background:'#fff', transition:'left .25s cubic-bezier(.34,1.56,.64,1)', boxShadow:'0 1px 4px rgba(0,0,0,.3)' }}/>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
      <div style={{ display:'flex', justifyContent:'flex-end' }}>
        <Button variant="primary" size="md" onClick={handleSave}>{saved ? '✓ Saved!' : 'Save preferences'}</Button>
      </div>
    </div>
  )
}