import React from 'react'
import { GlassCard } from '../../components/ui/Atoms'

function buildGrid() {
  const weeks = []
  const today = new Date()
  for (let w = 51; w >= 0; w--) {
    const days = []
    for (let d = 6; d >= 0; d--) {
      const date = new Date(today)
      date.setDate(today.getDate() - (w * 7 + d))
      const isFuture = date > today
      const count = isFuture ? 0 : Math.random() > 0.55 ? Math.floor(Math.random() * 5) + 1 : 0
      days.push({ date, count })
    }
    weeks.push(days)
  }
  return weeks
}

const GRID = buildGrid()

function cellColor(count) {
  if (!count) return 'rgba(255,255,255,.05)'
  if (count === 1) return 'rgba(0,210,255,.2)'
  if (count === 2) return 'rgba(0,210,255,.4)'
  if (count === 3) return 'rgba(0,210,255,.6)'
  return 'rgba(0,210,255,.85)'
}

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export function SolveHeatmap() {
  return (
    <GlassCard className="p-5" hover={false}>
      <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:14, color:'#f8fafc', marginBottom:16 }}>Solve activity — past year</div>

      {/* Month labels */}
      <div style={{ display:'flex', gap:3, marginBottom:4, paddingLeft:2 }}>
        {GRID.filter((_,i) => i % 4 === 0).map((week, i) => (
          <div key={i} style={{ width:44, fontFamily:'JetBrains Mono,monospace', fontSize:9, color:'#1e293b' }}>
            {MONTHS[week[0].date.getMonth()]}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display:'flex', gap:3, overflowX:'auto' }}>
        {GRID.map((week, wi) => (
          <div key={wi} style={{ display:'flex', flexDirection:'column', gap:3 }}>
            {week.map((day, di) => (
              <div key={di} title={`${day.date.toDateString()}: ${day.count} solved`} style={{ width:11, height:11, borderRadius:2, background:cellColor(day.count), cursor:'default', flexShrink:0 }}/>
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:12 }}>
        <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9, color:'#1e293b' }}>Less</span>
        {[0,1,2,3,4].map(n => <div key={n} style={{ width:11, height:11, borderRadius:2, background:cellColor(n) }}/>)}
        <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9, color:'#1e293b' }}>More</span>
      </div>
    </GlassCard>
  )
}