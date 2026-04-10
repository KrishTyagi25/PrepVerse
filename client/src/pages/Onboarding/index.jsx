import React, { useState } from 'react'
import { useNavigate }  from 'react-router-dom'
import { useCanvasBg }  from '../../hooks/useCanvasBg'
import { useCursor }    from '../../hooks/useCursor'
import { useToast }     from '../../components/ui/Toast'
import { Step1Track }   from './Step1Track'
import { Step2Profile } from './Step2Profile'
import { Step3FirstSolve } from './Step3FirstSolve'
import { userService } from '../../api/services/userService'
import { useAuth }     from '../../context/AuthContext'

export default function OnboardingPage() {
  useCanvasBg('ob-canvas')
  useCursor()
  const toast    = useToast()
  const navigate = useNavigate()
  const { updateUser } = useAuth()

  const [step, setStep] = useState(0)
  const [data, setData] = useState({ role:'', goal:'', college:'', bio:'' })

  const next  = (updates = {}) => { 
    setData(d => ({ ...d, ...updates })); 
    setStep(s => s + 1) 
  }

  // ✅ MERGED LOGIC (API + context update)
  const finish = async () => {
    try {
      await userService.completeOnboarding({
        role:    data.role,
        goal:    data.goal,
        college: data.college,
        bio:     data.bio,
      })

      updateUser({
        onboardingDone: true,
        role: data.role,
        goal: data.goal,
        college: data.college
      })

      toast('🎉 Welcome to PrepVerse! Your journey starts now.', 'success', 4000)
      navigate('/dashboard')
    } catch (err) {
      toast(err.response?.data?.message ?? 'Failed to save — try again', 'error')
    }
  }

  const STEPS = ['Choose your track', 'Set up your profile', 'Solve your first problem']

  return (
    <div style={{ minHeight:'100vh', background:'#080909', color:'#f8fafc', fontFamily:'Geist,sans-serif', display:'flex', flexDirection:'column' }}>
      <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;700&family=Geist:wght@300;400;500;600&display=swap" rel="stylesheet"/>
      <style>{`body{cursor:none}#cur-dot{width:5px;height:5px;border-radius:50%;background:#00d2ff;box-shadow:0 0 8px #00d2ff;position:fixed;top:0;left:0;pointer-events:none;z-index:9999}#cur-ring{width:28px;height:28px;border-radius:50%;border:1.5px solid rgba(0,210,255,.5);position:fixed;top:0;left:0;pointer-events:none;z-index:9998}@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}`}</style>
      <canvas id="ob-canvas" style={{ position:'fixed',inset:0,zIndex:0,pointerEvents:'none' }}/>

      <div style={{ position:'relative', zIndex:1, flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'40px 24px' }}>

        {/* Logo */}
        <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:'1.15rem', marginBottom:40 }}>
          Prep<span style={{ color:'#00d2ff' }}>Verse</span>
        </div>

        {/* Step dots */}
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:36 }}>
          {STEPS.map((label, i) => (
            <React.Fragment key={i}>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
                <div style={{
                  width: i === step ? 32 : 24, height:8, borderRadius:999,
                  background: i < step ? 'linear-gradient(90deg,#00d2ff,#7c3aed)' : i === step ? '#00d2ff' : 'rgba(255,255,255,.08)',
                  transition:'all .4s cubic-bezier(.34,1.56,.64,1)',
                }}/>
                <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9, color: i === step ? '#00d2ff' : '#1e293b', whiteSpace:'nowrap', transition:'color .3s' }}>{label}</span>
              </div>
              {i < STEPS.length-1 && <div style={{ width:24, height:1, background:'rgba(255,255,255,.07)', marginBottom:14 }}/>}
            </React.Fragment>
          ))}
        </div>

        {/* Step content */}
        <div style={{ width:'100%', maxWidth:580, animation:'fadeUp .35s ease' }} key={step}>
          {step === 0 && <Step1Track data={data} onNext={next}/>}
          {step === 1 && <Step2Profile data={data} onNext={next} onBack={() => setStep(0)}/>}
          {step === 2 && <Step3FirstSolve onFinish={finish} onBack={() => setStep(1)}/>}
        </div>

        <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#1e293b', marginTop:32 }}>
          Step {step+1} of {STEPS.length}
        </div>
      </div>

      <div id="cur-dot"/>
      <div id="cur-ring"/>
    </div>
  )
}