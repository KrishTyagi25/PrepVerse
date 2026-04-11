import React from 'react'

const TEMPLATES = {
  classic: { accent:'#1a56db', headerBg:'#1e3a5f', headerText:'#fff' },
  modern:  { accent:'#7c3aed', headerBg:'#2d1b69', headerText:'#fff' },
  minimal: { accent:'#111',    headerBg:'#f8fafc', headerText:'#111' },
}

export function ResumePreview({ resume: r, template = 'classic', large = false }) {
  const t = TEMPLATES[template]
  const scale = large ? 1 : 0.52

  return (
    <div style={{ borderRadius:12, overflow:'hidden', border:'1px solid rgba(255,255,255,.08)', boxShadow:'0 20px 60px rgba(0,0,0,.6)' }}>
      {/* Scale wrapper */}
      <div
        id="resume-preview-content"
        style={{ transformOrigin:'top left', transform:`scale(${scale})`, width:`${100/scale}%`, height:large ? 'auto' : `${860 * scale}px`, overflow: large ? 'visible' : 'hidden', background:'#fff', color:'#111', fontFamily:'Georgia, serif' }}
      >

        {/* Header */}
        <div style={{ background:t.headerBg, color:t.headerText, padding:'28px 32px 24px' }}>
          <h1 style={{ fontFamily:'Arial, sans-serif', fontWeight:700, fontSize:24, margin:'0 0 4px', letterSpacing:'-.01em' }}>{r.name}</h1>
          <div style={{ fontFamily:'Arial, sans-serif', fontSize:13, opacity:.85, marginBottom:12 }}>{r.title}</div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'6px 16px', fontFamily:'Arial, sans-serif', fontSize:11, opacity:.8 }}>
            {r.email     && <span>✉ {r.email}</span>}
            {r.phone     && <span>📞 {r.phone}</span>}
            {r.location  && <span>📍 {r.location}</span>}
            {r.linkedin  && <span>🔗 {r.linkedin}</span>}
            {r.github    && <span>⌥ {r.github}</span>}
            {r.portfolio && <span>🌐 {r.portfolio}</span>}
          </div>
        </div>

        <div style={{ padding:'20px 32px', lineHeight:1.5 }}>

          {/* Summary */}
          {r.summary && (
            <Section title="Summary" accent={t.accent}>
              <p style={{ fontSize:12, color:'#333', margin:0 }}>{r.summary}</p>
            </Section>
          )}

          {/* Experience */}
          {r.experience.length > 0 && (
            <Section title="Experience" accent={t.accent}>
              {r.experience.map((exp,i) => (
                <div key={i} style={{ marginBottom:12 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
                    <span style={{ fontFamily:'Arial,sans-serif', fontWeight:700, fontSize:13, color:'#111' }}>{exp.role}</span>
                    <span style={{ fontFamily:'Arial,sans-serif', fontSize:11, color:'#666' }}>{exp.duration}</span>
                  </div>
                  <div style={{ fontFamily:'Arial,sans-serif', fontSize:12, color:t.accent, fontWeight:600, marginBottom:4 }}>{exp.company}</div>
                  <ul style={{ margin:'4px 0 0', padding:'0 0 0 16px' }}>
                    {exp.bullets.filter(Boolean).map((b,bi) => <li key={bi} style={{ fontSize:11.5, color:'#333', marginBottom:2 }}>{b}</li>)}
                  </ul>
                </div>
              ))}
            </Section>
          )}

          {/* Education */}
          {r.education.length > 0 && (
            <Section title="Education" accent={t.accent}>
              {r.education.map((edu,i) => (
                <div key={i} style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                  <div>
                    <div style={{ fontFamily:'Arial,sans-serif', fontWeight:700, fontSize:13, color:'#111' }}>{edu.college}</div>
                    <div style={{ fontFamily:'Arial,sans-serif', fontSize:12, color:'#555' }}>{edu.degree} {edu.gpa && `· CGPA: ${edu.gpa}`}</div>
                  </div>
                  <div style={{ fontFamily:'Arial,sans-serif', fontSize:11, color:'#666', flexShrink:0 }}>{edu.year}</div>
                </div>
              ))}
            </Section>
          )}

          {/* Projects */}
          {r.projects.length > 0 && (
            <Section title="Projects" accent={t.accent}>
              {r.projects.map((proj,i) => (
                <div key={i} style={{ marginBottom:10 }}>
                  <div style={{ display:'flex', alignItems:'baseline', gap:8, marginBottom:2 }}>
                    <span style={{ fontFamily:'Arial,sans-serif', fontWeight:700, fontSize:13, color:'#111' }}>{proj.name}</span>
                    <span style={{ fontFamily:'Arial,sans-serif', fontSize:10, color:t.accent }}>{proj.stack}</span>
                    {proj.github && <span style={{ fontFamily:'Arial,sans-serif', fontSize:10, color:'#888' }}>| {proj.github}</span>}
                    {proj.live && <span style={{ fontFamily:'Arial,sans-serif', fontSize:10, color:'#888' }}>| {proj.live}</span>}
                  </div>
                  <p style={{ fontFamily:'Arial,sans-serif', fontSize:11.5, color:'#333', margin:0 }}>{proj.desc}</p>
                </div>
              ))}
            </Section>
          )}

          {/* Skills */}
          <Section title="Skills" accent={t.accent}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4px 20px' }}>
              {Object.entries(r.skills).map(([key, vals]) => vals.length > 0 && (
                <div key={key}>
                  <span style={{ fontFamily:'Arial,sans-serif', fontWeight:700, fontSize:11, color:'#111', textTransform:'capitalize' }}>{key}: </span>
                  <span style={{ fontFamily:'Arial,sans-serif', fontSize:11, color:'#444' }}>{vals.join(', ')}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* Achievements */}
          {r.achievements.length > 0 && (
            <Section title="Achievements" accent={t.accent}>
              {r.achievements.filter(Boolean).map((a,i) => (
                <div key={i} style={{ fontFamily:'Arial,sans-serif', fontSize:11.5, color:'#333', marginBottom:4 }}>• {a}</div>
              ))}
            </Section>
          )}
        </div>
      </div>
    </div>
  )
}

function Section({ title, accent, children }) {
  return (
    <div style={{ marginBottom:16 }}>
      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
        <span style={{ fontFamily:'Arial,sans-serif', fontWeight:700, fontSize:13, color:accent, textTransform:'uppercase', letterSpacing:'.06em' }}>{title}</span>
        <div style={{ flex:1, height:1.5, background:accent, opacity:.3 }}/>
      </div>
      {children}
    </div>
  )
}