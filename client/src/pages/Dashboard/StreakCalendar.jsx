import React from 'react'
import { GlassCard } from '../../components/ui/Atoms'

function generateWeeks() {
  const weeks = []
  const today = new Date()
  for (let w = 12; w >= 0; w--) {
    const days = []
    for (let d = 6; d >= 0; d--) {
      const date = new Date(today)
      date.setDate(today.getDate() - (w * 7 + d))
      const isFuture = date > today
      days.push({ date, active: !isFuture && Math.random() > 0.45, future: isFuture })
    }
    weeks.push(days)
  }
  return weeks
}

const weeks = generateWeeks()

export function StreakCalendar() {
  return (
    <GlassCard className="p-5">
      <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: 14, color: '#f8fafc', marginBottom: 14 }}>Activity</div>
      <div style={{ display: 'flex', gap: 3 }}>
        {weeks.map((week, wi) => (
          <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {week.map((day, di) => (
              <div
                key={di}
                title={day.date.toDateString()}
                style={{
                  width: 10, height: 10, borderRadius: 2,
                  background: day.future
                    ? 'transparent'
                    : day.active
                      ? 'rgba(0,210,255,.7)'
                      : 'rgba(255,255,255,.06)',
                  border: day.future ? '1px solid rgba(255,255,255,.04)' : 'none',
                  transition: 'background .2s',
                  cursor: 'default',
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 12 }}>
        <div style={{ width: 10, height: 10, borderRadius: 2, background: 'rgba(255,255,255,.06)' }}/>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#1e293b' }}>none</span>
        <div style={{ width: 10, height: 10, borderRadius: 2, background: 'rgba(0,210,255,.7)', marginLeft: 8 }}/>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#1e293b' }}>solved</span>
      </div>
    </GlassCard>
  )
}