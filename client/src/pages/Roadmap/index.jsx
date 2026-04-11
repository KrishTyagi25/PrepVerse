import React, { useState, useMemo } from 'react'
import { useEffect }     from 'react'
import { userService } from '../../api/userService'
import { useAuth }     from '../../context/AuthContext'
import { Navbar }          from '../../components/layout/Navbar'
import { useCanvasBg }     from '../../hooks/useCanvasBg'
import { useCursor }       from '../../hooks/useCursor'
import { useToast }        from '../../components/ui/Toast'
import { Badge }           from '../../components/ui/Atoms'
import { RoadmapHeader }   from './RoadmapHeader'
import { WeekCard }        from './WeekCard'
import { RoadmapSidebar }  from './RoadmapSidebar'

export const ROADMAPS = {
  fe: {
    label: 'Frontend Developer',
    weeks: [
      { week:1,  theme:'HTML & CSS Fundamentals',   color:'#00d2ff', topics:[{title:'Semantic HTML5',done:true},{title:'CSS Box Model & Flexbox',done:true},{title:'CSS Grid',done:true},{title:'Responsive Design',done:false}], problems:[{title:'Two Sum',diff:'Easy'},{title:'Valid Parentheses',diff:'Easy'}], resource:'MDN Web Docs' },
      { week:2,  theme:'JavaScript Core',            color:'#00d2ff', topics:[{title:'ES6+ Features',done:true},{title:'Promises & Async/Await',done:true},{title:'Closures & Scope',done:false},{title:'Prototype & Classes',done:false}], problems:[{title:'Reverse String',diff:'Easy'},{title:'Fizz Buzz',diff:'Easy'}], resource:'javascript.info' },
      { week:3,  theme:'JavaScript DSA',             color:'#7c3aed', topics:[{title:'Arrays & Strings',done:false},{title:'HashMaps',done:false},{title:'Two Pointers',done:false},{title:'Sliding Window',done:false}], problems:[{title:'Best Time to Buy Stock',diff:'Easy'},{title:'Longest Substring',diff:'Medium'}], resource:'NeetCode.io' },
      { week:4,  theme:'React Fundamentals',         color:'#00d2ff', topics:[{title:'JSX & Components',done:false},{title:'Props & State',done:false},{title:'useEffect & Hooks',done:false},{title:'Event Handling',done:false}], problems:[{title:'Climbing Stairs',diff:'Easy'},{title:'Min Stack',diff:'Medium'}], resource:'React Docs (react.dev)' },
      { week:5,  theme:'React Advanced',             color:'#00d2ff', topics:[{title:'Context API',done:false},{title:'Custom Hooks',done:false},{title:'Performance (memo, useMemo)',done:false},{title:'React Router',done:false}], problems:[{title:'LRU Cache',diff:'Medium'},{title:'Binary Tree Inorder',diff:'Easy'}], resource:'Pattern.dev' },
      { week:6,  theme:'Stack & Queue Problems',     color:'#7c3aed', topics:[{title:'Stack patterns',done:false},{title:'Monotonic Stack',done:false},{title:'Queue & Deque',done:false},{title:'BFS intro',done:false}], problems:[{title:'Valid Parentheses',diff:'Easy'},{title:'Daily Temperatures',diff:'Medium'}], resource:'LeetCode' },
      { week:7,  theme:'TypeScript + APIs',          color:'#10b981', topics:[{title:'TypeScript basics',done:false},{title:'Types & Interfaces',done:false},{title:'REST API concepts',done:false},{title:'Fetch & Axios',done:false}], problems:[{title:'Merge Intervals',diff:'Medium'},{title:'Search 2D Matrix',diff:'Medium'}], resource:'TypeScript Handbook' },
      { week:8,  theme:'Trees & Graphs',             color:'#7c3aed', topics:[{title:'Binary Trees',done:false},{title:'DFS & BFS',done:false},{title:'Binary Search Tree',done:false},{title:'Graph basics',done:false}], problems:[{title:'Max Depth of Tree',diff:'Easy'},{title:'Number of Islands',diff:'Medium'}], resource:'NeetCode' },
      { week:9,  theme:'State Management & Testing', color:'#10b981', topics:[{title:'Redux / Zustand',done:false},{title:'React Query',done:false},{title:'Jest basics',done:false},{title:'React Testing Library',done:false}], problems:[{title:'Coin Change',diff:'Medium'},{title:'Word Search',diff:'Medium'}], resource:'Redux Toolkit Docs' },
      { week:10, theme:'Dynamic Programming I',      color:'#7c3aed', topics:[{title:'DP patterns intro',done:false},{title:'Memoization',done:false},{title:'1D DP problems',done:false},{title:'2D DP intro',done:false}], problems:[{title:'Climbing Stairs',diff:'Easy'},{title:'House Robber',diff:'Medium'}], resource:'NeetCode DP playlist' },
      { week:11, theme:'Performance & Web APIs',     color:'#10b981', topics:[{title:'Bundle optimisation',done:false},{title:'Lazy loading',done:false},{title:'Web Vitals',done:false},{title:'Web Workers',done:false}], problems:[{title:'Trapping Rain Water',diff:'Hard'},{title:'Merge K Lists',diff:'Hard'}], resource:'web.dev' },
      { week:12, theme:'Mock Interviews & Review',   color:'#f59e0b', topics:[{title:'3 AI mock interviews',done:false},{title:'System design basics',done:false},{title:'Behavioural prep',done:false},{title:'Resume review',done:false}], problems:[{title:'Review all solved',diff:'Mixed'}], resource:'PrepVerse AI Interview' },
    ],
  },
  be: { label:'Backend Developer', weeks:[] },
}
ROADMAPS.fs = { label:'Fullstack Developer', weeks: ROADMAPS.fe.weeks }
ROADMAPS.ml = { label:'ML / AI Engineer', weeks: ROADMAPS.fe.weeks }

export default function RoadmapPage() {
  useCanvasBg('roadmap-canvas')
  useCursor()
  const toast = useToast()

  const { user } = useAuth()

  const [role, setRole] = useState('fe')
  const [targetDate, setTargetDate] = useState(() => {
    const d = new Date(); d.setDate(d.getDate() + 84); return d.toISOString().split('T')[0]
  })
  const [completed, setCompleted] = useState({})
  const [expanded, setExpanded] = useState({ 1:true })

  const roadmap = ROADMAPS[role]

  useEffect(() => {
    if (!user) return
    userService.getRoadmap()
      .then(({ data }) => {
        const saved = data.data.roadmap
        if (!saved) return
        if (saved.role) setRole(saved.role)
        if (saved.completed) setCompleted(saved.completed)
        if (saved.targetDate) setTargetDate(new Date(saved.targetDate).toISOString().split('T')[0])
      })
      .catch(() => {})
  }, [user])

  useEffect(() => {
    if (!user) return
    const timer = setTimeout(() => {
      userService.saveRoadmap({ role, completed, targetDate }).catch(() => {})
    }, 1500)
    return () => clearTimeout(timer)
  }, [role, completed, targetDate])

  const toggleTopic = (week, topicIdx) => {
    const key = `${week}-${topicIdx}`
    setCompleted(c => ({ ...c, [key]: !c[key] }))
  }

  const isTopicDone = (week, topicIdx, defaultDone) => {
    const key = `${week}-${topicIdx}`
    return key in completed ? completed[key] : defaultDone
  }

  const handleComplete = (week, topicIdx) => {
    const key = `${week}-${topicIdx}`
    const nowDone = !(key in completed ? completed[key] : false)
    toggleTopic(week, topicIdx)
    if (nowDone) toast('Topic completed! 🔥', 'success', 1500)
  }

 
  return (
    <div style={{ minHeight:'100vh', background:'#080909', color:'#f8fafc', fontFamily:'Geist,sans-serif' }}>
      <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;700&family=Geist:wght@300;400;500;600&display=swap" rel="stylesheet"/>
      <style>{`
        body{cursor:none}
        #cur-dot{width:5px;height:5px;border-radius:50%;background:#00d2ff;box-shadow:0 0 8px #00d2ff;position:fixed;top:0;left:0;pointer-events:none;z-index:9999}
        #cur-ring{width:28px;height:28px;border-radius:50%;border:1.5px solid rgba(0,210,255,.5);position:fixed;top:0;left:0;pointer-events:none;z-index:9998;transition:width .2s,height .2s}
        body.hov #cur-ring{width:44px;height:44px;border-color:rgba(124,58,237,.7);margin:-8px}
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-track{background:transparent} ::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:4px}
        input[type=date]::-webkit-calendar-picker-indicator{filter:invert(1) opacity(.4);cursor:pointer}
      `}</style>
      <canvas id="roadmap-canvas" style={{ position:'fixed',inset:0,zIndex:0,pointerEvents:'none' }}/>

      <div style={{ position:'relative', zIndex:1 }}>
        <Navbar/>
        <main style={{ maxWidth:1200, margin:'0 auto', padding:'100px 24px 60px' }}>

          <RoadmapHeader
            role={role}         onRoleChange={setRole}
            targetDate={targetDate} onDateChange={setTargetDate}
            donePct={donePct}   weeksLeft={weeksLeft}
            totalWeeks={roadmap.weeks.length}
            roadmapLabel={roadmap.label}
          />

          <div style={{ display:'grid', gridTemplateColumns:'1fr 280px', gap:24, alignItems:'start', marginTop:28 }}>

            {/* Week cards */}
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {roadmap.weeks.map(w => (
                <WeekCard
                  key={w.week} week={w}
                  open={!!expanded[w.week]}
                  onToggle={() => setExpanded(e => ({ ...e, [w.week]: !e[w.week] }))}
                  isTopicDone={(ti) => isTopicDone(w.week, ti, w.topics[ti].done)}
                  onToggleTopic={(ti) => handleComplete(w.week, ti)}
                  weeksLeft={weeksLeft}
                />
              ))}
            </div>

            <div style={{ position:'sticky', top:100 }}>
              <RoadmapSidebar
                roadmap={roadmap}
                donePct={donePct}
                weeksLeft={weeksLeft}
                completed={completed}
                isTopicDone={isTopicDone}
              />
            </div>
          </div>
        </main>
      </div>
      <div id="cur-dot"/><div id="cur-ring"/>
    </div>
  )
}