import React, { useState } from 'react'
import { Navbar } from '../../components/layout/Navbar'
import { useCanvasBg } from '../../hooks/useCanvasBg'
import { useCursor } from '../../hooks/useCursor'
import { SetupScreen } from './SetupScreen'
import { LiveSession } from './LiveSession/index'
import { ScoreReport } from './ScoreReport/index'
import { WaitingRoom } from './RecruiterSession/WaitingRoom'
import { VideoCallRoom } from './RecruiterSession/VideoCallRoom'
import { Button } from '../../components/ui/Button'
import { GlassCard } from '../../components/ui/Atoms'
import { Badge } from '../../components/ui/Atoms'

// step: 'pick' | 'ai-setup' | 'ai-live' | 'ai-report' | 'rec-waiting' | 'rec-call'
export default function InterviewPage() {
  useCanvasBg('iv-canvas')
  useCursor()

  const [step, setStep] = useState('pick')
  const [config, setConfig] = useState(null)
  const [report, setReport] = useState(null)

  const reset = () => { setStep('pick'); setConfig(null); setReport(null) }

  return (
    <div style={{ minHeight: '100vh', background: '#080909', color: '#f8fafc', fontFamily: 'Geist,sans-serif' }}>
      <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;700&family=Geist:wght@300;400;500;600&display=swap" rel="stylesheet" />
      <style>{`
        body{cursor:none}
        #cur-dot{width:5px;height:5px;border-radius:50%;background:#00d2ff;box-shadow:0 0 8px #00d2ff;position:fixed;top:0;left:0;pointer-events:none;z-index:9999}
        #cur-ring{width:28px;height:28px;border-radius:50%;border:1.5px solid rgba(0,210,255,.5);position:fixed;top:0;left:0;pointer-events:none;z-index:9998;transition:width .2s,height .2s}
        body.hov #cur-ring{width:44px;height:44px;border-color:rgba(124,58,237,.7);margin:-8px}
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
      `}</style>

      <canvas id="iv-canvas" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <main
          style={{ maxWidth: step.includes('live') || step.includes('call') ? 1100 : 760, margin: '0 auto', padding: '100px 24px 60px', animation: 'fadeUp .4s ease' }}
          key={step}
        >
          {step === 'pick' && <ModePicker onAI={() => setStep('ai-setup')} onRecruiter={() => setStep('rec-waiting')} />}
          {step === 'ai-setup' && <SetupScreen onStart={cfg => { setConfig(cfg); setStep('ai-live') }} />}
          {step === 'ai-live' && <LiveSession config={config} onFinish={data => { setReport(data); setStep('ai-report') }} />}
          {step === 'ai-report' && <ScoreReport report={report} onReset={reset} />}
          {step === 'rec-waiting' && <WaitingRoom onJoin={() => setStep('rec-call')} onBack={reset} />}
          {step === 'rec-call' && <VideoCallRoom onEnd={reset} />}
        </main>
      </div>

      <div id="cur-dot" /><div id="cur-ring" />
    </div>
  )
}

function ModePicker({ onAI, onRecruiter }) {
  return (
    <div>
      <div style={{ marginBottom: 36 }}>
        <Badge variant="violet" pulse>Interview</Badge>
        <h1 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontWeight: 800, fontSize: 'clamp(1.8rem,3vw,2.4rem)', letterSpacing: '-.03em', lineHeight: 1.1, margin: '12px 0 8px' }}>
          Choose interview type
        </h1>
        <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.7 }}>
          Practice with our AI 24/7, or book a live session with a real recruiter.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* AI card */}
        <GlassCard hover className="p-7" style={{ cursor: 'pointer' }} onClick={onAI}>
          <div style={{ fontSize: 44, marginBottom: 16 }}>🤖</div>
          <div style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontWeight: 800, fontSize: '1.4rem', letterSpacing: '-.02em', marginBottom: 8 }}>AI Interview</div>
          <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.7, marginBottom: 20 }}>
            Start instantly. Our AI adapts to your level, asks follow-ups, and scores you in real-time. Available 24/7.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
            {['Available anytime', 'Instant scoring & report', '5 adaptive questions', 'Role + topic selection'].map(f => (
              <div key={f} style={{ display: 'flex', gap: 8, fontSize: 13, color: '#475569' }}>
                <span style={{ color: '#10b981' }}>✓</span>{f}
              </div>
            ))}
          </div>
          <Button variant="primary" size="md" style={{ width: '100%' }}>Start AI Interview →</Button>
        </GlassCard>

        {/* Recruiter card */}
        <GlassCard hover className="p-7" style={{ cursor: 'pointer' }} onClick={onRecruiter}>
          <div style={{ fontSize: 44, marginBottom: 16 }}>👨‍💼</div>
          <div style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontWeight: 800, fontSize: '1.4rem', letterSpacing: '-.02em', marginBottom: 8 }}>Live Recruiter</div>
          <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.7, marginBottom: 20 }}>
            Book a slot with a real engineer from Google, Amazon, Meta, or Flipkart. Get human feedback.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
            {['Real engineers from top companies', 'Human feedback + tips', 'Video + screen share', 'Certificate on completion'].map(f => (
              <div key={f} style={{ display: 'flex', gap: 8, fontSize: 13, color: '#475569' }}>
                <span style={{ color: '#7c3aed' }}>✓</span>{f}
              </div>
            ))}
          </div>
          <Button variant="glow" size="md" style={{ width: '100%' }}>Book Live Session →</Button>
        </GlassCard>
      </div>

      {/* Social proof */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 28 }}>
        {[['🤖', '2,400+ AI sessions today'], ['👨‍💼', '180+ live sessions this week'], ['⭐', '4.9 avg rating']].map(([ic, t]) => (
          <span key={t} style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 11, color: '#1e293b' }}>{ic} {t}</span>
        ))}
      </div>
    </div>
  )
}