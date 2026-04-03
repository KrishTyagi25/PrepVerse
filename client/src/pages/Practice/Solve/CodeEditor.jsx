import React, { useRef, useEffect } from 'react'

const LINE_HEIGHT = 22
const FONT = '13px/1.6 "JetBrains Mono", monospace'

const KEYWORDS = ['function','const','let','var','return','if','else','for','while','of','in','new','class','import','export','default','typeof','instanceof']

export function CodeEditor({ value, onChange, language }) {
  const taRef    = useRef(null)
  const preRef   = useRef(null)
  const outerRef = useRef(null)

  const syncScroll = () => {
    if (preRef.current && taRef.current) {
      preRef.current.scrollTop  = taRef.current.scrollTop
      preRef.current.scrollLeft = taRef.current.scrollLeft
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const start = e.target.selectionStart
      const end   = e.target.selectionEnd
      const next  = value.substring(0, start) + '  ' + value.substring(end)
      onChange(next)
      requestAnimationFrame(() => {
        taRef.current.selectionStart = taRef.current.selectionEnd = start + 2
      })
    }
  }

  const highlight = (code) =>
    code
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/(".*?"|'.*?'|`.*?`)/gs, '<span style="color:#10b981">$1</span>')
      .replace(/\/\/.*/g, '<span style="color:#475569;font-style:italic">$&</span>')
      .replace(/\/\*[\s\S]*?\*\//g, '<span style="color:#475569;font-style:italic">$&</span>')
      .replace(/\b(\d+)\b/g, '<span style="color:#f59e0b">$1</span>')
      .replace(new RegExp(`\\b(${KEYWORDS.join('|')})\\b`, 'g'), '<span style="color:#7c3aed;font-weight:600">$1</span>')

  const lines = value.split('\n').length

  const sharedStyle = {
    font: FONT, lineHeight:`${LINE_HEIGHT}px`, padding:'16px', margin:0,
    whiteSpace:'pre', overflowWrap:'normal', wordBreak:'normal', tabSize:2,
    width:'100%', boxSizing:'border-box', minHeight:'100%',
  }

  return (
    <div ref={outerRef} style={{ position:'relative', height:'100%', overflow:'hidden', background:'#0d0e10', display:'flex' }}>
      {/* Line numbers */}
      <div style={{ flexShrink:0, width:44, background:'rgba(255,255,255,.02)', borderRight:'1px solid rgba(255,255,255,.05)', padding:'16px 8px', textAlign:'right', fontFamily:'JetBrains Mono,monospace', fontSize:12, lineHeight:`${LINE_HEIGHT}px`, color:'#1e293b', userSelect:'none', overflowY:'hidden' }}>
        {Array.from({ length: lines }, (_,i) => <div key={i}>{i+1}</div>)}
      </div>

      {/* Editor area */}
      <div style={{ flex:1, position:'relative', overflow:'auto' }} onScroll={syncScroll}>
        <pre ref={preRef} aria-hidden style={{ ...sharedStyle, position:'absolute', inset:0, pointerEvents:'none', color:'#f8fafc', margin:0 }}
          dangerouslySetInnerHTML={{ __html: highlight(value) + '\n' }}
        />
        <textarea
          ref={taRef}
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={handleKey}
          onScroll={syncScroll}
          spellCheck={false}
          style={{ ...sharedStyle, position:'relative', zIndex:1, background:'transparent', color:'transparent', caretColor:'#00d2ff', border:'none', outline:'none', resize:'none', minHeight:'100%' }}
        />
      </div>
    </div>
  )
}