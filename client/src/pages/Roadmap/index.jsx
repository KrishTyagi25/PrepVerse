import React, { useState, useMemo } from 'react'
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
  be: {
    label:'Backend Developer',
    weeks:[
      { week:1,  theme:'Programming Fundamentals',  color:'#10b981', topics:[{title:'Python / Java / Node basics',done:true},{title:'OOP principles',done:true},{title:'Data types & collections',done:false},{title:'Error handling',done:false}], problems:[{title:'Two Sum',diff:'Easy'},{title:'Reverse Linked List',diff:'Easy'}], resource:'Python Docs / Node Docs' },
      { week:2,  theme:'Arrays & Strings',          color:'#7c3aed', topics:[{title:'Array manipulation',done:false},{title:'String algorithms',done:false},{title:'Sorting algorithms',done:false},{title:'Binary search',done:false}], problems:[{title:'Best Time to Buy',diff:'Easy'},{title:'Find Min in Rotated',diff:'Medium'}], resource:'NeetCode.io' },
      { week:3,  theme:'REST API Design',           color:'#10b981', topics:[{title:'HTTP methods & status codes',done:false},{title:'RESTful principles',done:false},{title:'Authentication (JWT, OAuth)',done:false},{title:'Rate limiting',done:false}], problems:[{title:'Valid Parentheses',diff:'Easy'},{title:'Min Stack',diff:'Medium'}], resource:'REST API Tutorial' },
      { week:4,  theme:'Databases',                 color:'#10b981', topics:[{title:'SQL fundamentals',done:false},{title:'Joins & Indexing',done:false},{title:'NoSQL basics',done:false},{title:'Database design',done:false}], problems:[{title:'Climbing Stairs',diff:'Easy'},{title:'Coin Change',diff:'Medium'}], resource:'PostgreSQL Tutorial' },
      { week:5,  theme:'Trees & Linked Lists',      color:'#7c3aed', topics:[{title:'Linked List patterns',done:false},{title:'Binary Trees',done:false},{title:'BST operations',done:false},{title:'Tree traversals',done:false}], problems:[{title:'Merge Two Lists',diff:'Easy'},{title:'Reorder List',diff:'Medium'}], resource:'NeetCode' },
      { week:6,  theme:'Caching & Queues',          color:'#10b981', topics:[{title:'Redis fundamentals',done:false},{title:'Cache patterns',done:false},{title:'Message queues',done:false},{title:'Pub/Sub pattern',done:false}], problems:[{title:'LRU Cache',diff:'Medium'},{title:'Design Hit Counter',diff:'Medium'}], resource:'Redis Docs' },
      { week:7,  theme:'Graphs',                    color:'#7c3aed', topics:[{title:'Graph representations',done:false},{title:'BFS & DFS',done:false},{title:'Shortest path',done:false},{title:'Topological sort',done:false}], problems:[{title:'Number of Islands',diff:'Medium'},{title:'Course Schedule',diff:'Medium'}], resource:'NeetCode' },
      { week:8,  theme:'System Design Basics',      color:'#f59e0b', topics:[{title:'Scalability concepts',done:false},{title:'Load balancing',done:false},{title:'CAP theorem',done:false},{title:'Design a URL shortener',done:false}], problems:[{title:'Merge Intervals',diff:'Medium'},{title:'Meeting Rooms',diff:'Medium'}], resource:'System Design Primer' },
      { week:9,  theme:'Dynamic Programming',       color:'#7c3aed', topics:[{title:'DP patterns',done:false},{title:'Knapsack problems',done:false},{title:'Sequence DP',done:false},{title:'Matrix DP',done:false}], problems:[{title:'House Robber',diff:'Medium'},{title:'Longest Common Sub',diff:'Medium'}], resource:'NeetCode DP' },
      { week:10, theme:'Docker & Deployment',       color:'#10b981', topics:[{title:'Docker basics',done:false},{title:'Docker Compose',done:false},{title:'CI/CD pipelines',done:false},{title:'Cloud basics (AWS/GCP)',done:false}], problems:[{title:'Trapping Rain Water',diff:'Hard'},{title:'Median Data Streams',diff:'Hard'}], resource:'Docker Docs' },
      { week:11, theme:'Security & Monitoring',     color:'#10b981', topics:[{title:'OWASP top 10',done:false},{title:'HTTPS & TLS',done:false},{title:'Logging best practices',done:false},{title:'API versioning',done:false}], problems:[{title:'Word Search II',diff:'Hard'},{title:'Alien Dictionary',diff:'Hard'}], resource:'OWASP' },
      { week:12, theme:'Mock Interviews & Review',  color:'#f59e0b', topics:[{title:'3 AI mock interviews',done:false},{title:'System design mock',done:false},{title:'Behavioural prep',done:false},{title:'Resume review',done:false}], problems:[{title:'Review all solved',diff:'Mixed'}], resource:'PrepVerse AI Interview' },
    ],
  },
}
ROADMAPS.fs = { label:'Fullstack Developer', weeks: ROADMAPS.fe.weeks }
ROADMAPS.ml = { label:'ML / AI Engineer',    weeks: ROADMAPS.be.weeks.map(w => ({ ...w, theme: w.theme.replace('REST API Design','ML Fundamentals').replace('Docker & Deployment','MLOps & Deployment').replace('Caching & Queues','Model Training') })) }

export default function RoadmapPage() {
  useCanvasBg('roadmap-canvas')
  useCursor()
  const toast = useToast()

  const [role,       setRole]       = useState('fe')
  const [targetDate, setTargetDate] = useState(() => {
    const d = new Date(); d.setDate(d.getDate() + 84); return d.toISOString().split('T')[0]
  })
  const [completed, setCompleted]   = useState({})
  const [expanded,  setExpanded]    = useState({ 1:true })

  const roadmap = ROADMAPS[role]

  const toggleTopic = (week, topicIdx) => {
    const key = `${week}-${topicIdx}`
    setCompleted(c => ({ ...c, [key]: !c[key] }))
  }

  const isTopicDone = (week, topicIdx, defaultDone) => {
    const key = `${week}-${topicIdx}`
    return key in completed ? completed[key] : defaultDone
  }

  const allTopics = roadmap.weeks.flatMap(w => w.topics)
  const donePct   = useMemo(() => {
    const done = roadmap.weeks.reduce((acc, w) =>
      acc + w.topics.filter((t,i) => isTopicDone(w.week, i, t.done)).length, 0)
    return Math.round((done / allTopics.length) * 100)
  }, [completed, role])

  const weeksLeft = useMemo(() => {
    const diff = new Date(targetDate) - new Date()
    return Math.max(0, Math.ceil(diff / (7 * 24 * 60 * 60 * 1000)))
  }, [targetDate])

  const handleComplete = (week, topicIdx) => {
    toggleTopic(week, topicIdx)
    toast('Topic marked complete! Keep going 🔥', 'success', 2000)
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