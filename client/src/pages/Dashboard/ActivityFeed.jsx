import React from 'react'
import { GlassCard }  from '../../components/ui/Atoms'
import { DiffBadge }  from '../../components/ui/Atoms'

const FEED = [
  { type: 'solved',    label: 'Solved',           title: 'Merge Intervals',         diff: 'Medium', time: '2h ago',  icon: '✅' },
  { type: 'badge',     label: 'Earned badge',      title: '7-Day Streak',            diff: null,     time: '1d ago',  icon: '🏅' },
  { type: 'interview', label: 'Completed mock',    title: 'Frontend · Score 84%',    diff: null,     time: '2d ago',  icon: '🤖' },
  { type: 'solved',    label: 'Solved',            title: 'Valid Parentheses',        diff: 'Easy',   time: '2d ago',  icon: '✅' },
  { type: 'solved',    label: 'Solved',            title: 'Trapping Rain Water',      diff: 'Hard',   time: '3d ago',  icon: '✅' },
  { type: 'badge',     label: 'Earned badge',      title: 'First Hard Problem',       diff: null,     time: '3d ago',  icon: '🔥' },
]

export function ActivityFeed() {
  return (
    <GlassCard className="p-5">
      <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: 14, color: '#f8fafc', marginBottom: 14 }}>Recent activity</div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {FEED.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 0', borderBottom: i < FEED.length - 1 ? '1px solid rgba(255,255,255,.05)' : 'none' }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 600, fontSize: 13, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ color: '#475569', fontWeight: 400 }}>{item.label}</span>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</span>
                {item.diff && <DiffBadge level={item.diff}/>}
              </div>
            </div>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#1e293b', flexShrink: 0 }}>{item.time}</span>
          </div>
        ))}
      </div>
    </GlassCard>
  )
}