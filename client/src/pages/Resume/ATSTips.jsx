import React from 'react'
import { GlassCard } from '../../components/ui/Atoms'

const CHECKS = [
  { id:'name',    label:'Name is clear and prominent',       check: r => r.name.length > 2 },
  { id:'email',   label:'Email address included',             check: r => r.email.includes('@') },
  { id:'phone',   label:'Phone number added',                 check: r => r.phone.length > 6 },
  { id:'summary', label:'Professional summary written',       check: r => r.summary.length > 40 },
  { id:'exp',     label:'At least one experience entry',      check: r => r.experience.some(e => e.company) },
  { id:'bullets', label:'Experience has action-verb bullets', check: r => r.experience.some(e => e.bullets.some(b => b.length > 15)) },
  { id:'proj',    label:'At least two projects listed',       check: r => r.projects.filter(p => p.name).length >= 2 },
  { id:'github',  label:'GitHub link on a project',           check: r => r.projects.some(p => p.github) },
  { id:'skills',  label:'Skills section has 8+ items',        check: r => Object.values(r.skills).flat().length >= 8 },
  { id:'edu',     label:'Education section complete',         check: r => r.education.some(e => e.college && e.degree) },
  { id:'achieve', label:'Achievements with measurable impact',check: r => r.achievements.some(a => a.length > 20) },
  { id:'contact', label:'LinkedIn or portfolio added',        check: r => r.linkedin.length > 5 || r.portfolio.length > 5 },
]

const TIPS = [
  { icon:'✅', title:'Use action verbs', desc:'Start every bullet with: Built, Designed, Improved, Reduced, Led, Implemented, Increased, Optimised' },
  { icon:'📊', title:'Quantify everything', desc:'Add numbers wherever possible — "Improved load time by 40%" beats "Made app faster"' },
  { icon:'🔑', title:'Match job keywords', desc:"Read the job description carefully. Mirror their exact keywords — ATS software scans for them before a human reads your resume" },
  { icon:'📄', title:'Keep it one page', desc:'For students and < 3 years experience, one page is the standard. Every line must earn its place' },
  { icon:'🚫', title:'No tables or columns', desc:"Many ATS systems can't parse multi-column layouts. Use a single-column format for guaranteed parsing" },
  { icon:'🔗', title:'Always include GitHub', desc:"Recruiters at product companies look at your GitHub. Link every project to its repo" },
  { icon:'🏆', title:'PrepVerse scores help', desc:'Add your PrepVerse score, streak, and interview scores. These are verified metrics recruiters trust' },
]

export function ATSTips({ resume }) {
  const passed = CHECKS.filter(c => c.check(resume)).length
  const pct    = Math.round((passed / CHECKS.length) * 100)
  const color  = pct >= 80 ? '#10b981' : pct >= 50 ? '#f59e0b' : '#f43f5e'

  return (
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24, alignItems:'start' }}>

      {/* ATS score */}
      <div>
        <GlassCard hover={false} className="p-6" style={{ marginBottom:16 }}>
          <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:14, color:'#f8fafc', marginBottom:20 }}>ATS compatibility score</div>

          {/* Score circle */}
          <div style={{ display:'flex', alignItems:'center', gap:20, marginBottom:20 }}>
            <div style={{ position:'relative', width:88, height:88, flexShrink:0 }}>
              <svg width="88" height="88" style={{ transform:'rotate(-90deg)' }}>
                <circle cx="44" cy="44" r="36" fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="7"/>
                <circle cx="44" cy="44" r="36" fill="none" stroke={color} strokeWidth="7"
                  strokeDasharray={`${(pct/100)*226} 226`} strokeLinecap="round"
                  style={{ transition:'stroke-dasharray 1s ease' }}
                />
              </svg>
              <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
                <span style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:22, color, lineHeight:1 }}>{pct}</span>
                <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9, color:'#475569' }}>/ 100</span>
              </div>
            </div>
            <div>
              <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:16, color, marginBottom:4 }}>
                {pct >= 80 ? 'ATS Ready' : pct >= 50 ? 'Needs work' : 'Needs attention'}
              </div>
              <div style={{ fontFamily:'Geist,sans-serif', fontSize:13, color:'#475569', lineHeight:1.6 }}>
                {passed} of {CHECKS.length} checks passed
              </div>
            </div>
          </div>

          {/* Checklist */}
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {CHECKS.map(c => {
              const ok = c.check(resume)
              return (
                <div key={c.id} style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <div style={{ width:20, height:20, borderRadius:'50%', background: ok ? 'rgba(16,185,129,.15)' : 'rgba(244,63,94,.1)', border:`1px solid ${ok ? 'rgba(16,185,129,.4)' : 'rgba(244,63,94,.3)'}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, flexShrink:0 }}>
                    {ok ? '✓' : '✕'}
                  </div>
                  <span style={{ fontFamily:'Geist,sans-serif', fontSize:13, color: ok ? '#94a3b8' : '#f8fafc', textDecoration: ok ? 'none' : 'none' }}>{c.label}</span>
                </div>
              )
            })}
          </div>
        </GlassCard>
      </div>

      {/* Tips */}
      <div>
        <GlassCard hover={false} className="p-6">
          <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:14, color:'#f8fafc', marginBottom:16 }}>Pro tips from recruiters</div>
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            {TIPS.map(t => (
              <div key={t.title} style={{ display:'flex', gap:12, padding:'12px', borderRadius:10, background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.06)' }}>
                <span style={{ fontSize:20, flexShrink:0 }}>{t.icon}</span>
                <div>
                  <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:13, color:'#f8fafc', marginBottom:3 }}>{t.title}</div>
                  <div style={{ fontFamily:'Geist,sans-serif', fontSize:12, color:'#475569', lineHeight:1.6 }}>{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  )
}