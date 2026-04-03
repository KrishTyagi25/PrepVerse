import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'

const ALL_RESULTS = [
  { type:'problem', title:'Two Sum',              sub:'Easy · Arrays · Google',       url:'/practice/1'   },
  { type:'problem', title:'Valid Parentheses',    sub:'Easy · Stack · Amazon',        url:'/practice/2'   },
  { type:'problem', title:'Climbing Stairs',      sub:'Easy · DP · Amazon',           url:'/practice/3'   },
  { type:'problem', title:'Coin Change',          sub:'Medium · DP · Google',         url:'/practice/9'   },
  { type:'problem', title:'Trapping Rain Water',  sub:'Hard · Two Pointers · Google', url:'/practice/5'   },
  { type:'problem', title:'Merge Intervals',      sub:'Medium · Arrays · Meta',       url:'/practice/6'   },
  { type:'page',    title:'Dashboard',            sub:'Your progress overview',       url:'/dashboard'    },
  { type:'page',    title:'Practice Arena',       sub:'500+ DSA problems',            url:'/practice'     },
  { type:'page',    title:'AI Interview',         sub:'Mock interview sessions',      url:'/interview'    },
  { type:'page',    title:'Leaderboard',          sub:'Global rankings',              url:'/leaderboard'  },
  { type:'page',    title:'Daily Challenge',      sub:"Today's featured problem",     url:'/daily'        },
  { type:'page',    title:'Study Roadmap',        sub:'12-week structured plan',      url:'/roadmap'      },
  { type:'page',    title:'Resume Builder',       sub:'ATS-ready resume editor',      url:'/resume'       },
  { type:'user',    title:'Priya Sharma',         sub:'IIT Delhi · Frontend · #1',    url:'/people'       },
  { type:'user',    title:'Rahul Verma',          sub:'NIT Trichy · Backend · #2',    url:'/people'       },
  { type:'user',    title:'Ananya Singh',         sub:'BITS Pilani · Fullstack · #3', url:'/people'       },
]

const TYPE_ICONS  = { problem:'🧩', page:'📄', user:'👤', post:'📝' }
const TYPE_COLORS = { problem:'#00d2ff', page:'#7c3aed', user:'#10b981', post:'#f59e0b' }

export function GlobalSearchBar() {
  const [open,    setOpen]    = useState(false)
  const [query,   setQuery]   = useState('')
  const [focused, setFocused] = useState(0)
  const inputRef  = useRef(null)
  const navigate  = useNavigate()

  const results = query.length < 2 ? [] : ALL_RESULTS.filter(r =>
    r.title.toLowerCase().includes(query.toLowerCase()) ||
    r.sub.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 8)

  // Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault(); setOpen(true)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    if (open) { setTimeout(() => inputRef.current?.focus(), 50); setQuery(''); setFocused(0) }
  }, [open])

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setFocused(f => Math.min(f+1, results.length-1)) }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setFocused(f => Math.max(f-1, 0)) }
    if (e.key === 'Enter' && results[focused]) { navigate(results[focused].url); setOpen(false) }
  }

  const go = (url) => { navigate(url); setOpen(false) }

  return (
    <>
      {/* Trigger button in navbar */}
      <button
        onClick={() => setOpen(true)}
        style={{ display:'flex', alignItems:'center', gap:8, padding:'6px 12px', background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.08)', borderRadius:9, cursor:'pointer', transition:'all .15s', color:'#475569' }}
        onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(0,210,255,.3)'; e.currentTarget.style.color='#f8fafc' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,.08)'; e.currentTarget.style.color='#475569' }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/></svg>
        <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:12 }}>Search</span>
        <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, background:'rgba(255,255,255,.07)', border:'1px solid rgba(255,255,255,.1)', borderRadius:4, padding:'1px 5px' }}>⌘K</span>
      </button>

      {/* Modal */}
      {open && createPortal(
        <div onClick={() => setOpen(false)} style={{ position:'fixed', inset:0, zIndex:99999, background:'rgba(0,0,0,.7)', backdropFilter:'blur(8px)', display:'flex', alignItems:'flex-start', justifyContent:'center', paddingTop:'15vh', padding:'15vh 24px 0' }}>
          <div onClick={e => e.stopPropagation()} style={{ width:'100%', maxWidth:600, background:'#111214', border:'1px solid rgba(255,255,255,.1)', borderRadius:18, overflow:'hidden', boxShadow:'0 32px 80px rgba(0,0,0,.8)', animation:'fadeUp .2s ease' }}>

            {/* Search input */}
            <div style={{ display:'flex', alignItems:'center', gap:12, padding:'16px 18px', borderBottom: results.length > 0 || query.length > 0 ? '1px solid rgba(255,255,255,.07)' : 'none' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/></svg>
              <input
                ref={inputRef}
                value={query}
                onChange={e => { setQuery(e.target.value); setFocused(0) }}
                onKeyDown={handleKeyDown}
                placeholder="Search problems, pages, users…"
                style={{ flex:1, background:'none', border:'none', outline:'none', fontFamily:'Geist,sans-serif', fontSize:16, color:'#f8fafc' }}
              />
              {query && <button onClick={() => setQuery('')} style={{ background:'none', border:'none', color:'#475569', cursor:'pointer', fontSize:16 }}>✕</button>}
              <kbd style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#475569', background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.1)', borderRadius:5, padding:'2px 7px' }}>Esc</kbd>
            </div>

            {/* Results */}
            {results.length > 0 ? (
              <div style={{ maxHeight:380, overflowY:'auto' }}>
                {results.map((r,i) => (
                  <div key={i} onClick={() => go(r.url)}
                    style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 18px', cursor:'pointer', background: i===focused ? 'rgba(0,210,255,.07)' : 'transparent', borderLeft:`2px solid ${i===focused ? '#00d2ff' : 'transparent'}`, transition:'all .1s' }}
                    onMouseEnter={() => setFocused(i)}
                  >
                    <div style={{ width:32, height:32, borderRadius:8, background:`${TYPE_COLORS[r.type]}18`, border:`1px solid ${TYPE_COLORS[r.type]}35`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, flexShrink:0 }}>
                      {TYPE_ICONS[r.type]}
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:600, fontSize:14, color:'#f8fafc', marginBottom:1 }}>{r.title}</div>
                      <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#475569', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{r.sub}</div>
                    </div>
                    <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:TYPE_COLORS[r.type], background:`${TYPE_COLORS[r.type]}15`, border:`1px solid ${TYPE_COLORS[r.type]}35`, borderRadius:4, padding:'2px 7px', flexShrink:0, textTransform:'capitalize' }}>{r.type}</span>
                  </div>
                ))}
              </div>
            ) : query.length >= 2 ? (
              <div style={{ padding:'32px', textAlign:'center', fontFamily:'JetBrains Mono,monospace', fontSize:13, color:'#475569' }}>
                No results for "{query}"
              </div>
            ) : (
              <div style={{ padding:'16px 18px' }}>
                <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#475569', textTransform:'uppercase', letterSpacing:'.07em', marginBottom:10 }}>Quick links</div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                  {[['🎯','/daily','Daily challenge'],['🧩','/practice','Practice'],['🤖','/interview','Interview'],['📄','/resume','Resume'],['🗺','/roadmap','Roadmap'],['👥','/people','People']].map(([ic,url,label]) => (
                    <button key={url} onClick={() => go(url)} style={{ display:'flex', alignItems:'center', gap:6, padding:'6px 12px', borderRadius:8, border:'1px solid rgba(255,255,255,.07)', background:'rgba(255,255,255,.03)', fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:600, fontSize:12, color:'#94a3b8', cursor:'pointer', transition:'all .15s' }}>
                      <span style={{ fontSize:14 }}>{ic}</span>{label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {results.length > 0 && (
              <div style={{ padding:'10px 18px', borderTop:'1px solid rgba(255,255,255,.06)', display:'flex', gap:16 }}>
                {[['↑↓','Navigate'],['↵','Select'],['Esc','Close']].map(([key,label]) => (
                  <span key={label} style={{ display:'flex', alignItems:'center', gap:5, fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#1e293b' }}>
                    <kbd style={{ background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.1)', borderRadius:4, padding:'1px 5px', color:'#475569' }}>{key}</kbd>{label}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  )
}