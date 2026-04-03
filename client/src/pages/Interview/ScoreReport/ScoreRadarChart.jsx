import React from 'react'
import { GlassCard } from '../../../components/ui/Atoms'

// Pure SVG radar — no chart library needed
export function ScoreRadarChart({ report }) {
  const dims   = ['Clarity','Depth','Examples','Confidence','Overall']
  const values = [report.clarity, report.depth, report.examples, report.confidence, report.overall]
  const cx = 110, cy = 110, maxR = 80
  const angleStep = (2 * Math.PI) / dims.length

  const point = (val, i) => {
    const angle = i * angleStep - Math.PI / 2
    const r = (val / 100) * maxR
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)]
  }

  const gridLevels = [25, 50, 75, 100]

  return (
    <GlassCard hover={false} className="p-5">
      <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:14, color:'#f8fafc', marginBottom:12 }}>Radar view</div>
      <svg width="220" height="220" viewBox="0 0 220 220" style={{ display:'block', margin:'0 auto' }}>
        {/* Grid rings */}
        {gridLevels.map(lvl => {
          const pts = dims.map((_, i) => {
            const angle = i * angleStep - Math.PI / 2
            const r = (lvl / 100) * maxR
            return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`
          }).join(' ')
          return <polygon key={lvl} points={pts} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="0.8"/>
        })}

        {/* Axis lines */}
        {dims.map((_, i) => {
          const [x, y] = point(100, i)
          return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(255,255,255,.06)" strokeWidth="0.8"/>
        })}

        {/* Data polygon */}
        <polygon
          points={values.map((v, i) => point(v, i).join(',')).join(' ')}
          fill="rgba(0,210,255,.12)"
          stroke="#00d2ff"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {values.map((v, i) => {
          const [x, y] = point(v, i)
          return <circle key={i} cx={x} cy={y} r="3.5" fill="#00d2ff" stroke="#080909" strokeWidth="1.5"/>
        })}

        {/* Labels */}
        {dims.map((label, i) => {
          const angle = i * angleStep - Math.PI / 2
          const r = maxR + 18
          const x = cx + r * Math.cos(angle)
          const y = cy + r * Math.sin(angle)
          return (
            <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="central"
              style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, fill:'#475569' }}>
              {label}
            </text>
          )
        })}
      </svg>
    </GlassCard>
  )
}