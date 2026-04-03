import React from 'react'
import { SectionLabel } from '../../components/ui/Atoms'
import { Button } from '../../components/ui/Button'

/* ── Community Section ───────────────────────────────────────── */
export function CommunitySection() {
  return (
    <section id="community" className="py-28 border-t border-white/[.06]">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Profile card visual */}
          <div className="reveal-l relative">
            {/* Main profile */}
            <div className="relative rounded-2xl bg-bg2 border border-white/[.09] p-6 shadow-2xl"
                 style={{ animation: 'float 7s ease-in-out infinite', boxShadow: '0 40px 80px rgba(0,0,0,.55)' }}>

              <div className="flex items-start gap-4 mb-5">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-xl flex-shrink-0"
                     style={{ background: 'linear-gradient(135deg,#00d2ff,#7c3aed)' }}>
                  🧑‍💻
                </div>
                <div>
                  <div className="font-display font-bold text-[1rem] text-t0">Aryan Sharma</div>
                  <div className="text-t2 text-[13px]">Frontend Developer · B.Tech CSE '25</div>
                  <div className="flex gap-2 mt-2">
                    {['React', 'TypeScript', 'DSA'].map(s => (
                      <span key={s} className="px-2 py-0.5 rounded-md bg-bg3 border border-white/[.07] font-mono text-[10px] text-t2">{s}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Progress */}
              {[
                { label: 'DSA',        val: 78, color: '#00d2ff' },
                { label: 'Frontend',   val: 91, color: '#10b981' },
                { label: 'Interviews', val: 65, color: '#7c3aed' },
              ].map(({ label, val, color }) => (
                <div key={label} className="mb-3">
                  <div className="flex justify-between font-mono text-[11px] text-t2 mb-1">
                    <span>{label}</span>
                    <span style={{color}}>{val}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-bg4 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${val}%`, background: `linear-gradient(90deg,${color}99,${color})` }}/>
                  </div>
                </div>
              ))}

              <div className="flex gap-4 mt-4 pt-4 border-t border-white/[.06]">
                {[['24', 'Sessions'], ['88', 'Avg Score'], ['🔥14', 'Day Streak']].map(([n, l]) => (
                  <div key={l} className="text-center">
                    <div className="font-display font-bold text-[1rem] text-t0">{n}</div>
                    <div className="font-mono text-[10px] text-t2">{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating mini cards */}
            <div className="absolute -bottom-4 -right-6 p-3.5 rounded-xl bg-bg2 border border-emerald/25 shadow-xl"
                 style={{ animation: 'float 5s ease-in-out infinite 1s' }}>
              <div className="font-mono text-[10px] text-t3 mb-1">RECRUITER VIEW</div>
              <div className="font-display font-bold text-[13px] text-emerald">Profile Viewed ✓</div>
            </div>

            <div className="absolute -top-4 -left-6 p-3.5 rounded-xl bg-bg2 border border-cyan/25 shadow-xl"
                 style={{ animation: 'float 6s ease-in-out infinite .5s' }}>
              <div className="font-mono text-[10px] text-t3 mb-1">NEW MESSAGE</div>
              <div className="font-display font-bold text-[13px] text-cyan">Amazon Recruiter →</div>
            </div>
          </div>

          {/* Text */}
          <div className="reveal-r">
            <SectionLabel>🌐 Community + Recruiter Portal</SectionLabel>
            <h2 className="font-display font-bold tracking-tight mt-1 mb-4"
                style={{ fontSize: 'clamp(1.7rem,3vw,2.5rem)' }}>
              Your Profile is Your <span className="grad-text">New Resume</span>
            </h2>
            <p className="text-t1 text-[15px] leading-relaxed mb-8">
              Every problem you solve and interview you clear builds a live, verifiable profile that 
              recruiters can discover and trust. No more blank CVs or unverified claims.
            </p>

            {[
              ['🔍', 'Search & Discover', 'Find peers, seniors and collaborators by name, skill, college or company — LinkedIn-style.'],
              ['💬', 'Direct Messaging',   'DM anyone on the platform. Share resources, ask questions, collaborate on problems.'],
              ['📊', 'Recruiter Dashboard','Search candidates by role, filter by verified interview scores, message the best directly.'],
              ['🏆', 'Verified Progress',  'Interview scores and completion data are real and uneditable — recruiters trust what they see.'],
            ].map(([icon, title, desc]) => (
              <div key={title} className="flex gap-4 mb-5">
                <div className="w-9 h-9 flex-shrink-0 rounded-lg flex items-center justify-center bg-bg3 border border-white/[.07] text-base">
                  {icon}
                </div>
                <div>
                  <div className="font-display font-semibold text-[14px] text-t0 mb-0.5">{title}</div>
                  <div className="text-t2 text-[13px] leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}

            <div className="flex gap-3 flex-wrap mt-2">
              <Button variant="primary" iconRight={<span>→</span>}>Explore Community</Button>
              <Button variant="ghost">Recruiter Portal</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Testimonials ────────────────────────────────────────────── */
const testis = [
  {
    stars: 5, color: 'linear-gradient(135deg,#00d2ff,#7c3aed)', initials: 'R',
    quote: "PrepVerse's AI gave me feedback on things I never noticed — like not explaining edge cases before coding. After 3 weeks I cracked my Google SWE L4.",
    name: 'Rahul Verma', role: 'SWE L4 @ Google · Frontend Track',
  },
  {
    stars: 5, color: 'linear-gradient(135deg,#10b981,#00d2ff)', initials: 'P',
    quote: "The recruiter portal is brilliant. PrepVerse profiles show real interview scores, not polished LinkedIn bios. Found 3 of my best hires here.",
    name: 'Priya Mehta', role: 'Engineering Manager @ Flipkart',
  },
  {
    stars: 5, color: 'linear-gradient(135deg,#f59e0b,#f43f5e)', initials: 'A',
    quote: "Domain-specific ML prep was exactly what I was missing. 47 ML interview-style questions with proper explanations. Got into Amazon ML team in 6 weeks.",
    name: 'Aisha Khan', role: 'ML Engineer @ Amazon · ML Track',
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-28 border-t border-white/[.06]" style={{ background: '#0c0d0e' }}>
      <div className="max-w-[1280px] mx-auto px-6">

        <div className="text-center mb-14 reveal">
          <SectionLabel>💬 Success Stories</SectionLabel>
          <h2 className="font-display font-bold tracking-tight mb-3"
              style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)' }}>
            Placed at <span className="grad-text">Top Companies</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {testis.map((t, i) => (
            <div key={t.name} className={`reveal d${i+1} p-6 rounded-2xl bg-bg2 border border-white/[.07] transition-all duration-300 hover:-translate-y-1.5 hover:border-white/[.14]`}>
              <div className="flex gap-0.5 mb-4">
                {Array.from({length:t.stars}).map((_,j)=>(
                  <span key={j} className="text-amber text-[13px]">★</span>
                ))}
              </div>
              <p className="text-t1 text-[13px] leading-relaxed mb-5 italic">
                <span className="text-cyan text-[1.4rem] leading-none not-italic">"</span>
                {t.quote}
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/[.06]">
                <div className="w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-[14px] flex-shrink-0"
                     style={{ background: t.color }}>
                  {t.initials}
                </div>
                <div>
                  <div className="font-display font-bold text-[13px] text-t0">{t.name}</div>
                  <div className="font-mono text-[11px] text-t2">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Company logos */}
        <div className="text-center reveal">
          <div className="font-mono text-[10px] text-t3 tracking-widest uppercase mb-5">Our users work at</div>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-30">
            {['Google','Amazon','Microsoft','Meta','Flipkart','Zomato','Razorpay','Zepto','CRED','Meesho'].map(c => (
              <span key={c} className="font-display font-black text-[1rem] text-t0">{c}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── CTA Section ─────────────────────────────────────────────── */
export function CTASection() {
  return (
    <section className="relative py-36 overflow-hidden border-t border-white/[.06]">
      {/* BG */}
      <div className="absolute inset-0 pointer-events-none"
           style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%,rgba(0,210,255,.07) 0%,transparent 65%)' }}/>
      <div className="absolute inset-0 pointer-events-none"
           style={{
             backgroundImage: 'linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px)',
             backgroundSize: '40px 40px',
             maskImage: 'radial-gradient(ellipse 70% 80% at 50% 50%,black,transparent)',
           }}/>

      {/* Orbit rings */}
      {[280, 420, 560].map((s, i) => (
        <div key={s} className="absolute top-1/2 left-1/2 rounded-full border border-cyan/[.06] pointer-events-none"
             style={{
               width: s, height: s,
               marginLeft: -s/2, marginTop: -s/2,
               animation: `${i % 2 === 0 ? 'orbitCW' : 'orbitCCW'} ${20 + i * 8}s linear infinite`,
             }}/>
      ))}

      <div className="relative z-10 max-w-[700px] mx-auto px-6 text-center reveal">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[.03] border border-white/[.07] font-mono text-[10px] text-t2 tracking-widest uppercase mb-6">
          🚀 Free to start — no credit card
        </div>
        <h2 className="font-display font-bold tracking-tight mb-5"
            style={{ fontSize: 'clamp(2.2rem,4.5vw,3.8rem)', lineHeight: 1.05 }}>
          Your Next Offer<br/>
          <span className="grad-text">Starts Today</span>
        </h2>
        <p className="text-t1 text-[15px] leading-relaxed mb-8 max-w-[480px] mx-auto">
          Join 12,000+ students already preparing smarter. Full access to DSA practice,
          AI interviews and community features — free forever on core features.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button variant="primary" size="lg" iconRight={<span>→</span>}>Create Free Account</Button>
          <Button variant="ghost" size="lg">Explore as Recruiter</Button>
        </div>
        <p className="font-mono text-[11px] text-t3 mt-5 tracking-wide">No credit card · Core features free forever · Join in 30 seconds</p>
      </div>
    </section>
  )
}

/* ── Footer ──────────────────────────────────────────────────── */
export function Footer() {
  const cols = [
    { title: 'Platform',  links: ['DSA Practice','AI Interviews','Live Sessions','Written Q&A','Community'] },
    { title: 'Tracks',    links: ['Frontend Dev','Backend Dev','Fullstack Dev','ML Engineer','DSA Mastery'] },
    { title: 'Company',   links: ['About','Blog','Careers','Recruiter Portal','Privacy','Terms'] },
  ]

  return (
    <footer className="border-t border-white/[.06] pt-14 pb-8">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          <div>
            <a href="/" className="flex items-center gap-2.5 mb-4 cursor-none">
              <svg width="26" height="26" viewBox="0 0 30 30" fill="none">
                <polygon points="15,2 28,26 2,26" stroke="url(#fl)" strokeWidth="2" fill="none"/>
                <polygon points="15,10 22,22 8,22" fill="url(#fl)" opacity=".35"/>
                <defs><linearGradient id="fl" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#00d2ff"/><stop offset="100%" stopColor="#7c3aed"/></linearGradient></defs>
              </svg>
              <span className="font-display font-bold text-[1.05rem] text-t0">Prep<span className="text-cyan">Verse</span></span>
            </a>
            <p className="text-t2 text-[13px] leading-relaxed mb-5">
              The complete placement preparation platform for engineering students and tech professionals.
            </p>
            <div className="flex gap-2">
              {['𝕏','in','GH','YT'].map(s => (
                <a key={s} href="#" className="w-8 h-8 rounded-lg flex items-center justify-center bg-bg3 border border-white/[.07] font-mono text-[11px] text-t2 hover:text-t0 hover:border-white/[.14] transition-all cursor-none">
                  {s}
                </a>
              ))}
            </div>
          </div>

          {cols.map(col => (
            <div key={col.title}>
              <div className="font-mono text-[10px] text-t3 tracking-widest uppercase mb-4">{col.title}</div>
              <ul className="space-y-2.5">
                {col.links.map(l => (
                  <li key={l}>
                    <a href="#" className="text-t2 text-[13px] hover:text-t0 transition-colors cursor-none">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-white/[.06] gap-3">
          <span className="font-mono text-[11px] text-t3">© 2025 PrepVerse. All rights reserved.</span>
          <span className="font-mono text-[11px] text-t3 flex items-center gap-1.5">
            Built with <span className="text-rose">♥</span> for tech dreamers
          </span>
        </div>
      </div>
    </footer>
  )
}