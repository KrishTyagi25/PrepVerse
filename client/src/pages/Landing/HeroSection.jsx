import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../../components/ui/Button'
import { Badge }  from '../../components/ui/Atoms'

/* ── Journey Animation (left side) ──────────────────────────── */
function JourneyAnimation() {
  const [step, setStep]     = useState(0)
  const [typed, setTyped]   = useState('')
  const [showOffer, setShowOffer] = useState(null)

  const stages = [
    { label: 'DSA Practice',    icon: '🧩', color: '#00d2ff', sub: 'Two Sum → solved ✓',    lang: 'js'  },
    { label: 'AI Interview',    icon: '🤖', color: '#7c3aed', sub: 'Score: 94/100',          lang: 'py'  },
    { label: 'Mock Interview',  icon: '👨‍💼', color: '#10b981', sub: 'Feedback received',      lang: null  },
    { label: 'Offer Received!', icon: '🎉', color: '#f59e0b', sub: null,                      lang: null  },
  ]

  const offers = [
    { company: 'Google',    role: 'SWE L4',          pkg: '₹42 LPA',  color: '#4285F4' },
    { company: 'Amazon',    role: 'SDE II',           pkg: '₹38 LPA',  color: '#FF9900' },
    { company: 'Microsoft', role: 'SDE 2',            pkg: '₹35 LPA',  color: '#00A4EF' },
    { company: 'Meta',      role: 'E4 Engineer',      pkg: '₹45 LPA',  color: '#1877F2' },
    { company: 'Apple',     role: 'Senior iOS Dev',   pkg: '₹40 LPA',  color: '#A2AAAD' },
  ]

  const codeSnippets = {
    js: [
      'function twoSum(nums, target) {',
      '  const map = new Map()',
      '  for (let i = 0; i < nums.length; i++) {',
      '    const diff = target - nums[i]',
      '    if (map.has(diff)) return [map.get(diff), i]',
      '    map.set(nums[i], i)    // O(n) ✓',
      '  }',
      '}',
    ],
    py: [
      'def maxProfit(prices):',
      '    min_p, max_p = float("inf"), 0',
      '    for p in prices:',
      '        min_p  = min(min_p, p)',
      '        max_p  = max(max_p, p - min_p)',
      '    return max_p  # O(n) time ✓',
    ],
  }

  // Step auto-advance
  useEffect(() => {
    const timers = []
    const next = (s, delay) => timers.push(setTimeout(() => setStep(s), delay))
    next(1, 2200)
    next(2, 5000)
    next(3, 7800)
    next(4, 10500)

    // Show offer letters at step 4
    timers.push(setTimeout(() => {
      let i = 0
      const t = setInterval(() => {
        setShowOffer(i)
        i++
        if (i >= offers.length) clearInterval(t)
      }, 600)
      return () => clearInterval(t)
    }, 10800))

    // Reset loop
    const reset = setTimeout(() => {
      setStep(0); setTyped(''); setShowOffer(null)
    }, 18500)
    timers.push(reset)

    return () => timers.forEach(clearTimeout)
  // eslint-disable-next-line
  }, [showOffer === null && step === 0 ? 0 : undefined])

  // Typing animation
  useEffect(() => {
    const s = stages[Math.min(step, 2)]
    const lang = s?.lang
    if (!lang) return
    const lines = codeSnippets[lang].join('\n')
    let i = 0
    setTyped('')
    const t = setInterval(() => {
      setTyped(lines.slice(0, i))
      i += 3
      if (i > lines.length) clearInterval(t)
    }, 28)
    return () => clearInterval(t)
  // eslint-disable-next-line
  }, [step])

  const cur = stages[Math.min(step, 3)]

  return (
    <div className="relative w-full h-full flex flex-col gap-3 select-none">

      {/* Progress pipeline */}
      <div className="flex items-center gap-2 mb-1">
        {stages.map((s, i) => (
          <React.Fragment key={s.label}>
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[11px] font-display font-semibold transition-all duration-500 ${
              i <= step
                ? 'bg-bg3 border-white/[.14] text-t0'
                : 'bg-bg1 border-white/[.05] text-t3'
            }`} style={{ boxShadow: i === step ? `0 0 14px ${stages[i].color}40` : 'none' }}>
              <span>{s.icon}</span>
              <span className="hidden sm:inline">{s.label}</span>
            </div>
            {i < stages.length - 1 && (
              <div className={`flex-1 h-px transition-all duration-700 ${i < step ? 'bg-gradient-to-r from-cyan to-violet' : 'bg-white/[.06]'}`}/>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Main card */}
      <div className="relative flex-1 bg-bg2 rounded-2xl border border-white/[.08] overflow-hidden"
           style={{ boxShadow: `0 0 40px ${cur.color}18` }}>

        {/* Terminal bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-bg3 border-b border-white/[.06]">
          <span className="w-2.5 h-2.5 rounded-full bg-rose/70"/>
          <span className="w-2.5 h-2.5 rounded-full bg-amber/70"/>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald/70"/>
          <span className="flex-1 text-center font-mono text-[11px] text-t2">
            prepverse — {cur.label.toLowerCase()}
          </span>
          <Badge variant={step >= 3 ? 'emerald' : 'cyan'} pulse>
            {step >= 3 ? 'Complete' : 'Active'}
          </Badge>
        </div>

        {/* Scan line */}
        <div className="scan"/>

        {/* Content */}
        <div className="p-4 h-[calc(100%-44px)] overflow-hidden">
          {step < 2 && cur.lang && (
            <pre className="font-mono text-[12px] leading-relaxed text-t1 whitespace-pre-wrap">
              <span className="text-t3">// {stages[step].label}</span>{'\n'}
              {typed.split('\n').map((line, i) => (
                <div key={i}>
                  <span className="ln">{(i+1).toString().padStart(2,' ')}</span>{'  '}
                  <span dangerouslySetInnerHTML={{ __html: colorize(line) }}/>
                </div>
              ))}
              <span className="inline-block w-1.5 h-3.5 bg-cyan align-middle animate-pulse2 ml-0.5"/>
            </pre>
          )}

          {step === 2 && (
            <div className="space-y-3">
              <div className="font-display text-[13px] text-t2 mb-2">AI Feedback Report</div>
              {[
                ['Code Quality',   88, '#00d2ff'],
                ['Problem Approach', 94, '#10b981'],
                ['Communication',  82, '#7c3aed'],
                ['Time Complexity', 96, '#f59e0b'],
              ].map(([label, val, color]) => (
                <div key={label}>
                  <div className="flex justify-between font-mono text-[11px] text-t2 mb-1">
                    <span>{label}</span><span style={{color}}>{val}%</span>
                  </div>
                  <div className="h-1.5 bg-bg4 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${val}%`, background: color, transition: 'width 1s ease' }}/>
                  </div>
                </div>
              ))}
              <div className="mt-3 p-3 rounded-xl bg-bg3 border border-white/[.06]">
                <div className="font-mono text-[11px] text-emerald">✓ Great optimal solution approach</div>
                <div className="font-mono text-[11px] text-t2 mt-1">→ Work on explaining edge cases first</div>
              </div>
            </div>
          )}

          {step >= 3 && showOffer === null && (
            <div className="flex flex-col items-center justify-center h-full gap-3">
              <div className="text-4xl animate-float">🎉</div>
              <div className="font-display text-[15px] font-bold text-t0">Offer Letters Coming In...</div>
              <div className="font-mono text-[11px] text-t2">PrepVerse worked!</div>
            </div>
          )}
        </div>
      </div>

      {/* FAANG Offer Letters */}
      <div className="space-y-2">
        {offers.map((o, i) => (
          <div
            key={o.company}
            className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-500 ${
              showOffer !== null && i <= showOffer
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-8'
            }`}
            style={{
              background: `${o.color}0a`,
              borderColor: `${o.color}30`,
              transitionDelay: `${i * 80}ms`,
            }}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{
                { Google:'🔵', Amazon:'🟠', Microsoft:'🔷', Meta:'🔵', Apple:'⚪' }[o.company]
              }</span>
              <div>
                <div className="font-display text-[13px] font-bold text-t0">{o.company}</div>
                <div className="font-mono text-[10px] text-t2">{o.role}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-display text-[14px] font-bold" style={{color: o.color}}>{o.pkg}</div>
              <div className="font-mono text-[10px] text-emerald">Offer Received ✓</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function colorize(line) {
  return line
    .replace(/\/\/.*/g,        m => `<span class="cm">${m}</span>`)
    .replace(/\b(function|const|let|var|for|if|return|new|def|import|from|in|float)\b/g,
                                m => `<span class="kw">${m}</span>`)
    .replace(/\b([a-zA-Z]+)\s*\(/g, m => `<span class="fn">${m}</span>`)
    .replace(/"([^"]*)"/g,     m => `<span class="str">${m}</span>`)
    .replace(/'([^']*)'/g,     m => `<span class="str">${m}</span>`)
    .replace(/\b(\d+)\b/g,     m => `<span class="num">${m}</span>`)
}

/* ── Hero Section ────────────────────────────────────────────── */
export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">

      {/* BG grid */}
      <div className="absolute inset-0 pointer-events-none"
           style={{
             backgroundImage: 'linear-gradient(rgba(255,255,255,.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.022) 1px,transparent 1px)',
             backgroundSize: '56px 56px',
             maskImage: 'radial-gradient(ellipse 80% 80% at 50% 40%,black,transparent)',
             animation: 'gridGlow 5s ease-in-out infinite',
           }}/>

      {/* Glow orbs */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle,rgba(0,210,255,.09) 0%,transparent 65%)', animation: 'pulse2 9s ease-in-out infinite' }}/>
      <div className="absolute top-20 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle,rgba(124,58,237,.07) 0%,transparent 65%)', animation: 'pulse2 11s ease-in-out infinite 2s' }}/>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* LEFT — copy */}
          <div>
            {/* Tag */}
            <div className="flex items-center gap-2 mb-6 reveal d1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[.03] border border-white/[.07] font-mono text-[10px] text-t2 tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse2"/>
                Complete Placement Platform
              </span>
              <span className="inline-flex px-2.5 py-1 rounded-full bg-cyan/10 border border-cyan/25 font-mono text-[10px] text-cyan tracking-widest uppercase">
                Beta
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-bold leading-[1.05] tracking-tight mb-5 reveal d2"
                style={{ fontSize: 'clamp(2.4rem,4.5vw,3.8rem)' }}>
              Master Every<br/>
              <span className="grad-text">Interview.</span><br/>
              <span className="text-t1" style={{ fontSize: '.78em', fontWeight: 600 }}>Land Your Dream Job.</span>
            </h1>

            {/* Sub */}
            <p className="text-t1 text-[15px] leading-relaxed max-w-[520px] mb-8 reveal d3">
              PrepVerse is the only platform that combines <strong className="text-t0 font-medium">DSA practice</strong>,
              {' '}<strong className="text-t0 font-medium">AI-powered mock interviews</strong>,{' '}
              <strong className="text-t0 font-medium">live recruiter sessions</strong>, and a{' '}
              <strong className="text-t0 font-medium">LinkedIn-style community</strong> — all in one place, designed
              specifically for Indian tech placements.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 mb-10 reveal d4">
              <Button variant="primary" size="lg" iconRight={<span>→</span>}>
                Start Preparing Free
              </Button>
              <Button variant="ghost" size="lg" icon={<span>▶</span>}>
                Watch Demo
              </Button>
            </div>

            {/* Social proof */}
            <div className="flex flex-wrap items-center gap-6 reveal d5">
              {[
                { n: '12,000+', l: 'Active Learners' },
                { n: '500+',    l: 'DSA Problems' },
                { n: '98%',     l: 'Placement Rate' },
                { n: '24/7',    l: 'AI Available' },
              ].map(({ n, l }) => (
                <div key={l} className="text-center">
                  <div className="font-display font-bold text-[1.3rem] text-t0">{n}</div>
                  <div className="font-mono text-[10px] text-t2 tracking-wider uppercase">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Journey animation */}
          <div className="relative h-[580px] reveal-r d2">
            <JourneyAnimation />
          </div>
        </div>
      </div>
    </section>
  )
}