import React, { useState } from 'react'
import { GlassCard } from '../../components/ui/Atoms'
import { Button } from '../../components/ui/Button'
import { DiffBadge } from '../../components/ui/Atoms'
import { useNavigate } from 'react-router-dom'

const STARTER_PROBLEMS = [
  { id: 1, title: 'Two Sum', diff: 'Easy', time: '~15 min', desc: 'Classic HashMap problem. Perfect for beginners.' },
  { id: 3, title: 'Climbing Stairs', diff: 'Easy', time: '~10 min', desc: 'Your first DP problem — builds an important pattern.' },
  { id: 2, title: 'Valid Parentheses', diff: 'Easy', time: '~15 min', desc: 'Stack-based problem. Great for understanding recursion.' },
]

export function Step3FirstSolve({ onFinish, onBack }) {
  const [selected, setSelected] = useState(null)
  const navigate = useNavigate()

  const handleSolveNow = () => {
    if (selected) navigate(`/practice/${selected}`)
    else onFinish()
  }

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{ fontSize: 52, marginBottom: 12 }}>🚀</div>
        <h1 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontWeight: 800, fontSize: 'clamp(1.6rem,3vw,2rem)', letterSpacing: '-.03em', lineHeight: 1.1, marginBottom: 8 }}>
          Solve your first problem
        </h1>
        <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.7 }}>Pick a problem to start with. You can always change later. This earns you your first XP!</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        {STARTER_PROBLEMS.map(p => (
          <GlassCard key={p.id} hover className="p-4" style={{ cursor: 'pointer', outline: selected === p.id ? '1px solid rgba(0,210,255,.4)' : 'none', background: selected === p.id ? 'rgba(0,210,255,.05)' : undefined }} onClick={() => setSelected(p.id)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: selected === p.id ? 'rgba(0,210,255,.2)' : 'rgba(255,255,255,.04)', border: `1px solid ${selected === p.id ? 'rgba(0,210,255,.4)' : 'rgba(255,255,255,.07)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0, transition: 'all .2s' }}>
                {selected === p.id ? '●' : '○'}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                  <span style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontWeight: 700, fontSize: 14, color: '#f8fafc' }}>{p.title}</span>
                  <DiffBadge level={p.diff} />
                  <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 10, color: '#1e293b' }}>⏱ {p.time}</span>
                </div>
                <div style={{ fontFamily: 'Geist,sans-serif', fontSize: 12, color: '#475569' }}>{p.desc}</div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <Button variant="ghost" size="lg" onClick={onBack}>← Back</Button>
        <Button variant="primary" size="lg" style={{ flex: 1 }} onClick={handleSolveNow}>
          {selected ? 'Solve now →' : 'Skip for now →'}
        </Button>
      </div>

      <p style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 10, color: '#1e293b', textAlign: 'center', marginTop: 12 }}>
        You can skip this and go straight to your dashboard
      </p>
    </div>
  )
}