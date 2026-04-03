import React from 'react'
import { SectionLabel, Badge } from '../../components/ui/Atoms'
import { Button } from '../../components/ui/Button'

export function InterviewSection() {
  return (
    <section id="interviews" className="py-28 border-t border-white/[.06]">
      <div className="max-w-[1280px] mx-auto px-6">

        <div className="text-center mb-14 reveal">
          <SectionLabel>🎙️ Interview Practice</SectionLabel>
          <h2 className="font-display font-bold tracking-tight mb-3"
              style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)' }}>
            Two Ways to <span className="grad-text">Sharpen Your Skills</span>
          </h2>
          <p className="text-t1 text-[15px] max-w-[480px] mx-auto">
            Whether you want instant AI-driven practice or authentic human feedback — both are available, on-demand.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">

          {/* AI Interview */}
          <div className="reveal-l group relative p-7 rounded-2xl border overflow-hidden transition-all duration-350 hover:-translate-y-1.5"
               style={{
                 background: 'linear-gradient(145deg,#0d1520,#111214)',
                 borderColor: 'rgba(0,210,255,.2)',
                 boxShadow: '0 0 48px rgba(0,210,255,.06)',
               }}
               onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 60px rgba(0,210,255,.16)'}
               onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 48px rgba(0,210,255,.06)'}
          >
            {/* AI avatar with orbit */}
            <div className="relative w-16 h-16 mb-5">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
                   style={{ background: 'linear-gradient(135deg,rgba(0,210,255,.2),rgba(124,58,237,.15))', border: '1px solid rgba(0,210,255,.3)', animation: 'float 5s ease-in-out infinite' }}>
                🤖
              </div>
              {/* Orbit rings */}
              <div className="absolute inset-[-6px] rounded-full border border-dashed border-cyan/20"
                   style={{ animation: 'orbitCW 6s linear infinite' }}/>
              <div className="absolute inset-[-14px] rounded-full border border-dashed border-cyan/10"
                   style={{ animation: 'orbitCCW 10s linear infinite' }}/>
            </div>

            <Badge variant="cyan" pulse>AI Powered · 24/7</Badge>

            <h3 className="font-display font-bold text-[1.5rem] text-t0 mt-3 mb-2">AI Interview</h3>
            <p className="text-t1 text-[14px] leading-relaxed mb-5">
              Practice anytime with our intelligent AI interviewer. It understands your role,
              asks adaptive follow-up questions, listens to your code walk-throughs, and delivers 
              instant comprehensive feedback with scored reports.
            </p>

            {/* Waveform */}
            <div className="flex items-end gap-[3px] h-8 mb-5">
              {Array.from({length:10}).map((_,i) => (
                <div key={i} className="wv" style={{ animationDelay: `${i * 0.07}s` }}/>
              ))}
              <span className="font-mono text-[11px] text-cyan ml-2 self-center">AI Speaking…</span>
            </div>

            <ul className="space-y-2.5 mb-6">
              {[
                'Unlimited sessions — no scheduling',
                'Adaptive questions based on your answers',
                'Instant scoring + detailed feedback report',
                'Role-specific banks: FE, BE, ML, Fullstack',
                'Voice + text response modes',
                'Behavioral & technical rounds both available',
              ].map(p => (
                <li key={p} className="flex items-start gap-2.5 text-[13px] text-t1">
                  <span className="text-cyan mt-0.5 flex-shrink-0">✦</span>
                  {p}
                </li>
              ))}
            </ul>

            <Button variant="glow" size="md" iconRight={<span>→</span>}>
              Start AI Interview Now
            </Button>
          </div>

          {/* Live Recruiter */}
          <div className="reveal-r group relative p-7 rounded-2xl border border-white/[.08] bg-bg2 overflow-hidden transition-all duration-350 hover:-translate-y-1.5 hover:border-white/[.16]">

            <div className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl mb-5 border border-white/[.08] bg-bg3"
                 style={{ animation: 'float 6s ease-in-out infinite .8s' }}>
              👨‍💼
            </div>

            <Badge variant="emerald" pulse>Live Human Recruiters</Badge>

            <h3 className="font-display font-bold text-[1.5rem] text-t0 mt-3 mb-2">Recruiter Interview</h3>
            <p className="text-t1 text-[14px] leading-relaxed mb-5">
              Book slots with senior engineers and hiring managers from top companies. Get genuine 
              feedback, insider tips on what interviewers look for, and build real connections 
              that could lead to direct referrals.
            </p>

            {/* Calendar slots preview */}
            <div className="p-4 rounded-xl bg-bg3 border border-white/[.06] mb-5">
              <div className="font-mono text-[10px] text-t3 tracking-widest uppercase mb-3">Available This Week</div>
              <div className="space-y-2">
                {[
                  { time: 'Today, 3:00 PM',    label: 'Frontend Mock',  available: true  },
                  { time: 'Tomorrow, 11:00 AM', label: 'System Design',  available: true  },
                  { time: 'Wed, 4:30 PM',       label: 'ML Interview',   available: false },
                ].map(s => (
                  <div key={s.time} className={`flex items-center justify-between px-3 py-2.5 rounded-lg border text-[13px] ${
                    s.available
                      ? 'bg-emerald/[.06] border-emerald/20'
                      : 'bg-bg4 border-white/[.05] opacity-50'
                  }`}>
                    <div>
                      <span className="font-display font-semibold text-t0">{s.time}</span>
                      <span className="ml-2 font-mono text-[11px] text-t2">{s.label}</span>
                    </div>
                    {s.available && (
                      <span className="font-mono text-[10px] text-emerald">Book →</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <ul className="space-y-2.5 mb-6">
              {[
                'Real engineers from Google, Amazon, Flipkart',
                'Authentic pressure — like actual interviews',
                'Written feedback report after every session',
                'Possibility of referral post-interview',
              ].map(p => (
                <li key={p} className="flex items-start gap-2.5 text-[13px] text-t1">
                  <span className="text-emerald mt-0.5 flex-shrink-0">✦</span>
                  {p}
                </li>
              ))}
            </ul>

            <Button variant="outline" size="md" iconRight={<span>→</span>}>
              Book a Session
            </Button>
          </div>
        </div>

        {/* Why PrepVerse is different */}
        <div className="mt-12 p-7 rounded-2xl border border-white/[.08] bg-bg2 reveal">
          <div className="font-display font-bold text-[1rem] text-t0 mb-5">
            How PrepVerse differs from LeetCode, InterviewBit & others
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: '🔗', title: 'All-in-One', desc: 'DSA + Interviews + Community in one place. No more switching between 5 platforms.' },
              { icon: '🇮🇳', title: 'India-Focused', desc: 'Built for Indian placements — company-specific sets for Zomato, Razorpay, Flipkart and more.' },
              { icon: '✅', title: 'Verified Profiles', desc: 'Interview scores and completion rates are verified, not self-reported. Recruiters trust the data.' },
              { icon: '🧠', title: 'Adaptive AI',       desc: 'Our AI interviewer adjusts difficulty in real time — unlike static question banks.' },
            ].map(d => (
              <div key={d.title} className="flex gap-3">
                <span className="text-xl flex-shrink-0">{d.icon}</span>
                <div>
                  <div className="font-display font-bold text-[13px] text-t0 mb-1">{d.title}</div>
                  <div className="text-t2 text-[12px] leading-relaxed">{d.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}