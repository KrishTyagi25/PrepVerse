import React, { useState, useMemo } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Navbar }       from '../../components/layout/Navbar'
import { useCanvasBg }  from '../../hooks/useCanvasBg'
import { useCursor }    from '../../hooks/useCursor'
import { GlassCard }    from '../../components/ui/Atoms'
import { Badge }        from '../../components/ui/Atoms'
import { DiffBadge }    from '../../components/ui/Atoms'
import { Button }       from '../../components/ui/Button'
import { Tabs }         from '../../components/ui/Tabs'

const PROBLEMS = [
  { id:1, title:'Two Sum',           diff:'Easy',   tag:'Arrays',         company:'Google'   },
  { id:2, title:'Valid Parentheses', diff:'Easy',   tag:'Stack',          company:'Amazon'   },
  { id:3, title:'Climbing Stairs',   diff:'Easy',   tag:'DP',             company:'Amazon'   },
  { id:9, title:'Coin Change',       diff:'Medium', tag:'DP',             company:'Google'   },
  { id:5, title:'Trapping Rain Water',diff:'Hard',  tag:'Two Pointers',   company:'Google'   },
  { id:7, title:'Binary Tree BFS',   diff:'Medium', tag:'Trees',          company:'Meta'     },
  { id:8, title:'Word Search II',    diff:'Hard',   tag:'Trie + DFS',     company:'Microsoft'},
]

const USERS = [
  { name:'Priya Sharma',  college:'IIT Delhi',      role:'Frontend',  score:94, avatar:'PS' },
  { name:'Rahul Verma',   college:'NIT Trichy',     role:'Backend',   score:89, avatar:'RV' },
  { name:'Ananya Singh',  college:'BITS Pilani',    role:'Fullstack', score:87, avatar:'AS' },
  { name:'Karan Mehta',   college:'IIT Bombay',     role:'ML / AI',   score:91, avatar:'KM' },
]

const PAGES = [
  { title:'Practice Arena',  desc:'500+ company-tagged DSA problems', url:'/practice',   icon:'🧩' },
  { title:'AI Interview',    desc:'Mock interview sessions, scored',   url:'/interview',  icon:'🤖' },
  { title:'Study Roadmap',   desc:'12-week structured prep plan',      url:'/roadmap',    icon:'🗺️' },
  { title:'Resume Builder',  desc:'ATS-ready resume with PDF export',  url:'/resume',     icon:'📄' },
  { title:'Daily Challenge', desc:"One featured problem per day",      url:'/daily',      icon:'🎯' },
  { title:'Leaderboard',     desc:'Global & friends rankings',         url:'/leaderboard',icon:'🏆' },
]

const TABS = [
  { id:'all',      label:'All'       },
  { id:'problems', label:'Problems'  },
  { id:'users',    label:'People'    },
  { id:'pages',    label:'Pages'     },
]

export default function SearchPage() {
  useCanvasBg('search-canvas')
  useCursor()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [query, setQuery] = useState(searchParams.get('q') ?? '')
  const [tab,   setTab]   = useState('all')

  const filteredProblems = useMemo(() => PROBLEMS.filter(p =>
    !query || p.title.toLowerCase().includes(query.toLowerCase()) || p.tag.toLowerCase().includes(query.toLowerCase()) || p.company.toLowerCase().includes(query.toLowerCase())
  ), [query])

  const filteredUsers = useMemo(() => USERS.filter(u =>
    !query || u.name.toLowerCase().includes(query.toLowerCase()) || u.college.toLowerCase().includes(query.toLowerCase()) || u.role.toLowerCase().includes(query.toLowerCase())
  ), [query])

  const filteredPages = useMemo(() => PAGES.filter(p =>
    !query || p.title.toLowerCase().includes(query.toLowerCase()) || p.desc.toLowerCase().includes(query.toLowerCase())
  ), [query])

  const total = filteredProblems.length + filteredUsers.length + filteredPages.length

  return (
    <div style={{ minHeight:'100vh', background:'#080909', color:'#f8fafc', fontFamily:'Geist,sans-serif' }}>
      <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;700&family=Geist:wght@300;400;500;600&display=swap" rel="stylesheet"/>
      <style>{`body{cursor:none}#cur-dot{width:5px;height:5px;border-radius:50%;background:#00d2ff;box-shadow:0 0 8px #00d2ff;position:fixed;top:0;left:0;pointer-events:none;z-index:9999}#cur-ring{width:28px;height:28px;border-radius:50%;border:1.5px solid rgba(0,210,255,.5);position:fixed;top:0;left:0;pointer-events:none;z-index:9998;transition:width .2s,height .2s}body.hov #cur-ring{width:44px;height:44px;border-color:rgba(124,58,237,.7);margin:-8px}`}</style>
      <canvas id="search-canvas" style={{ position:'fixed',inset:0,zIndex:0,pointerEvents:'none' }}/>

      <div style={{ position:'relative', zIndex:1 }}>
        <Navbar/>
        <main style={{ maxWidth:900, margin:'0 auto', padding:'100px 24px 60px' }}>

          {/* Big search bar */}
          <div style={{ marginBottom:28 }}>
            <div style={{ position:'relative', marginBottom:16 }}>
              <span style={{ position:'absolute', left:18, top:'50%', transform:'translateY(-50%)', color:'#475569', fontSize:18, display:'flex', alignItems:'center', pointerEvents:'none' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/></svg>
              </span>
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search problems, people, pages…"
                autoFocus
                style={{ width:'100%', padding:'16px 18px 16px 50px', background:'#111214', border:'1px solid rgba(0,210,255,.35)', borderRadius:14, outline:'none', fontFamily:'Geist,sans-serif', fontSize:16, color:'#f8fafc', boxSizing:'border-box', boxShadow:'0 0 0 3px rgba(0,210,255,.08)' }}
              />
              {query && <button onClick={() => setQuery('')} style={{ position:'absolute', right:16, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', color:'#475569', cursor:'pointer', fontSize:18 }}>✕</button>}
            </div>

            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <Tabs tabs={TABS} active={tab} onChange={setTab} variant="underline"/>
              {query && <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#475569' }}>{total} result{total!==1?'s':''} for "{query}"</span>}
            </div>
          </div>

          {/* Results */}
          <div style={{ display:'flex', flexDirection:'column', gap:20 }}>

            {/* Problems */}
            {(tab==='all'||tab==='problems') && filteredProblems.length > 0 && (
              <div>
                {tab==='all' && <SectionLabel>Problems ({filteredProblems.length})</SectionLabel>}
                <GlassCard hover={false} className="p-0" style={{ overflow:'hidden' }}>
                  {filteredProblems.map((p,i) => (
                    <div key={p.id} onClick={() => navigate(`/practice/${p.id}`)} style={{ display:'flex', alignItems:'center', gap:14, padding:'13px 18px', cursor:'pointer', borderBottom: i<filteredProblems.length-1 ? '1px solid rgba(255,255,255,.05)' : 'none', transition:'background .15s' }}
                      onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,.03)'}
                      onMouseLeave={e => e.currentTarget.style.background='transparent'}
                    >
                      <span style={{ fontSize:16, flexShrink:0 }}>🧩</span>
                      <div style={{ flex:1 }}>
                        <span style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:600, fontSize:14, color:'#f8fafc' }}>{p.title}</span>
                      </div>
                      <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                        <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#475569' }}>{p.tag}</span>
                        <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#1e293b' }}>{p.company}</span>
                        <DiffBadge level={p.diff}/>
                      </div>
                    </div>
                  ))}
                </GlassCard>
              </div>
            )}

            {/* Users */}
            {(tab==='all'||tab==='users') && filteredUsers.length > 0 && (
              <div>
                {tab==='all' && <SectionLabel>People ({filteredUsers.length})</SectionLabel>}
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                  {filteredUsers.map((u,i) => (
                    <GlassCard key={i} hover className="p-4" style={{ cursor:'pointer' }} onClick={() => navigate('/people')}>
                      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                        <div style={{ width:40, height:40, borderRadius:'50%', background:'rgba(0,210,255,.15)', border:'1.5px solid rgba(0,210,255,.3)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:14, color:'#00d2ff', flexShrink:0 }}>{u.avatar}</div>
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:14, color:'#f8fafc' }}>{u.name}</div>
                          <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#475569' }}>{u.college} · {u.role}</div>
                        </div>
                        <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:16, color:'#00d2ff' }}>{u.score}</div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
            )}

            {/* Pages */}
            {(tab==='all'||tab==='pages') && filteredPages.length > 0 && (
              <div>
                {tab==='all' && <SectionLabel>Pages ({filteredPages.length})</SectionLabel>}
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                  {filteredPages.map((p,i) => (
                    <GlassCard key={i} hover className="p-4" style={{ cursor:'pointer' }} onClick={() => navigate(p.url)}>
                      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                        <span style={{ fontSize:24 }}>{p.icon}</span>
                        <div>
                          <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:14, color:'#f8fafc', marginBottom:2 }}>{p.title}</div>
                          <div style={{ fontFamily:'Geist,sans-serif', fontSize:12, color:'#475569' }}>{p.desc}</div>
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
            )}

            {/* Empty state */}
            {query && total === 0 && (
              <div style={{ textAlign:'center', padding:'60px 0' }}>
                <div style={{ fontSize:48, marginBottom:16 }}>🔍</div>
                <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:18, color:'#f8fafc', marginBottom:8 }}>No results found</div>
                <p style={{ fontFamily:'Geist,sans-serif', fontSize:14, color:'#475569', marginBottom:24 }}>Try different keywords or browse these sections:</p>
                <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
                  {[['Practice','/practice'],['People','/people'],['Roadmap','/roadmap']].map(([label,url]) => (
                    <Button key={label} variant="ghost" size="sm" onClick={() => navigate(url)}>{label}</Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      <div id="cur-dot"/><div id="cur-ring"/>
    </div>
  )
}

function SectionLabel({ children }) {
  return <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:13, color:'#475569', letterSpacing:'.04em', textTransform:'uppercase', marginBottom:10 }}>{children}</div>
}