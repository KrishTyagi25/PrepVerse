import React, { useState, useEffect } from 'react'
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
import { interviewService } from '../../api/interviewService'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../components/ui/Toast'

// step: 'pick' | 'ai-setup' | 'ai-live' | 'ai-report' | 'rec-waiting' | 'rec-call'

function ModePicker({ onAI, onRecruiter }) {
  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontWeight: 800, fontSize: 32, color: '#f8fafc', marginBottom: 8 }}>
          Interview Practice
        </div>
        <div style={{ fontFamily: 'Geist,sans-serif', fontSize: 14, color: '#64748b' }}>
          Choose your session type
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div
          onClick={onAI}
          style={{ padding: 28, borderRadius: 16, background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.08)', cursor: 'pointer', transition: 'border-color .2s, background .2s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#00d2ff'; e.currentTarget.style.background = 'rgba(0,210,255,.05)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.08)'; e.currentTarget.style.background = 'rgba(255,255,255,.03)' }}
        >
          <div style={{ fontSize: 32, marginBottom: 12 }}>🤖</div>
          <div style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontWeight: 700, fontSize: 18, color: '#f8fafc', marginBottom: 6 }}>AI Mock Interview</div>
          <div style={{ fontFamily: 'Geist,sans-serif', fontSize: 13, color: '#64748b' }}>Practice with an AI interviewer on any topic</div>
        </div>
        <div
          onClick={onRecruiter}
          style={{ padding: 28, borderRadius: 16, background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.08)', cursor: 'pointer', transition: 'border-color .2s, background .2s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#7c3aed'; e.currentTarget.style.background = 'rgba(124,58,237,.05)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.08)'; e.currentTarget.style.background = 'rgba(255,255,255,.03)' }}
        >
          <div style={{ fontSize: 32, marginBottom: 12 }}>🎙️</div>
          <div style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontWeight: 700, fontSize: 18, color: '#f8fafc', marginBottom: 6 }}>Recruiter Session</div>
          <div style={{ fontFamily: 'Geist,sans-serif', fontSize: 13, color: '#64748b' }}>Join a live session with a recruiter</div>
        </div>
      </div>
    </div>
  )
}
export default function InterviewPage() {
  useCanvasBg('iv-canvas')
  useCursor()

  const toast = useToast()

  const [step, setStep] = useState('pick')
  const [config, setConfig] = useState(null)
  const [report, setReport] = useState(null)

  const { updateUser } = useAuth()

  // ✅ NEW: history state
  const [history, setHistory] = useState([])
  const [histStats, setHistStats] = useState(null)

  // ✅ load history
  useEffect(() => {
    Promise.all([
      interviewService.getHistory(),
      interviewService.getStats(),
    ]).then(([histRes, statsRes]) => {
      setHistory(histRes.data.data.interviews)
      setHistStats(statsRes.data.data)
    }).catch(() => {})
  }, [])

  // ✅ finish interview
  const finishInterview = async (scores, messages) => {
    try {
      const { data } = await interviewService.saveInterview({
        type: 'ai',
        role: config?.role,
        topic: config?.topic,
        duration: Math.round((Date.now() - (config?.startTime || Date.now())) / 60000),
        overallScore: scores.overall,
        clarityScore: scores.clarity,
        depthScore: scores.depth,
        examplesScore: scores.examples,
        confidenceScore: scores.confidence,
        messages,
      })

      updateUser({ xp: data.data.xpEarned })
      toast(`🎉 Interview saved! +${data.data.xpEarned} XP`, 'success', 4000)
    } catch {}
  }

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

          {step === 'ai-setup' && (
            <SetupScreen
              onStart={cfg => {
                setConfig({ ...cfg, startTime: Date.now() })
                setStep('ai-live')
              }}
            />
          )}

          {step === 'ai-live' && (
            <LiveSession
              config={config}
              onFinish={({ scores, messages, ...rest }) => {
                finishInterview(scores, messages)
                setReport({ scores, messages, ...rest })
                setStep('ai-report')
              }}
            />
          )}

          {step === 'ai-report' && <ScoreReport report={report} onReset={reset} />}
          {step === 'rec-waiting' && <WaitingRoom onJoin={() => setStep('rec-call')} onBack={reset} />}
          {step === 'rec-call' && <VideoCallRoom onEnd={reset} />}

          {/* ✅ Past Sessions */}
          {history.length > 0 && (
            <div style={{ marginTop:32 }}>
              <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:15, color:'#f8fafc', marginBottom:14 }}>
                Past sessions
              </div>

              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px,1fr))', gap:12 }}>
                {history.slice(0,6).map((iv, i) => (
                  <div key={i} style={{ padding:14, borderRadius:12, background:'rgba(255,255,255,.02)', border:'1px solid rgba(255,255,255,.07)' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                      <span style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:13, color:'#f8fafc' }}>{iv.topic}</span>
                      <span style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:16, color: iv.overallScore >= 80 ? '#10b981' : iv.overallScore >= 60 ? '#f59e0b' : '#f43f5e' }}>{iv.overallScore}</span>
                    </div>
                    <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#475569' }}>
                      {new Date(iv.createdAt).toLocaleDateString('en-IN')} · {iv.duration}min
                    </div>
                  </div>
                ))}
              </div>

              {histStats && (
                <div style={{ marginTop:12, padding:'12px 16px', borderRadius:10, background:'rgba(255,255,255,.02)', border:'1px solid rgba(255,255,255,.06)', display:'flex', gap:20 }}>
                  <div style={{ textAlign:'center' }}>
                    <div style={{ fontWeight:800, fontSize:18, color:'#00d2ff' }}>{histStats.total}</div>
                    <div style={{ fontSize:9, color:'#1e293b' }}>sessions</div>
                  </div>
                  <div style={{ textAlign:'center' }}>
                    <div style={{ fontWeight:800, fontSize:18, color:'#10b981' }}>{histStats.avgScore}</div>
                    <div style={{ fontSize:9, color:'#1e293b' }}>avg score</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      <div id="cur-dot" /><div id="cur-ring" />
    </div>
  )
}