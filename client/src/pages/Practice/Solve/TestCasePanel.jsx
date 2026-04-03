import React, { useState } from 'react'
import { Tabs } from '../../../components/ui/Tabs'

export function TestCasePanel({ testCases, results, running }) {
  const [activeCase, setActiveCase] = useState(0)
  const caseTabs = testCases.map((_, i) => ({ id: String(i), label:`Case ${i+1}` }))

  return (
    <div style={{ background:'#0d0e10', minHeight:180 }}>
      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 16px', borderBottom:'1px solid rgba(255,255,255,.06)' }}>
        <Tabs tabs={caseTabs} active={String(activeCase)} onChange={v => setActiveCase(Number(v))} variant="pill"/>
        {results && (
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            {results.type === 'submit' && results.allPassed && (
              <>
                <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#475569' }}>Runtime: <span style={{ color:'#10b981' }}>{results.runtime}</span></span>
                <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#475569' }}>Memory: <span style={{ color:'#10b981' }}>{results.memory}</span></span>
                <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#475569' }}>Beats: <span style={{ color:'#00d2ff' }}>{results.beats}</span></span>
              </>
            )}
            <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color: results.allPassed ? '#10b981' : '#f43f5e', background: results.allPassed ? 'rgba(16,185,129,.1)' : 'rgba(244,63,94,.1)', border:`1px solid ${results.allPassed ? 'rgba(16,185,129,.3)' : 'rgba(244,63,94,.3)'}`, borderRadius:4, padding:'2px 8px' }}>
              {results.allPassed ? '✓ Accepted' : '✗ Wrong Answer'}
            </span>
          </div>
        )}
      </div>

      {/* Case detail */}
      <div style={{ padding:'14px 16px', fontFamily:'JetBrains Mono,monospace', fontSize:12 }}>
        {running ? (
          <div style={{ color:'#475569', display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ width:14, height:14, border:'2px solid rgba(255,255,255,.2)', borderTopColor:'#00d2ff', borderRadius:'50%', display:'inline-block', animation:'spin .7s linear infinite' }}/>
            Running test cases…
          </div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            <div>
              <div style={{ color:'#475569', marginBottom:4 }}>Input</div>
              <div style={{ color:'#f8fafc', background:'rgba(255,255,255,.04)', padding:'8px 12px', borderRadius:8, border:'1px solid rgba(255,255,255,.06)' }}>{testCases[activeCase]?.input}</div>
            </div>
            <div>
              <div style={{ color:'#475569', marginBottom:4 }}>Expected output</div>
              <div style={{ color:'#10b981', background:'rgba(16,185,129,.05)', padding:'8px 12px', borderRadius:8, border:'1px solid rgba(16,185,129,.15)' }}>{testCases[activeCase]?.expected}</div>
            </div>
            {results?.cases[activeCase] && (
              <div>
                <div style={{ color:'#475569', marginBottom:4 }}>Your output</div>
                <div style={{ color: results.cases[activeCase].passed ? '#10b981' : '#f43f5e', background: results.cases[activeCase].passed ? 'rgba(16,185,129,.05)' : 'rgba(244,63,94,.05)', padding:'8px 12px', borderRadius:8, border:`1px solid ${results.cases[activeCase].passed ? 'rgba(16,185,129,.2)' : 'rgba(244,63,94,.2)'}` }}>
                  {results.cases[activeCase].output}
                  <span style={{ marginLeft:8 }}>{results.cases[activeCase].passed ? '✓' : '✗'}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}