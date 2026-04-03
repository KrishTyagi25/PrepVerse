import React from 'react'
import { GlassCard }         from '../../../components/ui/Atoms'
import { Badge }             from '../../../components/ui/Atoms'
import { Button }            from '../../../components/ui/Button'
import { ScoreRadarChart }   from './ScoreRadarChart'
import { FeedbackTimeline }  from './FeedbackTimeline'

export function ScoreReport({ report, onReset }) {
  if (!report) return null

  const { overall, clarity, depth, examples, confidence, config, messages } = report

  const scoreColor = (s) =>
    s >= 80 ? '#10b981' : s >= 60 ? '#f59e0b' : '#f43f5e'

  const metrics = [
    { label: 'Clarity',     value: clarity },
    { label: 'Depth',       value: depth },
    { label: 'Examples',    value: examples },
    { label: 'Confidence',  value: confidence },
  ]

  return (
    <div style={{ animation: 'fadeUp .35s ease' }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <Badge variant="violet" pulse>Session Complete</Badge>
        <h1 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:'clamp(1.8rem,3vw,2.4rem)', letterSpacing:'-.03em', lineHeight:1.1, margin:'12px 0 8px' }}>
          Your interview report
        </h1>
        <p style={{ fontSize:14, color:'#475569', lineHeight:1.7 }}>
          {config?.topic} · {config?.role?.toUpperCase()} · {config?.duration} min
        </p>
      </div>

      {/* Overall score */}
      <GlassCard hover={false} className="p-6" style={{ marginBottom:20, textAlign:'center' }}>
        <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#475569', letterSpacing:'.08em', textTransform:'uppercase', marginBottom:8 }}>Overall Score</div>
        <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:'4rem', color: scoreColor(overall), lineHeight:1 }}>
          {overall}
          <span style={{ fontSize:'1.5rem', color:'#475569' }}>/100</span>
        </div>
      </GlassCard>

      {/* Metric breakdown */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:20 }}>
        {metrics.map(({ label, value }) => (
          <GlassCard key={label} hover={false} className="p-4">
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
              <span style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:13, color:'#f8fafc' }}>{label}</span>
              <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:13, color: scoreColor(value), fontWeight:700 }}>{value}</span>
            </div>
            <div style={{ height:4, borderRadius:999, background:'rgba(255,255,255,.06)' }}>
              <div style={{ height:'100%', borderRadius:999, background: scoreColor(value), width:`${value}%`, transition:'width .6s ease' }}/>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Radar + Timeline */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:24 }}>
        <ScoreRadarChart report={report}/>
        <FeedbackTimeline messages={messages}/>
      </div>

      {/* Actions */}
      <div style={{ display:'flex', gap:12 }}>
        <Button variant="primary" size="lg" style={{ flex:1 }} onClick={onReset}>
          Start New Session →
        </Button>
      </div>
    </div>
  )
}