import React, { useState } from 'react'
import { Navbar } from '../../components/layout/Navbar'
import { useCanvasBg } from '../../hooks/useCanvasBg'
import { useCursor } from '../../hooks/useCursor'
import { GlassCard } from '../../components/ui/Atoms'
import { Badge } from '../../components/ui/Atoms'
import { Tabs } from '../../components/ui/Tabs'
import { NotifItem } from './NotifItem'

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'social', label: 'Social' },
  { id: 'practice', label: 'Practice' },
  { id: 'interview', label: 'Interview' },
]

const INIT_NOTIFS = [
  { id: 1, type: 'connection', read: false, time: '2m ago', actor: 'Priya Sharma', avatar: 'PS', msg: 'sent you a connection request', action: 'Accept', actionVariant: 'primary' },
  { id: 2, type: 'like', read: false, time: '15m ago', actor: 'Rahul Verma', avatar: 'RV', msg: 'liked your post about Merge Intervals', action: 'View post', actionVariant: 'ghost' },
  { id: 3, type: 'interview', read: false, time: '1h ago', actor: 'Arjun Nair', avatar: 'AN', msg: 'confirmed your session for Today 3 PM', action: 'View session', actionVariant: 'primary' },
  { id: 4, type: 'badge', read: false, time: '2h ago', actor: 'PrepVerse', avatar: 'PV', msg: 'You earned the 🔥 7-Day Streak badge!', action: 'View profile', actionVariant: 'ghost' },
  { id: 5, type: 'comment', read: true, time: '3h ago', actor: 'Ananya Singh', avatar: 'AS', msg: 'commented on your post', action: 'View', actionVariant: 'ghost' },
  { id: 6, type: 'solved', read: true, time: '5h ago', actor: 'PrepVerse', avatar: 'PV', msg: 'Daily challenge completed! +50 XP earned', action: 'Next challenge', actionVariant: 'outline' },
  { id: 7, type: 'connection', read: true, time: '1d ago', actor: 'Karan Mehta', avatar: 'KM', msg: 'accepted your connection request', action: 'Message', actionVariant: 'ghost' },
  { id: 8, type: 'interview', read: true, time: '1d ago', actor: 'PrepVerse', avatar: 'PV', msg: 'Your interview score report is ready', action: 'View report', actionVariant: 'primary' },
  { id: 9, type: 'like', read: true, time: '2d ago', actor: 'Sneha Patel', avatar: 'SP', msg: 'liked your post about your Razorpay prep', action: 'View post', actionVariant: 'ghost' },
  { id: 10, type: 'badge', read: true, time: '2d ago', actor: 'PrepVerse', avatar: 'PV', msg: 'You earned the ⚡ Speed Demon badge!', action: 'View badges', actionVariant: 'ghost' },
]

const CATEGORY = { connection: 'social', like: 'social', comment: 'social', interview: 'interview', badge: 'practice', solved: 'practice' }

export default function NotificationsPage() {
  useCanvasBg('notif-canvas')
  useCursor()

  const [notifs, setNotifs] = useState(INIT_NOTIFS)
  const [tab, setTab] = useState('all')

  const unread = notifs.filter(n => !n.read).length

  const markAllRead = () => setNotifs(n => n.map(x => ({ ...x, read: true })))
  const markRead = (id) => setNotifs(n => n.map(x => x.id === id ? { ...x, read: true } : x))
  const remove = (id) => setNotifs(n => n.filter(x => x.id !== id))

  const filtered = notifs.filter(n => tab === 'all' || CATEGORY[n.type] === tab)

  return (
    <div style={{ minHeight: '100vh', background: '#080909', color: '#f8fafc', fontFamily: 'Geist,sans-serif' }}>
      <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;700&family=Geist:wght@300;400;500;600&display=swap" rel="stylesheet" />
      <style>{`body{cursor:none}#cur-dot{width:5px;height:5px;border-radius:50%;background:#00d2ff;box-shadow:0 0 8px #00d2ff;position:fixed;top:0;left:0;pointer-events:none;z-index:9999}#cur-ring{width:28px;height:28px;border-radius:50%;border:1.5px solid rgba(0,210,255,.5);position:fixed;top:0;left:0;pointer-events:none;z-index:9998;transition:width .2s,height .2s}body.hov #cur-ring{width:44px;height:44px;border-color:rgba(124,58,237,.7);margin:-8px}`}</style>
      <canvas id="notif-canvas" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <main style={{ maxWidth: 760, margin: '0 auto', padding: '100px 24px 60px' }}>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <h1 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontWeight: 800, fontSize: 'clamp(1.6rem,3vw,2rem)', letterSpacing: '-.03em', margin: 0 }}>Notifications</h1>
                {unread > 0 && <Badge variant="cyan">{unread} new</Badge>}
              </div>
              <p style={{ fontSize: 14, color: '#475569' }}>Stay updated on connections, achievements, and sessions.</p>
            </div>
            {unread > 0 && (
              <button onClick={markAllRead} style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 11, color: '#00d2ff', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                Mark all as read
              </button>
            )}
          </div>

          <div style={{ marginBottom: 20 }}>
            <Tabs tabs={TABS} active={tab} onChange={setTab} variant="underline" />
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#475569', fontFamily: 'JetBrains Mono,monospace', fontSize: 13 }}>
              No notifications here.
            </div>
          ) : (
            <GlassCard hover={false} className="p-0" style={{ overflow: 'hidden' }}>
              {filtered.map((n, i) => (
                <NotifItem
                  key={n.id} notif={n}
                  isLast={i === filtered.length - 1}
                  onRead={() => markRead(n.id)}
                  onRemove={() => remove(n.id)}
                />
              ))}
            </GlassCard>
          )}
        </main>
      </div>
      <div id="cur-dot" /><div id="cur-ring" />
    </div>
  )
}