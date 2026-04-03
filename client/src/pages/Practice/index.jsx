import React, { useState, useMemo } from 'react'
import { Navbar }       from '../../components/layout/Navbar'
import { useCanvasBg }  from '../../hooks/useCanvasBg'
import { useCursor }    from '../../hooks/useCursor'
import { FilterBar }    from './FilterBar'
import { ProblemTable } from './ProblemTable'
import { Badge }        from '../../components/ui/Atoms'

const ALL_PROBLEMS = [
  { id:1,  title:'Two Sum',                                  diff:'Easy',   tags:['Arrays','HashMap'],         company:'Google',    solved:true  },
  { id:2,  title:'Longest Substring Without Repeating Chars',diff:'Medium', tags:['Sliding Window','Strings'], company:'Amazon',    solved:false },
  { id:3,  title:'Merge K Sorted Lists',                     diff:'Hard',   tags:['Heap','LinkedList'],        company:'Meta',      solved:false },
  { id:4,  title:'Valid Parentheses',                        diff:'Easy',   tags:['Stack','Strings'],          company:'Microsoft', solved:true  },
  { id:5,  title:'Trapping Rain Water',                      diff:'Hard',   tags:['Two Pointers','Arrays'],    company:'Google',    solved:true  },
  { id:6,  title:'Climbing Stairs',                          diff:'Easy',   tags:['DP'],                       company:'Amazon',    solved:false },
  { id:7,  title:'Binary Tree Level Order Traversal',        diff:'Medium', tags:['BFS','Trees'],              company:'Meta',      solved:false },
  { id:8,  title:'Word Search II',                           diff:'Hard',   tags:['Trie','DFS','Backtracking'],company:'Microsoft', solved:false },
  { id:9,  title:'Coin Change',                              diff:'Medium', tags:['DP'],                       company:'Google',    solved:true  },
  { id:10, title:'Reverse Linked List',                      diff:'Easy',   tags:['LinkedList'],               company:'Amazon',    solved:true  },
]

export default function PracticePage() {
  useCanvasBg('practice-canvas')
  useCursor()

  const [search,  setSearch]  = useState('')
  const [diff,    setDiff]    = useState('All')
  const [tag,     setTag]     = useState('All')
  const [company, setCompany] = useState('All')
  const [status,  setStatus]  = useState('All')

  const filtered = useMemo(() => {
    return ALL_PROBLEMS.filter(p => {
      if (diff    !== 'All' && p.diff !== diff) return false
      if (company !== 'All' && p.company !== company) return false
      if (status  === 'Solved'   && !p.solved)  return false
      if (status  === 'Unsolved' &&  p.solved)  return false
      if (tag     !== 'All' && !p.tags.includes(tag)) return false
      if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [search, diff, tag, company, status])

  return (
    <div style={{ minHeight: '100vh', background: '#080909', color: '#f8fafc', fontFamily: 'Geist, sans-serif' }}>
      <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;700&family=Geist:wght@300;400;500;600&display=swap" rel="stylesheet"/>
      <style>{`
        body{cursor:none}
        #cur-dot{width:5px;height:5px;border-radius:50%;background:#00d2ff;box-shadow:0 0 8px #00d2ff;position:fixed;top:0;left:0;pointer-events:none;z-index:9999}
        #cur-ring{width:28px;height:28px;border-radius:50%;border:1.5px solid rgba(0,210,255,.5);position:fixed;top:0;left:0;pointer-events:none;z-index:9998;transition:width .2s,height .2s}
        body.hov #cur-ring{width:44px;height:44px;border-color:rgba(124,58,237,.7);margin:-8px}
      `}</style>

      <canvas id="practice-canvas" style={{ position:'fixed',inset:0,zIndex:0,pointerEvents:'none' }}/>
      <div style={{ position:'relative', zIndex:1 }}>
        <Navbar/>
        <main style={{ maxWidth:1200, margin:'0 auto', padding:'100px 24px 60px' }}>

          <div style={{ marginBottom: 28 }}>
            <h1 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:'clamp(1.8rem,3vw,2.4rem)', letterSpacing:'-.03em', lineHeight:1.1, marginBottom:8 }}>
              Practice Arena
            </h1>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <p style={{ fontSize:14, color:'#475569' }}>500+ problems, company-tagged and difficulty sorted.</p>
              <Badge variant="cyan">{filtered.length} showing</Badge>
            </div>
          </div>

          <FilterBar
            search={search}    onSearch={setSearch}
            diff={diff}        onDiff={setDiff}
            tag={tag}          onTag={setTag}
            company={company}  onCompany={setCompany}
            status={status}    onStatus={setStatus}
          />

          <ProblemTable problems={filtered}/>
        </main>
      </div>
      <div id="cur-dot"/><div id="cur-ring"/>
    </div>
  )
}