import React, { useState, useEffect } from 'react'
import { GlassCard } from '../../components/ui/Atoms'
import { Button }    from '../../components/ui/Button'
import { SectionHeader } from './SectionHeader'
import { userService } from '../../api/userService'
import { useToast } from '../../components/ui/Toast'

const NOTIFS = [
  { id:'emailOnLike',    label:'Email on Like',       desc:'When someone likes your post',    default:true  },
  { id:'emailOnComment', label:'Email on Comment',       desc:'When someone comments on your post', default:true  },
  { id:'emailOnConnection',label:'Email on Connection',   desc:'When you receive a connection request',     default:true },
  { id:'pushOnMessage',  label:'Push on Message',      desc:'When you receive a new message',default:true },
  { id:'dailyReminder',  label:'Daily Reminder',       desc:'Daily nudge to keep your streak alive',       default:true  },
  { id:'weeklyDigest',   label:'Weekly digest',        desc:'Your weekly progress summary email',       default:false  },
]

export function NotificationsSection() {
  const [prefs, setPrefs] = useState({
    emailOnLike: true, emailOnComment: true, emailOnConnection: true,
    pushOnMessage: true, dailyReminder: true, weeklyDigest: false,
  })
  const [saving, setSaving] = useState(false)
  const toast = useToast()

  useEffect(() => {
    userService.getNotifPrefs()
      .then(({ data }) => {
        if (data?.data?.prefs) {
          setPrefs(data.data.prefs)
        }
      })
      .catch(() => {})
  }, [])

  const toggle = (key) => setPrefs(p => ({ ...p, [key]: !p[key] }))

  const save = async () => {
    setSaving(true)
    try {
      await userService.saveNotifPrefs(prefs)
      toast('Preferences saved ✓', 'success')
    } catch {
      toast('Failed to save', 'error')
    } finally {
      setSaving(false)
    }
  }

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
        <Button variant="primary" size="md" onClick={save} disabled={saving}>
          {saving ? 'Saving...' : 'Save preferences'}
        </Button>
      </div>
    </div>
  )
}