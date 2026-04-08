import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate }     from 'react-router-dom'
import { Navbar }          from '../../components/layout/Navbar'
import { useCanvasBg }     from '../../hooks/useCanvasBg'
import { useCursor }       from '../../hooks/useCursor'
import { useToast }        from '../../components/ui/Toast'
import { FilterBar }       from './FilterBar'
import { ProblemTable }    from './ProblemTable'
import { Badge }           from '../../components/ui/Badge'
import { SkeletonRow }     from '../../components/ui/Skeleton'
import { problemService }  from '../../api/services/problemService'

export default function PracticePage() {
  useCanvasBg('practice-canvas')
  useCursor()
  const toast    = useToast()
  const navigate = useNavigate()

  const [problems, setProblems] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [total,    setTotal]    = useState(0)
  const [page,     setPage]     = useState(1)

  const [search,  setSearch]  = useState('')
  const [diff,    setDiff]    = useState('All')
  const [tag,     setTag]     = useState('All')
  const [company, setCompany] = useState('All')
  const [status,  setStatus]  = useState('All')

  useEffect(() => {
    const fetchProblems = async () => {
      setLoading(true)
      try {
        const params = { page, limit: 20 }
        if (diff    !== 'All') params.difficulty = diff
        if (tag     !== 'All') params.tag         = tag
        if (company !== 'All') params.company     = company
        if (search)            params.search      = search
        if (status  !== 'All') params.status      = status

        const { data } = await problemService.getProblems(params)
        setProblems(data.data.problems)
        setTotal(data.data.pagination.total)
      } catch {
        toast('Failed to load problems', 'error')
      } finally {
        setLoading(false)
      }
    }

    // Debounce search
    const timer = setTimeout(fetchProblems, search ? 400 : 0)
    return () => clearTimeout(timer)
  }, [search, diff, tag, company, status, page])

  return (
    <div style={{ minHeight:'100vh', background:'#080909', color:'#f8fafc', fontFamily:'Geist,sans-serif' }}>
      <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;700&family=Geist:wght@300;400;500;600&display=swap" rel="stylesheet"/>
      <style>{`body{cursor:none}#cur-dot{width:5px;height:5px;border-radius:50%;background:#00d2ff;box-shadow:0 0 8px #00d2ff;position:fixed;top:0;left:0;pointer-events:none;z-index:9999}#cur-ring{width:28px;height:28px;border-radius:50%;border:1.5px solid rgba(0,210,255,.5);position:fixed;top:0;left:0;pointer-events:none;z-index:9998;transition:width .2s,height .2s}body.hov #cur-ring{width:44px;height:44px;border-color:rgba(124,58,237,.7);margin:-8px}`}</style>
      <canvas id="practice-canvas" style={{ position:'fixed',inset:0,zIndex:0,pointerEvents:'none' }}/>

      <div style={{ position:'relative', zIndex:1 }}>
        <Navbar/>
        <main style={{ maxWidth:1200, margin:'0 auto', padding:'100px 24px 60px' }}>

          <div style={{ marginBottom:28 }}>
            <h1 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:'clamp(1.8rem,3vw,2.4rem)', letterSpacing:'-.03em', lineHeight:1.1, marginBottom:8 }}>
              Practice Arena
            </h1>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <p style={{ fontSize:14, color:'#475569' }}>Company-tagged DSA problems.</p>
              <Badge variant="cyan">{loading ? '...' : `${total} problems`}</Badge>
            </div>
          </div>

          <FilterBar
            search={search}    onSearch={v => { setSearch(v); setPage(1) }}
            diff={diff}        onDiff={v => { setDiff(v); setPage(1) }}
            tag={tag}          onTag={v => { setTag(v); setPage(1) }}
            company={company}  onCompany={v => { setCompany(v); setPage(1) }}
            status={status}    onStatus={v => { setStatus(v); setPage(1) }}
          />

          {loading
            ? <div style={{ border:'1px solid rgba(255,255,255,.07)', borderRadius:14, overflow:'hidden' }}>
                {Array.from({ length: 8 }).map((_,i) => <SkeletonRow key={i}/>)}
              </div>
            : <ProblemTable problems={problems} onRowClick={id => navigate(`/practice/${id}`)}/>
          }

          {/* Pagination */}
          {!loading && total > 20 && (
            <div style={{ display:'flex', justifyContent:'center', gap:8, marginTop:20 }}>
              <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1}
                style={{ padding:'7px 16px', borderRadius:8, border:'1px solid rgba(255,255,255,.08)', background:'rgba(255,255,255,.03)', color: page===1 ? '#1e293b' : '#f8fafc', cursor: page===1 ? 'default' : 'pointer', fontFamily:'JetBrains Mono,monospace', fontSize:12 }}>
                ← Prev
              </button>
              <span style={{ padding:'7px 14px', fontFamily:'JetBrains Mono,monospace', fontSize:12, color:'#475569' }}>
                Page {page} of {Math.ceil(total/20)}
              </span>
              <button onClick={() => setPage(p => p+1)} disabled={page >= Math.ceil(total/20)}
                style={{ padding:'7px 16px', borderRadius:8, border:'1px solid rgba(255,255,255,.08)', background:'rgba(255,255,255,.03)', color: page>=Math.ceil(total/20) ? '#1e293b' : '#f8fafc', cursor: page>=Math.ceil(total/20) ? 'default' : 'pointer', fontFamily:'JetBrains Mono,monospace', fontSize:12 }}>
                Next →
              </button>
            </div>
          )}
        </main>
      </div>
      <div id="cur-dot"/><div id="cur-ring"/>
    </div>
  )
}