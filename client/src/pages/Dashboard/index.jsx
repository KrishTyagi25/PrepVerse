import React, { useState, useEffect } from 'react'
import { Navbar } from '../../components/layout/Navbar'
import { useCanvasBg } from '../../hooks/useCanvasBg'
import { useCursor } from '../../hooks/useCursor'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../components/ui/Toast'
import { problemService } from '../../api/problemService'
import { leaderboardService } from '../../api/leaderboardService'
import { WelcomeBanner } from './WelcomeBanner'
import { ProgressRings } from './ProgressRings'
import { StreakCalendar } from './StreakCalendar'
import { RecommendedCard } from './RecommendedCard'
import { ActivityFeed } from './ActivityFeed'
import { QuickActions } from './QuickActions'
import { SkeletonCard } from '../../components/ui/Skeleton'

export default function DashboardPage() {
  useCanvasBg('dash-canvas')
  useCursor()

  const { user } = useAuth()
  const toast = useToast()

  const [stats, setStats] = useState(null)
  const [myRank, setMyRank] = useState(null)
  const [activity, setActivity] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [statsRes, rankRes] = await Promise.all([
          problemService.getMyStats(),
          leaderboardService.getMyRank(),
        ])
        setStats(statsRes.data.data)
        setMyRank(rankRes.data.data)
        setActivity(statsRes.data.data.recentActivity ?? [])
      } catch {
        // silently fail — show what we have
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  const PROGRESS = [
    { label: 'DSA', val: stats ? Math.round((stats.solved.total / 120) * 100) : 0, color: '#00d2ff' },
    { label: 'Easy', val: stats ? Math.round((stats.solved.easy / 50) * 100) : 0, color: '#10b981' },
    { label: 'Medium', val: stats ? Math.round((stats.solved.medium / 50) * 100) : 0, color: '#7c3aed' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#080909', color: '#f8fafc', fontFamily: 'Geist,sans-serif' }}>
      <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;700&family=Geist:wght@300;400;500;600&display=swap" rel="stylesheet" />
      <style>{`
        body{cursor:none}
        #cur-dot{width:5px;height:5px;border-radius:50%;background:#00d2ff;box-shadow:0 0 8px #00d2ff;position:fixed;top:0;left:0;pointer-events:none;z-index:9999}
        #cur-ring{width:28px;height:28px;border-radius:50%;border:1.5px solid rgba(0,210,255,.5);position:fixed;top:0;left:0;pointer-events:none;z-index:9998;transition:width .2s,height .2s}
        body.hov #cur-ring{width:44px;height:44px;border-color:rgba(124,58,237,.7);margin:-8px}
        @keyframes shimmer{from{background-position:200% 0}to{background-position:-200% 0}}
      `}</style>
      <canvas id="dash-canvas" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <main style={{ maxWidth: 1200, margin: '0 auto', padding: '100px 24px 60px' }}>

          {/* Welcome — real name + streak from user object */}
          <WelcomeBanner
            name={user?.name?.split(' ')[0] ?? 'there'}
            streak={user?.streak ?? 0}
          />

          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, marginTop: 28 }}>
              {[1, 2, 3].map(i => <SkeletonCard key={i} lines={4} />)}
            </div>
          ) : (
            <>
              {/* Top row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, marginTop: 28 }}>

                {/* Stats card — real data */}
                <div style={{ background: 'rgba(255,255,255,.02)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 16, padding: 20 }}>
                  <div style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontWeight: 700, fontSize: 14, color: '#f8fafc', marginBottom: 18 }}>Your stats</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    {[
                      ['XP earned', user?.xp ?? 0, '#00d2ff'],
                      ['Streak', `${user?.streak ?? 0}d`, '#f59e0b'],
                      ['Global rank', myRank?.rank ?? '—', '#7c3aed'],
                      ['Solved', user?.solved ?? 0, '#10b981'],
                    ].map(([label, val, color]) => (
                      <div key={label} style={{ padding: '10px 12px', borderRadius: 10, background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.06)', textAlign: 'center' }}>
                        <div style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontWeight: 800, fontSize: 20, color, marginBottom: 2 }}>{val}</div>
                        <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 9, color: '#1e293b' }}>{label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progress bars — real solved counts */}
                <div style={{ background: 'rgba(255,255,255,.02)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 16, padding: 20 }}>
                  <div style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontWeight: 700, fontSize: 14, color: '#f8fafc', marginBottom: 18 }}>Progress</div>
                  {[
                    { label: 'Easy', val: stats?.solved.easy ?? 0, total: 50, color: '#10b981' },
                    { label: 'Medium', val: stats?.solved.medium ?? 0, total: 50, color: '#f59e0b' },
                    { label: 'Hard', val: stats?.solved.hard ?? 0, total: 20, color: '#f43f5e' },
                  ].map(({ label, val, total, color }) => (
                    <div key={label} style={{ marginBottom: 12 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'JetBrains Mono,monospace', fontSize: 11, color: '#475569', marginBottom: 5 }}>
                        <span>{label}</span>
                        <span style={{ color }}>{val} / {total}</span>
                      </div>
                      <div style={{ height: 5, borderRadius: 999, background: 'rgba(255,255,255,.06)', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${Math.min(100, (val / total) * 100)}%`, borderRadius: 999, background: `linear-gradient(90deg,${color}80,${color})`, transition: 'width 1s ease' }} />
                      </div>
                    </div>
                  ))}
                  <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,.06)', display: 'flex', justifyContent: 'space-between', fontFamily: 'JetBrains Mono,monospace', fontSize: 11, color: '#475569' }}>
                    <span>Total solved</span>
                    <span style={{ color: '#f8fafc', fontWeight: 700 }}>{stats?.solved.total ?? 0}</span>
                  </div>
                </div>

                <QuickActions />
              </div>

              {/* Bottom row */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20, marginTop: 20 }}>
                {/* Recent activity — real submissions */}
                <div style={{ background: 'rgba(255,255,255,.02)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 16, padding: 20 }}>
                  <div style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontWeight: 700, fontSize: 14, color: '#f8fafc', marginBottom: 14 }}>Recent activity</div>
                  {activity.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '28px 0', fontFamily: 'JetBrains Mono,monospace', fontSize: 12, color: '#475569' }}>
                      No activity yet — go solve a problem! 🧩
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {activity.slice(0, 6).map((item, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 0', borderBottom: i < Math.min(activity.length, 6) - 1 ? '1px solid rgba(255,255,255,.05)' : 'none' }}>
                          <span style={{ fontSize: 18, flexShrink: 0 }}>✅</span>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontWeight: 600, fontSize: 13, color: '#f8fafc', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {item.problem?.title ?? 'Problem'}
                            </div>
                          </div>
                          <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 10, color: '#1e293b', flexShrink: 0 }}>
                            {new Date(item.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                          </span>
                          {item.problem?.difficulty && (
                            <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 10, color: item.problem.difficulty === 'Easy' ? '#10b981' : item.problem.difficulty === 'Medium' ? '#f59e0b' : '#f43f5e', flexShrink: 0 }}>{item.problem.difficulty}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <RecommendedCard />
              </div>
            </>
          )}
        </main>
      </div>
      <div id="cur-dot" /><div id="cur-ring" />
    </div>
  )
}