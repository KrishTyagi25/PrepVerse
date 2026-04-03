import React, { useState } from 'react'
import { Navbar }           from '../../components/layout/Navbar'
import { useCanvasBg }      from '../../hooks/useCanvasBg'
import { useCursor }        from '../../hooks/useCursor'
import { CandidateSearch }  from './CandidateSearch'
import { CandidateCard }    from './CandidateCard'
import { BookingModal }     from './BookingModal'
import { Badge }            from '../../components/ui/Atoms'

const CANDIDATES = [
  { id:1,  name:'Priya Sharma',   college:'IIT Delhi',     role:'Frontend',  score:94, streak:62, solved:214, skills:['React','TypeScript','CSS'],  available:true  },
  { id:2,  name:'Rahul Verma',    college:'NIT Trichy',    role:'Backend',   score:89, streak:45, solved:198, skills:['Node.js','PostgreSQL','Redis'],available:true  },
  { id:3,  name:'Ananya Singh',   college:'BITS Pilani',   role:'Fullstack', score:87, streak:38, solved:187, skills:['MERN','Docker','AWS'],        available:false },
  { id:4,  name:'Karan Mehta',    college:'IIT Bombay',    role:'ML / AI',   score:91, streak:30, solved:172, skills:['PyTorch','NLP','Python'],     available:true  },
  { id:5,  name:'Sneha Patel',    college:'VIT Vellore',   role:'Frontend',  score:82, streak:27, solved:165, skills:['Vue','React','GraphQL'],      available:true  },
  { id:6,  name:'Aryan Sharma',   college:'DTU',           role:'Frontend',  score:84, streak:14, solved:152, skills:['React','JavaScript','CSS'],   available:false },
  { id:7,  name:'Divya Nair',     college:'IIIT Hyderabad',role:'Backend',   score:78, streak:22, solved:141, skills:['Java','Spring','MySQL'],      available:true  },
  { id:8,  name:'Rohan Gupta',    college:'IIT Kanpur',    role:'ML / AI',   score:86, streak:18, solved:135, skills:['TensorFlow','CV','Python'],   available:true  },
]

export default function RecruiterPage() {
  useCanvasBg('rec-canvas')
  useCursor()

  const [filters,   setFilters]   = useState({ search:'', role:'All', minScore:0, availableOnly:false })
  const [booking,   setBooking]   = useState(null)  // candidate being booked

  const filtered = CANDIDATES.filter(c => {
    if (filters.availableOnly && !c.available) return false
    if (filters.role !== 'All' && c.role !== filters.role) return false
    if (c.score < filters.minScore) return false
    if (filters.search && !c.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !c.college.toLowerCase().includes(filters.search.toLowerCase())) return false
    return true
  })

  return (
    <div style={{ minHeight:'100vh', background:'#080909', color:'#f8fafc', fontFamily:'Geist,sans-serif' }}>
      <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;700&family=Geist:wght@300;400;500;600&display=swap" rel="stylesheet"/>
      <style>{`
        body{cursor:none}
        #cur-dot{width:5px;height:5px;border-radius:50%;background:#00d2ff;box-shadow:0 0 8px #00d2ff;position:fixed;top:0;left:0;pointer-events:none;z-index:9999}
        #cur-ring{width:28px;height:28px;border-radius:50%;border:1.5px solid rgba(0,210,255,.5);position:fixed;top:0;left:0;pointer-events:none;z-index:9998;transition:width .2s,height .2s}
        body.hov #cur-ring{width:44px;height:44px;border-color:rgba(124,58,237,.7);margin:-8px}
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
      `}</style>

      <canvas id="rec-canvas" style={{ position:'fixed',inset:0,zIndex:0,pointerEvents:'none' }}/>
      <div style={{ position:'relative', zIndex:1 }}>
        <Navbar/>
        <main style={{ maxWidth:1200, margin:'0 auto', padding:'100px 24px 60px' }}>

          <div style={{ marginBottom:28 }}>
            <Badge variant="violet" pulse>Recruiter Portal</Badge>
            <h1 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:'clamp(1.8rem,3vw,2.4rem)', letterSpacing:'-.03em', lineHeight:1.1, margin:'12px 0 8px' }}>
              Discover verified talent
            </h1>
            <p style={{ fontSize:14, color:'#475569' }}>
              Every candidate here has a verified score. Filter by role, skill, and availability.
            </p>
          </div>

          <CandidateSearch filters={filters} onChange={setFilters} count={filtered.length}/>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))', gap:16, marginTop:24 }}>
            {filtered.length
              ? filtered.map(c => <CandidateCard key={c.id} candidate={c} onBook={() => setBooking(c)}/>)
              : <div style={{ gridColumn:'1/-1', textAlign:'center', padding:'60px 0', fontFamily:'JetBrains Mono,monospace', fontSize:13, color:'#475569' }}>No candidates match your filters.</div>
            }
          </div>
        </main>
      </div>

      <BookingModal candidate={booking} onClose={() => setBooking(null)}/>
      <div id="cur-dot"/><div id="cur-ring"/>
    </div>
  )
}