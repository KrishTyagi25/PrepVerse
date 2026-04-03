import React, { useState } from 'react'
import { GlassCard }     from '../../components/ui/Atoms'
import { Button }        from '../../components/ui/Button'
import { Field }         from '../../components/ui/Field'

const SUGGESTIONS = [
  { name:'Divya Nair',    college:'IIIT Hyderabad', role:'Backend',  avatar:'DN', mutual:3  },
  { name:'Rohan Gupta',   college:'IIT Kanpur',     role:'ML / AI',  avatar:'RG', mutual:5  },
  { name:'Tanvi Joshi',   college:'NIT Warangal',   role:'Frontend', avatar:'TJ', mutual:2  },
  { name:'Aditya Kumar',  college:'BITS Goa',       role:'Fullstack',avatar:'AK', mutual:7  },
]

export function FeedSidebar() {
  const [search, setSearch]       = useState('')
  const [connected, setConnected] = useState({})
  const [pending, setPending]     = useState({})

  const connect = (name) => {
    setPending(p => ({ ...p, [name]: true }))
    setTimeout(() => {
      setPending(p => { const n = {...p}; delete n[name]; return n })
      setConnected(c => ({ ...c, [name]: true }))
    }, 1500)
  }

  const filtered = SUGGESTIONS.filter(s =>
    !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.college.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16, position:'sticky', top:100 }}>

      {/* Search people */}
      <GlassCard hover={false} className="p-5">
        <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:14, color:'#f8fafc', marginBottom:12 }}>Find people</div>
        <Field
          label=""
          placeholder="Search by name or college…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          icon={<SearchIcon/>}
        />
      </GlassCard>

      {/* Suggestions */}
      <GlassCard hover={false} className="p-5">
        <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:14, color:'#f8fafc', marginBottom:14 }}>People you may know</div>
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {filtered.map(s => (
            <div key={s.name} style={{ display:'flex', alignItems:'center', gap:10 }}>
              <div style={{ width:36, height:36, borderRadius:'50%', background:'rgba(124,58,237,.15)', border:'1.5px solid rgba(124,58,237,.3)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:12, color:'#a78bfa', flexShrink:0, cursor:'pointer' }}>{s.avatar}</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:600, fontSize:13, color:'#f8fafc', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{s.name}</div>
                <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9, color:'#1e293b' }}>{s.mutual} mutual · {s.role}</div>
              </div>
              <button onClick={() => connect(s.name)} disabled={connected[s.name]} style={{
                padding:'4px 10px', borderRadius:6, border:`1px solid ${connected[s.name] ? 'rgba(16,185,129,.3)' : 'rgba(0,210,255,.3)'}`,
                background: connected[s.name] ? 'rgba(16,185,129,.1)' : 'rgba(0,210,255,.08)',
                fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:600, fontSize:11,
                color: connected[s.name] ? '#10b981' : '#00d2ff',
                cursor: connected[s.name] ? 'default' : 'pointer', transition:'all .15s', flexShrink:0,
              }}>
                {connected[s.name] ? '✓ Connected' : pending[s.name] ? '…' : '+ Connect'}
              </button>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* My stats mini */}
      <GlassCard hover={false} className="p-5">
        <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:14, color:'#f8fafc', marginBottom:12 }}>Your profile views</div>
        {[['This week','42 views'],['Connections','18'],['Post impressions','630']].map(([k,v]) => (
          <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'7px 0', borderBottom:'1px solid rgba(255,255,255,.04)' }}>
            <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#475569' }}>{k}</span>
            <span style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:13, color:'#00d2ff' }}>{v}</span>
          </div>
        ))}
      </GlassCard>
    </div>
  )
}

function SearchIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/></svg>
}