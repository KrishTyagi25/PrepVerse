import React from 'react'
import { Field } from '../../components/ui/Field'
import { Badge } from '../../components/ui/Atoms'

const ROLES = ['All','Frontend','Backend','Fullstack','ML / AI']

export function CandidateSearch({ filters, onChange, count }) {
  const set = (key, val) => onChange(f => ({ ...f, [key]: val }))

  return (
    <div style={{ background:'rgba(255,255,255,.02)', border:'1px solid rgba(255,255,255,.07)', borderRadius:14, padding:'16px 18px', display:'flex', flexDirection:'column', gap:14 }}>
      <div style={{ display:'flex', gap:12, alignItems:'center', flexWrap:'wrap' }}>
        <div style={{ flex:1, minWidth:200 }}>
          <Field
            label="Search candidates"
            placeholder="Name or college…"
            value={filters.search}
            onChange={e => set('search', e.target.value)}
            icon={<SearchIcon/>}
          />
        </div>
        <Badge variant="ghost">{count} candidates</Badge>
      </div>

      <div style={{ display:'flex', gap:16, flexWrap:'wrap', alignItems:'center' }}>
        {/* Role filter */}
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#475569', textTransform:'uppercase', letterSpacing:'.06em' }}>Role</span>
          <div style={{ display:'flex', gap:4 }}>
            {ROLES.map(r => (
              <button key={r} onClick={() => set('role', r)} style={{
                padding:'4px 10px', borderRadius:999, border:`1px solid ${filters.role===r ? 'rgba(0,210,255,.4)' : 'rgba(255,255,255,.07)'}`,
                background: filters.role===r ? 'rgba(0,210,255,.1)' : 'rgba(255,255,255,.025)',
                fontFamily:'JetBrains Mono,monospace', fontSize:11, cursor:'pointer', transition:'all .15s',
                color: filters.role===r ? '#00d2ff' : '#475569',
              }}>{r}</button>
            ))}
          </div>
        </div>

        {/* Min score */}
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#475569', textTransform:'uppercase', letterSpacing:'.06em' }}>Min score</span>
          <input type="range" min={0} max={90} step={10} value={filters.minScore}
            onChange={e => set('minScore', Number(e.target.value))}
            style={{ accentColor:'#00d2ff', width:100 }}
          />
          <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#00d2ff', minWidth:28 }}>{filters.minScore}+</span>
        </div>

        {/* Available only */}
        <label style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer' }}>
          <input type="checkbox" checked={filters.availableOnly} onChange={e => set('availableOnly', e.target.checked)} style={{ accentColor:'#00d2ff', width:14, height:14 }}/>
          <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#475569' }}>Available now</span>
        </label>
      </div>
    </div>
  )
}

function SearchIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/></svg>
}