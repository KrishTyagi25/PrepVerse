import React, { useState, useMemo } from 'react'
import { GlassCard }      from '../../components/ui/Atoms'
import { Badge }          from '../../components/ui/Atoms'
import { Button }         from '../../components/ui/Button'
import { Tabs }           from '../../components/ui/Tabs'
import { useCanvasBg }    from '../../hooks/useCanvasBg'
import { useCursor }      from '../../hooks/useCursor'
import { Navbar }         from '../../components/layout/Navbar'
import { userService } from '../../api/services/userService'


const [users,   setUsers]   = useState([])
const [loading, setLoading] = useState(true)

const fetchUsers = async (params = {}) => {
  setLoading(true)
  try {
    const { data } = await userService.searchUsers(params)
    setUsers(data.data.users)
  } catch {
    toast('Failed to search users', 'error')
  } finally {
    setLoading(false)
  }
}

useEffect(() => { fetchUsers() }, [])


const ROLE_TABS = [
  { id:'All',      label:'All',       icon:'👥' },
  { id:'Frontend', label:'Frontend',  icon:'⚛️' },
  { id:'Backend',  label:'Backend',   icon:'⚙️' },
  { id:'Fullstack',label:'Fullstack', icon:'🔷' },
  { id:'ML / AI',  label:'ML / AI',   icon:'🧠' },
]

const SORT_OPTIONS = ['Most mutual','Highest score','Most solved','Longest streak']

export default function PeopleSearchPage() {
  useCanvasBg('people-canvas')
  useCursor()

  const [search,  setSearch]  = useState('')
  const [roleTab, setRoleTab] = useState('All')
  const [sort,    setSort]    = useState('Most mutual')
  const [users,   setUsers]   = useState(ALL_USERS)
  const [profile, setProfile] = useState(null)   // user whose mini-profile card is open


  useEffect(() => {
  const timer = setTimeout(() => {
    fetchUsers({
      q:    search || undefined,
      role: roleTab !== 'All' ? roleTab : undefined,
    })
  }, 300)
  return () => clearTimeout(timer)
}, [search, roleTab])

 const connect = async (id) => {
  try {
    await userService.sendConnectionRequest(id)
    setUsers(u => u.map(x => x._id === id ? { ...x, pending: true } : x))
    setTimeout(() => {
      setUsers(u => u.map(x => x._id === id ? { ...x, pending: false, connected: true } : x))
    }, 1000)
  } catch (err) {
    toast(err.response?.data?.message ?? 'Failed to connect', 'error')
  }
}

  const disconnect = (id) => {
    setUsers(u => u.map(x => x.id === id ? { ...x, connected: false } : x))
  }

  const filtered = useMemo(() => {
    let list = users.filter(u => {
      if (roleTab !== 'All' && u.role !== roleTab) return false
      if (search && !u.name.toLowerCase().includes(search.toLowerCase()) &&
          !u.college.toLowerCase().includes(search.toLowerCase()) &&
          !u.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))) return false
      return true
    })
    if (sort === 'Most mutual')    list = [...list].sort((a,b) => b.mutual  - a.mutual)
    if (sort === 'Highest score')  list = [...list].sort((a,b) => b.score   - a.score)
    if (sort === 'Most solved')    list = [...list].sort((a,b) => b.solved  - a.solved)
    if (sort === 'Longest streak') list = [...list].sort((a,b) => b.streak  - a.streak)
    return list
  }, [users, search, roleTab, sort])

  const connections = users.filter(u => u.connected)
  const pending     = users.filter(u => u.pending)

  return (
    <div style={{ minHeight:'100vh', background:'#080909', color:'#f8fafc', fontFamily:'Geist,sans-serif' }}>
      <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;700&family=Geist:wght@300;400;500;600&display=swap" rel="stylesheet"/>
      <style>{`
        body{cursor:none}
        #cur-dot{width:5px;height:5px;border-radius:50%;background:#00d2ff;box-shadow:0 0 8px #00d2ff;position:fixed;top:0;left:0;pointer-events:none;z-index:9999}
        #cur-ring{width:28px;height:28px;border-radius:50%;border:1.5px solid rgba(0,210,255,.5);position:fixed;top:0;left:0;pointer-events:none;z-index:9998;transition:width .2s,height .2s}
        body.hov #cur-ring{width:44px;height:44px;border-color:rgba(124,58,237,.7);margin:-8px}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
        input::placeholder{color:#1e293b}
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-track{background:transparent} ::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:4px}
      `}</style>

      <canvas id="people-canvas" style={{ position:'fixed',inset:0,zIndex:0,pointerEvents:'none' }}/>

      <div style={{ position:'relative', zIndex:1 }}>
        <Navbar/>
        <main style={{ maxWidth:1200, margin:'0 auto', padding:'100px 24px 60px' }}>

          {/* Page header */}
          <div style={{ marginBottom:28 }}>
            <Badge variant="cyan" pulse>Community</Badge>
            <h1 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:'clamp(1.8rem,3vw,2.4rem)', letterSpacing:'-.03em', lineHeight:1.1, margin:'12px 0 8px' }}>
              Find people
            </h1>
            <p style={{ fontSize:14, color:'#475569', lineHeight:1.7 }}>
              Search by name, college, or skill. Connect with fellow preppers and recruiters.
            </p>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:24, alignItems:'start' }}>

            {/* ── LEFT: search + grid ── */}
            <div>
              {/* Search bar */}
              <div style={{ position:'relative', marginBottom:16 }}>
                <span style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:'#475569', display:'flex', alignItems:'center', pointerEvents:'none' }}>
                  <SearchIcon/>
                </span>
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search by name, college, or skill (e.g. React, IIT, Node.js)…"
                  style={{ width:'100%', padding:'13px 14px 13px 42px', background:'#111214', border:'1px solid rgba(255,255,255,.08)', borderRadius:12, outline:'none', fontFamily:'Geist,sans-serif', fontSize:14, color:'#f8fafc', boxSizing:'border-box', transition:'border-color .2s' }}
                  onFocus={e  => e.target.style.borderColor = 'rgba(0,210,255,.45)'}
                  onBlur={e   => e.target.style.borderColor = 'rgba(255,255,255,.08)'}
                />
              </div>

              {/* Role tabs + sort */}
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20, flexWrap:'wrap', gap:12 }}>
                <Tabs tabs={ROLE_TABS} active={roleTab} onChange={setRoleTab} variant="pill"/>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#475569' }}>Sort</span>
                  <select
                    value={sort}
                    onChange={e => setSort(e.target.value)}
                    style={{ padding:'6px 10px', background:'#111214', border:'1px solid rgba(255,255,255,.08)', borderRadius:8, outline:'none', fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#f8fafc', cursor:'pointer' }}
                  >
                    {SORT_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              </div>

              {/* Results count */}
              <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#475569', marginBottom:14 }}>
                {filtered.length} {filtered.length === 1 ? 'person' : 'people'} found
                {search && <span style={{ color:'#00d2ff' }}> for "{search}"</span>}
              </div>

              {/* User grid */}
              {filtered.length === 0 ? (
                <div style={{ textAlign:'center', padding:'60px 0', color:'#475569', fontFamily:'JetBrains Mono,monospace', fontSize:13 }}>
                  No one matches your search. Try a different name or skill.
                </div>
              ) : (
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:14 }}>
                  {filtered.map(u => (
                    <UserCard
                      key={u.id}
                      user={u}
                      onConnect={() => connect(u.id)}
                      onDisconnect={() => disconnect(u.id)}
                      onViewProfile={() => setProfile(u)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* ── RIGHT: sidebar ── */}
            <div style={{ display:'flex', flexDirection:'column', gap:16, position:'sticky', top:100 }}>

              {/* My connections */}
              <GlassCard hover={false} className="p-5">
                <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:14, color:'#f8fafc', marginBottom:14, display:'flex', alignItems:'center', gap:8 }}>
                  My connections
                  <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#00d2ff', background:'rgba(0,210,255,.1)', border:'1px solid rgba(0,210,255,.2)', borderRadius:999, padding:'1px 8px' }}>{connections.length}</span>
                </div>
                {connections.length === 0 ? (
                  <p style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#1e293b' }}>No connections yet. Start connecting!</p>
                ) : (
                  <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                    {connections.map(u => (
                      <div key={u.id} style={{ display:'flex', alignItems:'center', gap:10 }}>
                        <Avatar user={u} size={32}/>
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:600, fontSize:13, color:'#f8fafc', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{u.name}</div>
                          <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9, color:'#475569' }}>{u.role}</div>
                        </div>
                        <button onClick={() => setProfile(u)} style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#475569', background:'none', border:'none', cursor:'pointer', padding:0 }}>View →</button>
                      </div>
                    ))}
                  </div>
                )}
              </GlassCard>

              {/* Pending */}
              {pending.length > 0 && (
                <GlassCard hover={false} className="p-5">
                  <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:14, color:'#f8fafc', marginBottom:12, display:'flex', alignItems:'center', gap:8 }}>
                    Pending
                    <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#f59e0b', background:'rgba(245,158,11,.1)', border:'1px solid rgba(245,158,11,.2)', borderRadius:999, padding:'1px 8px' }}>{pending.length}</span>
                  </div>
                  <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                    {pending.map(u => (
                      <div key={u.id} style={{ display:'flex', alignItems:'center', gap:8 }}>
                        <Avatar user={u} size={28}/>
                        <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:12, color:'#94a3b8', flex:1 }}>{u.name}</div>
                        <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#f59e0b' }}>Pending…</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              )}

              {/* Stats pill */}
              <GlassCard hover={false} className="p-5">
                <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:14, color:'#f8fafc', marginBottom:12 }}>Community stats</div>
                {[['Total users',ALL_USERS.length],['Frontend',ALL_USERS.filter(u=>u.role==='Frontend').length],['Backend',ALL_USERS.filter(u=>u.role==='Backend').length],['ML / AI',ALL_USERS.filter(u=>u.role==='ML / AI').length]].map(([k,v]) => (
                  <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'6px 0', borderBottom:'1px solid rgba(255,255,255,.04)' }}>
                    <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#475569' }}>{k}</span>
                    <span style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:13, color:'#f8fafc' }}>{v}</span>
                  </div>
                ))}
              </GlassCard>
            </div>
          </div>
        </main>
      </div>

      {/* Mini profile overlay */}
      {profile && <ProfileOverlay user={profile} onClose={() => setProfile(null)} onConnect={() => { connect(profile.id); setProfile(null) }} onDisconnect={() => { disconnect(profile.id); setProfile(null) }}/>}

      <div id="cur-dot"/><div id="cur-ring"/>
    </div>
  )
}

/* ── UserCard ──────────────────────────────────────────────── */
function UserCard({ user: u, onConnect, onDisconnect, onViewProfile }) {
  const scoreColor = u.score >= 90 ? '#10b981' : u.score >= 80 ? '#00d2ff' : '#f59e0b'

  return (
    <GlassCard hover className="p-5" style={{ animation:'fadeUp .3s ease', cursor:'default' }}>
      {/* Top row */}
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:10 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer' }} onClick={onViewProfile}>
          <Avatar user={u} size={44}/>
          <div>
            <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:14, color:'#f8fafc' }}>{u.name}</div>
            <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#475569', marginTop:1 }}>{u.college}</div>
          </div>
        </div>
        <div style={{ textAlign:'right' }}>
          <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:18, color:scoreColor }}>{u.score}</div>
          <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9, color:'#1e293b' }}>score</div>
        </div>
      </div>

      {/* Role badge */}
      <div style={{ marginBottom:8 }}>
        <RoleBadge role={u.role}/>
      </div>

      {/* Bio */}
      <p style={{ fontFamily:'Geist,sans-serif', fontSize:12, color:'#475569', lineHeight:1.6, marginBottom:10, overflow:'hidden', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' }}>{u.bio}</p>

      {/* Stats row */}
      <div style={{ display:'flex', gap:14, marginBottom:12 }}>
        {[['🔥', `${u.streak}d`], ['✅', `${u.solved}`], ['👥', `${u.mutual} mutual`]].map(([ic, val]) => (
          <span key={val} style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#475569' }}>{ic} {val}</span>
        ))}
      </div>

      {/* Skills */}
      <div style={{ display:'flex', gap:5, flexWrap:'wrap', marginBottom:14 }}>
        {u.skills.slice(0,3).map(s => (
          <span key={s} style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#475569', background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.07)', borderRadius:4, padding:'2px 7px' }}>{s}</span>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display:'flex', gap:8 }}>
        <Button variant="ghost" size="sm" style={{ flex:1 }} onClick={onViewProfile}>Profile</Button>
        {u.connected
          ? <Button variant="ghost" size="sm" style={{ flex:1, color:'#10b981', borderColor:'rgba(16,185,129,.3)' }} onClick={onDisconnect}>✓ Connected</Button>
          : u.pending
            ? <Button variant="ghost" size="sm" style={{ flex:1, color:'#f59e0b', borderColor:'rgba(245,158,11,.25)' }} disabled>Pending…</Button>
            : <Button variant="primary" size="sm" style={{ flex:1 }} onClick={onConnect}>+ Connect</Button>
        }
      </div>
    </GlassCard>
  )
}

/* ── ProfileOverlay — mini profile modal ──────────────────── */
function ProfileOverlay({ user: u, onClose, onConnect, onDisconnect }) {
  const scoreColor = u.score >= 90 ? '#10b981' : u.score >= 80 ? '#00d2ff' : '#f59e0b'

  return (
    <div
      onClick={onClose}
      style={{ position:'fixed', inset:0, zIndex:9000, background:'rgba(0,0,0,.65)', backdropFilter:'blur(6px)', display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}
    >
      <div onClick={e => e.stopPropagation()} style={{ width:'100%', maxWidth:440, background:'#111214', border:'1px solid rgba(255,255,255,.09)', borderRadius:20, overflow:'hidden', boxShadow:'0 32px 80px rgba(0,0,0,.8)', animation:'fadeUp .22s ease' }}>

        {/* Cover strip */}
        <div style={{ height:60, background:`linear-gradient(135deg,${ROLE_COLORS[u.role] ?? '#00d2ff'}22,rgba(124,58,237,.15))`, position:'relative' }}>
          <button onClick={onClose} style={{ position:'absolute', top:10, right:12, background:'rgba(0,0,0,.4)', border:'1px solid rgba(255,255,255,.1)', borderRadius:8, color:'#94a3b8', fontSize:14, width:28, height:28, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>✕</button>
        </div>

        <div style={{ padding:'0 22px 22px' }}>
          {/* Avatar — overlaps cover */}
          <div style={{ marginTop:-30, marginBottom:12 }}>
            <Avatar user={u} size={60} style={{ border:'3px solid #111214' }}/>
          </div>

          {/* Name + role */}
          <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:8 }}>
            <div>
              <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:18, color:'#f8fafc', letterSpacing:'-.02em' }}>{u.name}</div>
              <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#475569', marginTop:2 }}>{u.college}</div>
            </div>
            <RoleBadge role={u.role}/>
          </div>

          {/* Bio */}
          <p style={{ fontFamily:'Geist,sans-serif', fontSize:13, color:'#475569', lineHeight:1.7, marginBottom:16 }}>{u.bio}</p>

          {/* Stats grid */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:10, marginBottom:16 }}>
            {[['Score',u.score,scoreColor],['Streak',`${u.streak}d`,'#f59e0b'],['Solved',u.solved,'#10b981'],['Mutual',u.mutual,'#7c3aed']].map(([label,val,color]) => (
              <div key={label} style={{ textAlign:'center', padding:'10px 0', borderRadius:10, background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.06)' }}>
                <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:16, color }}>{val}</div>
                <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9, color:'#1e293b', marginTop:2 }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:18 }}>
            {u.skills.map(s => (
              <span key={s} style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#475569', background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.07)', borderRadius:4, padding:'3px 8px' }}>{s}</span>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display:'flex', gap:10 }}>
            <Button variant="ghost" size="md" style={{ flex:1 }}>View full profile</Button>
            <Button variant="ghost" size="md" style={{ flex:1 }}>Message</Button>
            {u.connected
              ? <Button variant="ghost" size="md" style={{ flex:1, color:'#10b981', borderColor:'rgba(16,185,129,.3)' }} onClick={onDisconnect}>✓ Connected</Button>
              : u.pending
                ? <Button variant="ghost" size="md" style={{ flex:1, color:'#f59e0b' }} disabled>Pending…</Button>
                : <Button variant="primary" size="md" style={{ flex:1 }} onClick={onConnect}>+ Connect</Button>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Shared sub-components ──────────────────────────────────── */
const ROLE_COLORS = { Frontend:'#00d2ff', Backend:'#10b981', Fullstack:'#7c3aed', 'ML / AI':'#f59e0b' }
const ROLE_ICONS  = { Frontend:'⚛️', Backend:'⚙️', Fullstack:'🔷', 'ML / AI':'🧠' }

function Avatar({ user, size = 40, style: extra = {} }) {
  const color = ROLE_COLORS[user.role] ?? '#00d2ff'
  return (
    <div style={{ width:size, height:size, borderRadius:'50%', background:`${color}20`, border:`2px solid ${color}40`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:Math.floor(size*0.32), color, flexShrink:0, ...extra }}>
      {user.avatar}
    </div>
  )
}

function RoleBadge({ role }) {
  const color = ROLE_COLORS[role] ?? '#475569'
  const icon  = ROLE_ICONS[role]  ?? '💻'
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:4, fontFamily:'JetBrains Mono,monospace', fontSize:10, color, background:`${color}15`, border:`1px solid ${color}35`, borderRadius:4, padding:'2px 8px' }}>
      {icon} {role}
    </span>
  )
}

function SearchIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/></svg>
}