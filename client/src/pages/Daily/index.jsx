import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../../components/layout/Navbar'
import { useCanvasBg } from '../../hooks/useCanvasBg'
import { useCursor } from '../../hooks/useCursor'
import { useToast } from '../../components/ui/Toast'
import { GlassCard } from '../../components/ui/Atoms'
import { Badge } from '../../components/ui/Atoms'
import { DiffBadge } from '../../components/ui/Atoms'
import { Button } from '../../components/ui/Button'
import { problemService } from '../../api/services/problemService'


const [today,      setToday]      = useState(null)
const [solvedToday,setSolvedToday]= useState(false)
const [loading,    setLoading]    = useState(true)

useEffect(() => {
  problemService.getDailyProblem()
    .then(({ data }) => {
      setToday(data.data.problem)
      setSolvedToday(data.data.solvedToday)
    })
    .catch(() => toast('Failed to load daily challenge', 'error'))
    .finally(() => setLoading(false))
}, [])

const PAST = [
  { title: 'Two Sum', diff: 'Easy', date: 'Yesterday', solved: true, xp: 30 },
  { title: 'Valid Parentheses', diff: 'Easy', date: '2 days ago', solved: true, xp: 30 },
  { title: 'Merge Intervals', diff: 'Medium', date: '3 days ago', solved: true, xp: 50 },
  { title: 'Word Search', diff: 'Hard', date: '4 days ago', solved: false, xp: 0 },
  { title: 'Climbing Stairs', diff: 'Easy', date: '5 days ago', solved: true, xp: 30 },
]

function useCountdown() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const end = new Date(); end.setHours(23, 59, 59, 999)
      const diff = end - now
      const h = String(Math.floor(diff / 3600000)).padStart(2, '0')
      const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0')
      const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0')
      setTime(`${h}:${m}:${s}`)
    }
    tick(); const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

export default function DailyPage() {
  useCanvasBg('daily-canvas')
  useCursor()
  const toast = useToast()
  const navigate = useNavigate()
  const countdown = useCountdown()

  const [solved, setSolved] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSolve = () => {
    navigate(`/practice/${TODAY.id}`)
  }

  const handleMarkDone = () => {
    setSolved(true)
    setSubmitted(true)
    toast(`🎉 Daily challenge complete! +${TODAY.xp + TODAY.streak_bonus} XP earned`, 'success', 4000)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#080909', color: '#f8fafc', fontFamily: 'Geist,sans-serif' }}>
      <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;700&family=Geist:wght@300;400;500;600&display=swap" rel="stylesheet" />
      <style>{`body{cursor:none}#cur-dot{width:5px;height:5px;border-radius:50%;background:#00d2ff;box-shadow:0 0 8px #00d2ff;position:fixed;top:0;left:0;pointer-events:none;z-index:9999}#cur-ring{width:28px;height:28px;border-radius:50%;border:1.5px solid rgba(0,210,255,.5);position:fixed;top:0;left:0;pointer-events:none;z-index:9998;transition:width .2s,height .2s}body.hov #cur-ring{width:44px;height:44px;border-color:rgba(124,58,237,.7);margin:-8px}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}`}</style>
      <canvas id="daily-canvas" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <main style={{ maxWidth: 1000, margin: '0 auto', padding: '100px 24px 60px' }}>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <Badge variant="amber" pulse>Daily Challenge</Badge>
              <h1 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontWeight: 800, fontSize: 'clamp(1.8rem,3vw,2.4rem)', letterSpacing: '-.03em', lineHeight: 1.1, margin: '12px 0 8px' }}>
                {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
              </h1>
              <p style={{ fontSize: 14, color: '#475569' }}>Solve today's problem to keep your streak alive.</p>
            </div>
            {/* Countdown */}
            <div style={{ textAlign: 'center', padding: '16px 24px', borderRadius: 14, background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)' }}>
              <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 10, color: '#475569', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 6 }}>Resets in</div>
              <div style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontWeight: 800, fontSize: '1.8rem', color: '#f59e0b', letterSpacing: '.04em' }}>{countdown}</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24, alignItems: 'start' }}>

            {/* Main challenge card */}
            <div>
              <GlassCard hover={false} className="p-6" style={{ marginBottom: 16, animation: 'fadeUp .4s ease' }}>
                {solved && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 10, background: 'rgba(16,185,129,.08)', border: '1px solid rgba(16,185,129,.25)', marginBottom: 20 }}>
                    <span style={{ fontSize: 20 }}>✅</span>
                    <div>
                      <div style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontWeight: 700, fontSize: 14, color: '#10b981' }}>Challenge completed!</div>
                      <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 11, color: '#475569' }}>+{TODAY.xp + TODAY.streak_bonus} XP · Streak maintained 🔥</div>
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <h2 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontWeight: 800, fontSize: '1.3rem', letterSpacing: '-.02em', margin: 0 }}>{TODAY.title}</h2>
                  <DiffBadge level={TODAY.diff} />
                  <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 10, color: '#475569', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 4, padding: '2px 7px' }}>{TODAY.tag}</span>
                </div>

                <p style={{ fontFamily: 'Geist,sans-serif', fontSize: 14, color: '#475569', lineHeight: 1.75, marginBottom: 24 }}>{TODAY.desc}</p>

                {/* XP breakdown */}
                <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
                  {[['Base XP', `+${TODAY.xp}`, '#00d2ff'], ['Streak bonus', `+${TODAY.streak_bonus}`, '#f59e0b'], ['Total', `+${TODAY.xp + TODAY.streak_bonus}`, '#10b981']].map(([k, v, c]) => (
                    <div key={k} style={{ flex: 1, padding: '10px 12px', borderRadius: 10, background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.06)', textAlign: 'center' }}>
                      <div style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontWeight: 800, fontSize: 18, color: c }}>{v}</div>
                      <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 10, color: '#1e293b', marginTop: 2 }}>{k}</div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: 10 }}>
                  <Button variant="primary" size="lg" style={{ flex: 1 }} onClick={handleSolve} disabled={solved}>
                    {solved ? '✓ Solved today' : '🚀 Solve now →'}
                  </Button>
                  {!solved && (
                    <Button variant="ghost" size="lg" onClick={handleMarkDone}>Mark as done</Button>
                  )}
                </div>
              </GlassCard>

              {/* Past challenges */}
              <GlassCard hover={false} className="p-5">
                <div style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontWeight: 700, fontSize: 14, color: '#f8fafc', marginBottom: 14 }}>Past challenges</div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {PAST.map((p, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '11px 0', borderBottom: i < PAST.length - 1 ? '1px solid rgba(255,255,255,.05)' : 'none' }}>
                      <span style={{ fontSize: 16 }}>{p.solved ? '✅' : '❌'}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontWeight: 600, fontSize: 13, color: p.solved ? '#f8fafc' : '#475569' }}>{p.title}</div>
                        <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 10, color: '#1e293b' }}>{p.date}</div>
                      </div>
                      <DiffBadge level={p.diff} />
                      {p.solved && <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 11, color: '#f59e0b' }}>+{p.xp} XP</span>}
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>

            {/* Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 100 }}>
              <GlassCard hover={false} className="p-5">
                <div style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontWeight: 700, fontSize: 14, color: '#f8fafc', marginBottom: 14 }}>Your streak</div>
                <div style={{ textAlign: 'center', marginBottom: 14 }}>
                  <div style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontWeight: 800, fontSize: '3rem', lineHeight: 1 }}>🔥</div>
                  <div style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontWeight: 800, fontSize: '2rem', color: '#f59e0b', marginTop: 4 }}>14</div>
                  <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 11, color: '#475569' }}>day streak</div>
                </div>
                <div style={{ height: 4, borderRadius: 999, background: 'rgba(255,255,255,.06)', overflow: 'hidden', marginBottom: 8 }}>
                  <div style={{ height: '100%', width: '67%', borderRadius: 999, background: 'linear-gradient(90deg,#f59e0b80,#f59e0b)' }} />
                </div>
                <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 10, color: '#475569', textAlign: 'center' }}>20 days to next badge</div>
              </GlassCard>

              <GlassCard hover={false} className="p-5">
                <div style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontWeight: 700, fontSize: 14, color: '#f8fafc', marginBottom: 12 }}>XP this week</div>
                {[['Mon', '🟩', 50], ['Tue', '🟩', 80], ['Wed', '🟩', 50], ['Thu', '🟨', 0], ['Fri', '🟩', 50], ['Sat', '🟩', 80], ['Sun', '⬜', 0]].map(([d, e, x]) => (
                  <div key={d} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0' }}>
                    <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 11, color: '#475569', width: 28 }}>{d}</span>
                    <span style={{ fontSize: 14 }}>{e}</span>
                    <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 11, color: x ? '#f59e0b' : '#1e293b' }}>{x ? `+${x} XP` : '—'}</span>
                  </div>
                ))}
                <div style={{ marginTop: 12, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,.06)', fontFamily: 'Bricolage Grotesque,sans-serif', fontWeight: 700, fontSize: 13, color: '#f8fafc', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Total</span><span style={{ color: '#f59e0b' }}>+310 XP</span>
                </div>
              </GlassCard>
            </div>
          </div>
        </main>
      </div>
      <div id="cur-dot" /><div id="cur-ring" />
    </div>
  )
}