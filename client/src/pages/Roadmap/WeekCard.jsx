import React from 'react'
import { DiffBadge } from '../../components/ui/Atoms'

export function WeekCard({ week: w, open, onToggle, isTopicDone, onToggleTopic, weeksLeft }) {
  const totalTopics = w.topics.length
  const doneTopics  = w.topics.filter((t,i) => isTopicDone(i)).length
  const pct         = Math.round((doneTopics / totalTopics) * 100)
  const isComplete  = pct === 100
  const isCurrent   = w.week === 1  // simplified — could calculate from dates

  return (
    <div style={{
      borderRadius:14, overflow:'hidden',
      border:`1px solid ${isComplete ? 'rgba(16,185,129,.3)' : isCurrent ? 'rgba(0,210,255,.25)' : 'rgba(255,255,255,.07)'}`,
      background: isComplete ? 'rgba(16,185,129,.04)' : 'rgba(255,255,255,.02)',
      transition:'border-color .3s',
    }}>
      {/* Header */}
      <button onClick={onToggle} style={{ width:'100%', display:'flex', alignItems:'center', gap:14, padding:'14px 16px', background:'none', border:'none', cursor:'pointer', textAlign:'left' }}>

        {/* Week number / check */}
        <div style={{ width:36, height:36, borderRadius:'50%', background: isComplete ? 'rgba(16,185,129,.2)' : `${w.color}18`, border:`1.5px solid ${isComplete ? 'rgba(16,185,129,.4)' : w.color+'40'}`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:13, color: isComplete ? '#10b981' : w.color, flexShrink:0, transition:'all .3s' }}>
          {isComplete ? '✓' : w.week}
        </div>

        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4, flexWrap:'wrap' }}>
            <span style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:14, color:'#f8fafc' }}>Week {w.week}</span>
            <span style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:600, fontSize:13, color:'#475569' }}>—</span>
            <span style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:14, color:'#f8fafc' }}>{w.theme}</span>
            {isCurrent && !isComplete && <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9, color:'#00d2ff', background:'rgba(0,210,255,.1)', border:'1px solid rgba(0,210,255,.25)', borderRadius:4, padding:'1px 6px' }}>Current</span>}
            {isComplete && <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9, color:'#10b981', background:'rgba(16,185,129,.1)', border:'1px solid rgba(16,185,129,.25)', borderRadius:4, padding:'1px 6px' }}>Complete</span>}
          </div>
          {/* Mini progress */}
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ flex:1, height:3, borderRadius:999, background:'rgba(255,255,255,.06)', overflow:'hidden' }}>
              <div style={{ height:'100%', width:`${pct}%`, borderRadius:999, background:`linear-gradient(90deg,${w.color}80,${w.color})`, transition:'width .6s ease' }}/>
            </div>
            <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#475569', flexShrink:0 }}>{doneTopics}/{totalTopics}</span>
          </div>
        </div>

        <span style={{ color:'#475569', fontSize:16, transition:'transform .2s', transform: open ? 'rotate(180deg)' : 'none', flexShrink:0 }}>▾</span>
      </button>

      {/* Body */}
      {open && (
        <div style={{ padding:'0 16px 16px', borderTop:'1px solid rgba(255,255,255,.06)', animation:'fadeUp .2s ease' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, paddingTop:14 }}>

            {/* Topics checklist */}
            <div>
              <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:12, color:'#475569', letterSpacing:'.06em', textTransform:'uppercase', marginBottom:10 }}>Topics</div>
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                {w.topics.map((t,i) => {
                  const done = isTopicDone(i)
                  return (
                    <label key={i} style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer', padding:'8px 10px', borderRadius:8, background: done ? 'rgba(16,185,129,.06)' : 'rgba(255,255,255,.025)', border:`1px solid ${done ? 'rgba(16,185,129,.2)' : 'rgba(255,255,255,.06)'}`, transition:'all .2s' }}>
                      <div onClick={() => onToggleTopic(i)} style={{ width:18, height:18, borderRadius:4, border:`1.5px solid ${done ? '#10b981' : 'rgba(255,255,255,.2)'}`, background: done ? '#10b981' : 'transparent', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, color:'#fff', cursor:'pointer', transition:'all .2s', flexShrink:0 }}>
                        {done ? '✓' : ''}
                      </div>
                      <span style={{ fontFamily:'Geist,sans-serif', fontSize:13, color: done ? '#475569' : '#f8fafc', textDecoration: done ? 'line-through' : 'none', transition:'all .2s' }}>{t.title}</span>
                    </label>
                  )
                })}
              </div>
            </div>

            {/* Problems + resource */}
            <div>
              <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:12, color:'#475569', letterSpacing:'.06em', textTransform:'uppercase', marginBottom:10 }}>Practice problems</div>
              <div style={{ display:'flex', flexDirection:'column', gap:7, marginBottom:16 }}>
                {w.problems.map((p,i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'8px 10px', borderRadius:8, background:'rgba(255,255,255,.025)', border:'1px solid rgba(255,255,255,.06)', cursor:'pointer', transition:'background .15s' }}
                    onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,.05)'}
                    onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,.025)'}
                  >
                    <span style={{ fontFamily:'Geist,sans-serif', fontSize:13, color:'#94a3b8' }}>{p.title}</span>
                    {p.diff !== 'Mixed' && <DiffBadge level={p.diff}/>}
                  </div>
                ))}
              </div>

              <div style={{ padding:'10px 12px', borderRadius:8, background:'rgba(0,210,255,.05)', border:'1px solid rgba(0,210,255,.15)' }}>
                <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#00d2ff', marginBottom:3, textTransform:'uppercase', letterSpacing:'.06em' }}>Resource</div>
                <div style={{ fontFamily:'Geist,sans-serif', fontSize:13, color:'#94a3b8' }}>{w.resource}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}