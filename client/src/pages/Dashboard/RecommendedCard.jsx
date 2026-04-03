import React from 'react'
import { GlassCard } from '../../components/ui/Atoms'
import { DiffBadge } from '../../components/ui/Atoms'
import { Button }    from '../../components/ui/Button'

const NEXT = [
  { title: 'Longest Substring Without Repeating Characters', diff: 'Medium', tag: 'Sliding Window', company: 'Google' },
  { title: 'Climbing Stairs',                                diff: 'Easy',   tag: 'DP',             company: 'Amazon' },
  { title: 'Word Search II',                                 diff: 'Hard',   tag: 'Trie + DFS',     company: 'Meta'   },
]

export function RecommendedCard() {
  return (
    <GlassCard className="p-5">
      <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: 14, color: '#f8fafc', marginBottom: 14 }}>Recommended next</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {NEXT.map((p, i) => (
          <div key={i} style={{ padding: '12px 14px', borderRadius: 10, background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.06)' }}>
            <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 600, fontSize: 13, color: '#f8fafc', marginBottom: 6, lineHeight: 1.4 }}>{p.title}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
              <DiffBadge level={p.diff}/>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#475569' }}>{p.tag}</span>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#1e293b' }}>· {p.company}</span>
            </div>
            <Button variant="ghost" size="sm" style={{ width: '100%' }}>Solve →</Button>
          </div>
        ))}
      </div>
    </GlassCard>
  )
}