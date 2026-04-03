import React from 'react'
import { DiffBadge } from '../../../components/ui/Atoms'

export function ProblemStatement({ problem }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <h2 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-.02em', margin: 0 }}>{problem.title}</h2>
        <DiffBadge level={problem.diff} />
        <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 10, color: '#475569', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 4, padding: '2px 7px' }}>{problem.tag}</span>
      </div>

      <div style={{ fontFamily: 'Geist,sans-serif', fontSize: 14, color: '#94a3b8', lineHeight: 1.8, marginBottom: 20, whiteSpace: 'pre-line' }}>
        {problem.desc.split('`').map((part, i) =>
          i % 2 === 1
            ? <code key={i} style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 12, color: '#00d2ff', background: 'rgba(0,210,255,.08)', padding: '1px 5px', borderRadius: 4 }}>{part}</code>
            : <span key={i}>{part}</span>
        )}
      </div>

      {problem.examples.map((ex, i) => (
        <div key={i} style={{ marginBottom: 16 }}>
          <div style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontWeight: 700, fontSize: 13, color: '#f8fafc', marginBottom: 8 }}>Example {i + 1}</div>
          <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 10, padding: '12px 14px', fontFamily: 'JetBrains Mono,monospace', fontSize: 12 }}>
            <div style={{ color: '#475569', marginBottom: 4 }}><span style={{ color: '#f8fafc' }}>Input:</span> {ex.input}</div>
            <div style={{ color: '#475569', marginBottom: ex.explanation ? 4 : 0 }}><span style={{ color: '#f8fafc' }}>Output:</span> {ex.output}</div>
            {ex.explanation && <div style={{ color: '#475569' }}><span style={{ color: '#f8fafc' }}>Explanation:</span> {ex.explanation}</div>}
          </div>
        </div>
      ))}

      <div style={{ marginTop: 20 }}>
        <div style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontWeight: 700, fontSize: 13, color: '#f8fafc', marginBottom: 8 }}>Constraints</div>
        <ul style={{ margin: 0, padding: '0 0 0 18px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {problem.constraints.map((c, i) => (
            <li key={i} style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 12, color: '#475569' }}>{c}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}