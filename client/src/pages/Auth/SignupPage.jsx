import React, { useState, useEffect } from 'react'
import { useCanvasBg }  from '../../hooks/useCanvasBg'
import { useCursor }    from '../../hooks/useCursor'
import { Button }       from '../../components/ui/Button'
import { GlassCard }    from '../../components/ui/Atoms'
import { Badge }        from '../../components/ui/Atoms'
import {Logo}           from '../../components/ui/Logo'
import { Field }        from '../../components/ui/Field'
/* ── Password strength checker ── */
function PasswordStrength({ password }) {
  const checks = [
    { label: 'At least 8 chars', pass: password.length >= 8 },
    { label: 'Uppercase',        pass: /[A-Z]/.test(password) },
    { label: 'Number or symbol', pass: /[0-9!@#$%^&*]/.test(password) },
  ]
  const score  = checks.filter(c => c.pass).length
  const colors = ['#f43f5e', '#f59e0b', '#10b981']
  const labels = ['Weak', 'Fair', 'Strong']
  if (!password) return null
  return (
    <div style={{ marginTop: 6 }}>
      <div style={{ display: 'flex', gap: 4, marginBottom: 6 }}>
        {[0,1,2].map(i => <div key={i} style={{ flex: 1, height: 3, borderRadius: 999, background: i < score ? colors[score-1] : 'rgba(255,255,255,.08)', transition: 'background .3s' }}/>)}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 12 }}>
          {checks.map(c => (
            <span key={c.label} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: c.pass ? '#10b981' : '#1e293b' }}>
              {c.pass ? '✓' : '○'} {c.label}
            </span>
          ))}
        </div>
        {score > 0 && <span style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: 11, fontWeight: 700, color: colors[score-1] }}>{labels[score-1]}</span>}
      </div>
    </div>
  )
}

/* ── Step dots ── */
function StepProgress({ current, total }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 28 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{ width: i < current ? 24 : 8, height: 8, borderRadius: 999, background: i < current ? 'linear-gradient(90deg,#00d2ff,#7c3aed)' : i === current ? '#00d2ff' : 'rgba(255,255,255,.08)', transition: 'all .4s cubic-bezier(.34,1.56,.64,1)' }}/>
      ))}
      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#475569', marginLeft: 4 }}>{current+1}/{total}</span>
    </div>
  )
}

/* ── Role picker ── */
const ROLES = [
  { id: 'fe', icon: '⚛️', label: 'Frontend',  desc: 'React, CSS, JS',   color: '#00d2ff' },
  { id: 'be', icon: '⚙️', label: 'Backend',   desc: 'APIs, DBs, Node',  color: '#10b981' },
  { id: 'fs', icon: '🔷', label: 'Fullstack', desc: 'End-to-end stack', color: '#7c3aed' },
  { id: 'ml', icon: '🧠', label: 'ML / AI',   desc: 'PyTorch, NLP, CV', color: '#f59e0b' },
]

function RolePicker({ selected, onSelect }) {
  return (
    <div>
      <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '.09em', textTransform: 'uppercase', color: '#475569', marginBottom: 8 }}>
        Primary Track <span style={{ color: '#f43f5e' }}>*</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {ROLES.map(r => {
          const active = selected === r.id
          return (
            <button key={r.id} type="button" onClick={() => onSelect(r.id)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', borderRadius: 10, cursor: 'pointer', background: active ? `${r.color}12` : '#111214', border: `1px solid ${active ? r.color+'50' : 'rgba(255,255,255,.07)'}`, boxShadow: active ? `0 0 18px ${r.color}18` : 'none', transition: 'all .2s' }}>
              <span style={{ fontSize: 18 }}>{r.icon}</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: 13, color: active ? '#f8fafc' : '#94a3b8' }}>{r.label}</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: active ? r.color : '#1e293b' }}>{r.desc}</div>
              </div>
              {active && <div style={{ marginLeft: 'auto', width: 18, height: 18, borderRadius: '50%', background: r.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#fff', flexShrink: 0 }}>✓</div>}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ── Field (same as LoginPage — move to components/ui/Field.jsx and import both) ── */


const FEATURES = [
  { icon: '🧩', title: '500+ Curated DSA Problems', desc: 'Company-tagged, difficulty-sorted with editorial solutions' },
  { icon: '🤖', title: 'AI Mock Interviews 24/7',   desc: 'Adaptive, role-specific — get scored and improve fast' },
  { icon: '👨‍💼', title: 'Live Recruiter Sessions',   desc: 'Real engineers from top companies, bookable on-demand' },
  { icon: '🔍', title: 'Recruiter-Discoverable Profile', desc: 'Verified scores, progress, and streaks — all public' },
]

const GOALS = ['Placement season prep (Campus)', 'Off-campus job search', 'Career switch / upskill', 'Just exploring']

export default function SignupPage({ onNavigateLogin }) {
  useCanvasBg('signup-canvas')
  useCursor()

  const [step,     setStep]     = useState(0)
  const [name,     setName]     = useState('')
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [showPw,   setShowPw]   = useState(false)
  const [role,     setRole]     = useState('')
  const [college,  setCollege]  = useState('')
  const [agree,    setAgree]    = useState(false)
  const [errors,   setErrors]   = useState({})
  const [loading,  setLoading]  = useState(false)
  const [mounted,  setMounted]  = useState(false)

  useEffect(() => { setTimeout(() => setMounted(true), 60) }, [])

  const validateStep0 = () => {
    const e = {}
    if (!name.trim())                  e.name     = 'Full name is required'
    if (!email)                        e.email    = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email'
    if (!password)                     e.password = 'Password is required'
    else if (password.length < 8)      e.password = 'Minimum 8 characters'
    return e
  }

  const handleNext = (ev) => {
    ev.preventDefault()
    const errs = validateStep0()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({}); setStep(1)
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    const errs = {}
    if (!role)  errs.role  = 'Please pick a track'
    if (!agree) errs.agree = 'You must accept the terms'
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({}); setLoading(true)
    await new Promise(r => setTimeout(r, 1800))
    setLoading(false)
    alert('Account created!')
  }

  return (
    <div style={{ fontFamily: 'Geist, sans-serif', minHeight: '100vh', background: '#080909', color: '#f8fafc', display: 'flex', position: 'relative', overflow: 'hidden' }}>
      <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;700&family=Geist:wght@300;400;500;600&display=swap" rel="stylesheet"/>
      <style>{`
        @keyframes authGlow    { 0%,100%{transform:scale(1);opacity:.6} 50%{transform:scale(1.12);opacity:1} }
        @keyframes spin        { to{transform:rotate(360deg)} }
        @keyframes dotPulse    { 0%,100%{opacity:1} 50%{opacity:.3} }
        @keyframes slideInForm { from{opacity:0;transform:translateX(18px)} to{opacity:1;transform:none} }
        input::placeholder     { color:#1e293b }
        input:-webkit-autofill,input:-webkit-autofill:focus {
          -webkit-box-shadow:0 0 0 1000px #111214 inset !important;
          -webkit-text-fill-color:#f8fafc !important;
        }
        body { cursor: none }
        #cur-dot  { width:5px;height:5px;border-radius:50%;background:#00d2ff;box-shadow:0 0 8px #00d2ff;position:fixed;top:0;left:0;pointer-events:none;z-index:9999 }
        #cur-ring { width:28px;height:28px;border-radius:50%;border:1.5px solid rgba(0,210,255,.5);position:fixed;top:0;left:0;pointer-events:none;z-index:9998 }
        body.hov #cur-ring { width:44px;height:44px;border-color:rgba(124,58,237,.7);margin:-8px }
        .su-left  { display:none }
        .su-mlogo { display:flex }
        @media(min-width:1024px){ .su-left{ display:flex !important } .su-mlogo{ display:none !important } }
      `}</style>

      <canvas id="signup-canvas" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}/>
      <div style={{ position: 'fixed', top: '-15%', right: '-5%', width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle,rgba(124,58,237,.08) 0%,transparent 65%)', pointerEvents: 'none', zIndex: 1, animation: 'authGlow 10s ease-in-out infinite' }}/>
      <div style={{ position: 'fixed', bottom: '-15%', left: '-5%', width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,210,255,.07) 0%,transparent 65%)', pointerEvents: 'none', zIndex: 1, animation: 'authGlow 8s ease-in-out infinite 1.5s' }}/>
      <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px)', backgroundSize: '52px 52px', maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%,black,transparent)' }}/>

      <div style={{ display: 'flex', width: '100%', zIndex: 2 }}>

        {/* ── LEFT PANEL ── */}
        <div className="su-left" style={{ flex: '0 0 44%', flexDirection: 'column', justifyContent: 'space-between', padding: '48px 52px', background: 'linear-gradient(145deg,#0c0d0e 0%,#111214 100%)', borderRight: '1px solid rgba(255,255,255,.06)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: 1, height: '100%', background: 'linear-gradient(180deg,transparent,rgba(124,58,237,.15),transparent)' }}/>

          <Logo size={32}/>

          <div>
            <Badge variant="violet" pulse>Join 12,000+ learners</Badge>
            <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 800, fontSize: 'clamp(1.8rem,2.4vw,2.5rem)', lineHeight: 1.08, letterSpacing: '-.03em', margin: '20px 0 16px' }}>
              Start your journey<br/>
              <span style={{ background: 'linear-gradient(135deg,#00d2ff,#7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>to FAANG today.</span>
            </h2>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: '#475569', maxWidth: 340, marginBottom: 28 }}>
              Free account: 500+ DSA problems, unlimited AI interviews, and a recruiter-visible profile.
            </p>

            {/* Feature rows — using GlassCard instead of custom markup */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,.05)' }}>
              {FEATURES.map(f => (
                <div key={f.title} style={{ display: 'flex', gap: 12, padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,.05)' }}>
                  <div style={{ width: 36, height: 36, flexShrink: 0, borderRadius: 9, background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{f.icon}</div>
                  <div>
                    <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: 13, color: '#f8fafc', marginBottom: 2 }}>{f.title}</div>
                    <div style={{ fontSize: 12, color: '#475569', lineHeight: 1.5 }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 24 }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#1e293b', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 10 }}>Our users work at</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 14px', opacity: .3 }}>
                {['Google','Amazon','Microsoft','Meta','Flipkart','Razorpay'].map(c => (
                  <span key={c} style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 800, fontSize: 12, color: '#f8fafc' }}>{c}</span>
                ))}
              </div>
            </div>
          </div>

          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#1e293b' }}>© 2025 PrepVerse · No spam, ever.</div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', minHeight: '100vh' }}>
          <div style={{ width: '100%', maxWidth: 440, opacity: mounted ? 1 : 0, transform: mounted ? 'none' : 'translateY(18px)', transition: 'opacity .6s ease, transform .6s ease' }}>

            <div className="su-mlogo" style={{ alignItems: 'center', gap: 8, marginBottom: 32, justifyContent: 'center' }}>
              <Logo size={26}/>
            </div>

            <StepProgress current={step} total={2}/>

            <div style={{ marginBottom: 24 }}>
              <h1 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 800, fontSize: 'clamp(1.5rem,3vw,1.9rem)', letterSpacing: '-.03em', lineHeight: 1.1, marginBottom: 6 }}>
                {step === 0 ? 'Create your account' : 'Set up your profile'}
              </h1>
              <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.6 }}>
                {step === 0 ? 'Start your prep journey in 30 seconds — completely free.' : 'Tell us about you so we can personalise your roadmap.'}
              </p>
            </div>

            {/* ── STEP 0 ── */}
            {step === 0 && (
              <div key="step0" style={{ animation: 'slideInForm .35s ease' }}>
                <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
                  <Button variant="ghost" size="sm" style={{ flex: 1 }}>🔵 Continue with Google</Button>
                  <Button variant="ghost" size="sm" style={{ flex: 1 }}>🐙 Continue with GitHub</Button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                  <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,.07)' }}/>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#1e293b', letterSpacing: '.06em', textTransform: 'uppercase' }}>or email</span>
                  <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,.07)' }}/>
                </div>
                <form onSubmit={handleNext} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <Field label="Full name" placeholder="Aryan Sharma" value={name} onChange={e=>setName(e.target.value)} icon={<UserIcon/>} error={errors.name} required/>
                  <Field label="Email address" type="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} icon={<EmailIcon/>} error={errors.email} required/>
                  <div>
                    <Field label="Password" type={showPw?'text':'password'} placeholder="Min. 8 characters" value={password} onChange={e=>setPassword(e.target.value)} icon={<LockIcon/>} error={errors.password} required
                      rightEl={<span onClick={()=>setShowPw(!showPw)} style={{cursor:'pointer',fontSize:14}}>{showPw?'🙈':'👁'}</span>}
                    />
                    <PasswordStrength password={password}/>
                  </div>
                  <Button variant="primary" size="lg" style={{ marginTop: 4, width: '100%' }}>Continue →</Button>
                </form>
              </div>
            )}

            {/* ── STEP 1 ── */}
            {step === 1 && (
              <div key="step1" style={{ animation: 'slideInForm .35s ease' }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <RolePicker selected={role} onSelect={setRole}/>
                  {errors.role && <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#f43f5e', marginTop: -10 }}>{errors.role}</span>}

                  <Field label="College / University" placeholder="IIT Delhi, NIT Surat…" value={college} onChange={e=>setCollege(e.target.value)} icon={<CollegeIcon/>} hint="Optional — helps recruiters find you"/>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '.09em', textTransform: 'uppercase', color: '#475569' }}>Current Goal</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {GOALS.map(g => (
                        <label key={g} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 13px', borderRadius: 9, background: 'rgba(255,255,255,.02)', border: '1px solid rgba(255,255,255,.06)', cursor: 'pointer' }}>
                          <input type="radio" name="goal" value={g} style={{ accentColor: '#00d2ff', width: 14, height: 14, flexShrink: 0 }}/>
                          <span style={{ fontSize: 13, color: '#94a3b8' }}>{g}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: 9, cursor: 'pointer' }}>
                    <input type="checkbox" checked={agree} onChange={e=>setAgree(e.target.checked)} style={{ accentColor: '#00d2ff', width: 14, height: 14, flexShrink: 0, marginTop: 2 }}/>
                    <span style={{ fontSize: 13, color: '#475569', lineHeight: 1.5 }}>
                      I agree to the <a href="#" style={{ color: '#00d2ff', textDecoration: 'none' }}>Terms</a> and <a href="#" style={{ color: '#00d2ff', textDecoration: 'none' }}>Privacy Policy</a>
                    </span>
                  </label>
                  {errors.agree && <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#f43f5e', marginTop: -10 }}>{errors.agree}</span>}

                  <div style={{ display: 'flex', gap: 10 }}>
                    <Button variant="ghost" size="md" onClick={() => setStep(0)}>← Back</Button>
                    <Button variant="primary" size="md" style={{ flex: 1 }} disabled={loading}>
                      {loading
                        ? <><span style={{ width: 15, height: 15, border: '2px solid rgba(255,255,255,.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin .7s linear infinite', display: 'inline-block' }}/> Creating…</>
                        : 'Create Free Account 🚀'}
                    </Button>
                  </div>
                </form>
              </div>
            )}

            <div style={{ marginTop: 24, paddingTop: 18, borderTop: '1px solid rgba(255,255,255,.06)', textAlign: 'center', fontSize: 14, color: '#475569' }}>
              Already have an account?{' '}
              <span onClick={onNavigateLogin} style={{ color: '#00d2ff', cursor: 'pointer', fontWeight: 600, fontFamily: 'Bricolage Grotesque, sans-serif' }}>Sign in →</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 20 }}>
              {['🔒 Secure','🆓 Free to start','🇮🇳 India-focused'].map(b => (
                <span key={b} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#1e293b' }}>{b}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cursor elements for useCursor() hook */}
      <div id="cur-dot"/>
      <div id="cur-ring"/>
    </div>
  )
}

/* ── Shared icons (put in components/ui/Icons.jsx) ── */

function UserIcon()    { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="7" r="4"/><path d="M4 21v-1a8 8 0 0 1 16 0v1"/></svg> }
function EmailIcon()   { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 8 10 6 10-6"/></svg> }
function LockIcon()    { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> }
function CollegeIcon() { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg> }