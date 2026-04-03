import React, { useState } from 'react'
import { Navbar }         from '../../components/layout/Navbar'
import { useCanvasBg }    from '../../hooks/useCanvasBg'
import { useCursor }      from '../../hooks/useCursor'
import { Tabs }           from '../../components/ui/Tabs'
import { TopThreePodium } from './TopThreePodium'
import { RankRow }        from './RankRow'

const TABS = [
  { id:'global',  label:'Global',  icon:'🌍' },
  { id:'friends', label:'Friends', icon:'👥' },
  { id:'domain',  label:'Domain',  icon:'🎯' },
]

const MOCK_USERS = [
  { rank:1,  name:'Priya Sharma',    college:'IIT Delhi',    score:9840, streak:62, solved:214, avatar:'PS' },
  { rank:2,  name:'Rahul Verma',     college:'NIT Trichy',   score:9210, streak:45, solved:198, avatar:'RV' },
  { rank:3,  name:'Ananya Singh',    college:'BITS Pilani',  score:8970, streak:38, solved:187, avatar:'AS' },
  { rank:4,  name:'Karan Mehta',     college:'IIT Bombay',   score:8540, streak:30, solved:172, avatar:'KM' },
  { rank:5,  name:'Sneha Patel',     college:'VIT Vellore',  score:8120, streak:27, solved:165, avatar:'SP' },
  { rank:6,  name:'Aryan Sharma',    college:'DTU',          score:7890, streak:14, solved:152, avatar:'AS' },
  { rank:7,  name:'Divya Nair',      college:'IIIT Hyderabad',score:7460,streak:22, solved:141, avatar:'DN' },
  { rank:8,  name:'Rohan Gupta',     college:'IIT Kanpur',   score:7120, streak:18, solved:135, avatar:'RG' },
]

export default function LeaderboardPage() {
  useCanvasBg('lb-canvas')
  useCursor()
  const [tab, setTab] = useState('global')

  return (
    <div style={{ minHeight:'100vh', background:'#080909', color:'#f8fafc', fontFamily:'Geist,sans-serif' }}>
      <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;700&family=Geist:wght@300;400;500;600&display=swap" rel="stylesheet"/>
      <style>{`
        body{cursor:none}
        #cur-dot{width:5px;height:5px;border-radius:50%;background:#00d2ff;box-shadow:0 0 8px #00d2ff;position:fixed;top:0;left:0;pointer-events:none;z-index:9999}
        #cur-ring{width:28px;height:28px;border-radius:50%;border:1.5px solid rgba(0,210,255,.5);position:fixed;top:0;left:0;pointer-events:none;z-index:9998;transition:width .2s,height .2s}
        body.hov #cur-ring{width:44px;height:44px;border-color:rgba(124,58,237,.7);margin:-8px}
      `}</style>

      <canvas id="lb-canvas" style={{ position:'fixed',inset:0,zIndex:0,pointerEvents:'none' }}/>
      <div style={{ position:'relative', zIndex:1 }}>
        <Navbar/>
        <main style={{ maxWidth:860, margin:'0 auto', padding:'100px 24px 60px' }}>

          <h1 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:'clamp(1.8rem,3vw,2.4rem)', letterSpacing:'-.03em', marginBottom:6 }}>Leaderboard</h1>
          <p style={{ fontSize:14, color:'#475569', marginBottom:32 }}>Top PrepVerse solvers this week.</p>

          <TopThreePodium users={MOCK_USERS.slice(0,3)}/>

          <div style={{ marginTop:28, marginBottom:20 }}>
            <Tabs tabs={TABS} active={tab} onChange={setTab} variant="underline"/>
          </div>

          <div style={{ border:'1px solid rgba(255,255,255,.07)', borderRadius:14, overflow:'hidden' }}>
            {/* Table header */}
            <div style={{ display:'grid', gridTemplateColumns:'56px 1fr 80px 80px 70px', padding:'10px 16px', borderBottom:'1px solid rgba(255,255,255,.07)', background:'rgba(255,255,255,.02)' }}>
              {['Rank','User','Score','Streak','Solved'].map(h => (
                <span key={h} style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#475569', textTransform:'uppercase', letterSpacing:'.05em' }}>{h}</span>
              ))}
            </div>
            {MOCK_USERS.map(u => <RankRow key={u.rank} user={u}/>)}
          </div>

        </main>
      </div>
      <div id="cur-dot"/><div id="cur-ring"/>
    </div>
  )
}