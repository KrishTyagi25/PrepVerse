import React, { useState } from 'react'
import { GlassCard }    from '../../components/ui/Atoms'
import { SectionBlock } from './SectionBlock'

export function ResumeEditor({ resume, update }) {
  const [openSection, setOpenSection] = useState('personal')

  const toggle = (id) => setOpenSection(s => s === id ? null : id)

  const addExperience = () => update('experience', [...resume.experience, { company:'', role:'', duration:'', bullets:[''] }])
  const updateExp = (i, field, val) => {
    const next = resume.experience.map((e,idx) => idx===i ? { ...e, [field]:val } : e)
    update('experience', next)
  }
  const removeExp = (i) => update('experience', resume.experience.filter((_,idx) => idx!==i))
  const addBullet = (i) => {
    const next = resume.experience.map((e,idx) => idx===i ? { ...e, bullets:[...e.bullets,''] } : e)
    update('experience', next)
  }
  const updateBullet = (ei, bi, val) => {
    const next = resume.experience.map((e,idx) => idx===ei ? { ...e, bullets: e.bullets.map((b,bidx) => bidx===bi ? val : b) } : e)
    update('experience', next)
  }
  const removeBullet = (ei, bi) => {
    const next = resume.experience.map((e,idx) => idx===ei ? { ...e, bullets: e.bullets.filter((_,bidx) => bidx!==bi) } : e)
    update('experience', next)
  }

  const addProject = () => update('projects', [...resume.projects, { name:'', stack:'', desc:'', github:'', live:'' }])
  const updateProj = (i, field, val) => update('projects', resume.projects.map((p,idx) => idx===i ? { ...p, [field]:val } : p))
  const removeProj = (i) => update('projects', resume.projects.filter((_,idx) => idx!==i))

  const addEdu = () => update('education', [...resume.education, { college:'', degree:'', year:'', gpa:'' }])
  const updateEdu = (i, field, val) => update('education', resume.education.map((e,idx) => idx===i ? { ...e, [field]:val } : e))
  const removeEdu = (i) => update('education', resume.education.filter((_,idx) => idx!==i))

  const addAchievement = () => update('achievements', [...resume.achievements, ''])
  const updateAchievement = (i, val) => update('achievements', resume.achievements.map((a,idx) => idx===i ? val : a))
  const removeAchievement = (i) => update('achievements', resume.achievements.filter((_,idx) => idx!==i))

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:12 }}>

      {/* Personal info */}
      <SectionBlock title="Personal info" icon="👤" open={openSection==='personal'} onToggle={() => toggle('personal')}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          {[['name','Full name','Aryan Sharma'],['title','Job title','Frontend Developer'],['email','Email','aryan@example.com'],['phone','Phone','+91 98765 43210'],['location','Location','Delhi, India'],['linkedin','LinkedIn','linkedin.com/in/aryan'],['github','GitHub','github.com/aryan'],['portfolio','Portfolio / website','aryan.dev']].map(([key,label,ph]) => (
            <EditorField key={key} label={label} value={resume[key]} placeholder={ph} onChange={v => update(key, v)} full={key==='name'||key==='title'}/>
          ))}
        </div>
        <div style={{ marginTop:12 }}>
          <EditorLabel>Summary</EditorLabel>
          <textarea value={resume.summary} onChange={e => update('summary', e.target.value)} rows={3}
            style={TA_STYLE}/>
        </div>
      </SectionBlock>

      {/* Experience */}
      <SectionBlock title="Experience" icon="💼" open={openSection==='experience'} onToggle={() => toggle('experience')}
        onAdd={addExperience} addLabel="+ Add experience">
        {resume.experience.map((exp, ei) => (
          <div key={ei} style={{ padding:'14px', borderRadius:10, background:'rgba(255,255,255,.025)', border:'1px solid rgba(255,255,255,.06)', marginBottom:10, position:'relative' }}>
            <RemoveBtn onClick={() => removeExp(ei)}/>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:10 }}>
              <EditorField label="Company"  value={exp.company}  placeholder="Startup XYZ" onChange={v => updateExp(ei,'company',v)}/>
              <EditorField label="Role"     value={exp.role}     placeholder="Frontend Intern" onChange={v => updateExp(ei,'role',v)}/>
              <EditorField label="Duration" value={exp.duration} placeholder="May 2024 – Aug 2024" onChange={v => updateExp(ei,'duration',v)} full/>
            </div>
            <EditorLabel>Bullet points <span style={{ color:'#1e293b', fontWeight:400 }}>(one per line — use action verbs)</span></EditorLabel>
            {exp.bullets.map((b,bi) => (
              <div key={bi} style={{ display:'flex', gap:6, marginBottom:6, alignItems:'flex-start' }}>
                <span style={{ color:'#475569', fontFamily:'JetBrains Mono,monospace', fontSize:14, paddingTop:10, flexShrink:0 }}>•</span>
                <input value={b} onChange={e => updateBullet(ei,bi,e.target.value)} placeholder="Built X that improved Y by Z%" style={{ ...INPUT_STYLE, flex:1 }}/>
                <button onClick={() => removeBullet(ei,bi)} style={REMOVE_INLINE_STYLE}>✕</button>
              </div>
            ))}
            <button onClick={() => addBullet(ei)} style={ADD_INLINE_STYLE}>+ Add bullet</button>
          </div>
        ))}
      </SectionBlock>

      {/* Education */}
      <SectionBlock title="Education" icon="🎓" open={openSection==='education'} onToggle={() => toggle('education')}
        onAdd={addEdu} addLabel="+ Add education">
        {resume.education.map((edu, i) => (
          <div key={i} style={{ padding:'14px', borderRadius:10, background:'rgba(255,255,255,.025)', border:'1px solid rgba(255,255,255,.06)', marginBottom:10, position:'relative' }}>
            <RemoveBtn onClick={() => removeEdu(i)}/>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
              <EditorField label="College"  value={edu.college} placeholder="Delhi Technological University" onChange={v => updateEdu(i,'college',v)} full/>
              <EditorField label="Degree"   value={edu.degree}  placeholder="B.Tech Computer Science"       onChange={v => updateEdu(i,'degree',v)} full/>
              <EditorField label="Year"     value={edu.year}    placeholder="2022 – 2026"                   onChange={v => updateEdu(i,'year',v)}/>
              <EditorField label="GPA/CGPA" value={edu.gpa}     placeholder="8.6 / 10"                     onChange={v => updateEdu(i,'gpa',v)}/>
            </div>
          </div>
        ))}
      </SectionBlock>

      {/* Projects */}
      <SectionBlock title="Projects" icon="🚀" open={openSection==='projects'} onToggle={() => toggle('projects')}
        onAdd={addProject} addLabel="+ Add project">
        {resume.projects.map((proj, i) => (
          <div key={i} style={{ padding:'14px', borderRadius:10, background:'rgba(255,255,255,.025)', border:'1px solid rgba(255,255,255,.06)', marginBottom:10, position:'relative' }}>
            <RemoveBtn onClick={() => removeProj(i)}/>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:10 }}>
              <EditorField label="Project name" value={proj.name}  placeholder="PrepVerse"          onChange={v => updateProj(i,'name',v)}/>
              <EditorField label="Tech stack"   value={proj.stack} placeholder="React · Node.js"   onChange={v => updateProj(i,'stack',v)}/>
              <EditorField label="GitHub URL"   value={proj.github}placeholder="github.com/you/project" onChange={v => updateProj(i,'github',v)}/>
              <EditorField label="Live URL"     value={proj.live}  placeholder="project.vercel.app"    onChange={v => updateProj(i,'live',v)}/>
            </div>
            <EditorLabel>Description</EditorLabel>
            <textarea value={proj.desc} onChange={e => updateProj(i,'desc',e.target.value)} rows={2} placeholder="What it does, impact, scale" style={TA_STYLE}/>
          </div>
        ))}
      </SectionBlock>

      {/* Skills */}
      <SectionBlock title="Skills" icon="⚡" open={openSection==='skills'} onToggle={() => toggle('skills')}>
        {[['languages','Languages'],['frameworks','Frameworks & Libraries'],['tools','Tools'],['databases','Databases']].map(([key,label]) => (
          <div key={key} style={{ marginBottom:12 }}>
            <EditorLabel>{label}</EditorLabel>
            <input
              value={resume.skills[key].join(', ')}
              onChange={e => update('skills', { ...resume.skills, [key]: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
              placeholder="Comma separated — React, Node.js, Python"
              style={INPUT_STYLE}
            />
          </div>
        ))}
      </SectionBlock>

      {/* Achievements */}
      <SectionBlock title="Achievements" icon="🏆" open={openSection==='achievements'} onToggle={() => toggle('achievements')}
        onAdd={addAchievement} addLabel="+ Add achievement">
        {resume.achievements.map((a,i) => (
          <div key={i} style={{ display:'flex', gap:6, marginBottom:8, alignItems:'center' }}>
            <input value={a} onChange={e => updateAchievement(i, e.target.value)} placeholder="🏆 Achievement — with measurable impact" style={{ ...INPUT_STYLE, flex:1 }}/>
            <button onClick={() => removeAchievement(i)} style={REMOVE_INLINE_STYLE}>✕</button>
          </div>
        ))}
      </SectionBlock>
    </div>
  )
}

/* ── Shared micro-components ── */
function EditorField({ label, value, onChange, placeholder, full }) {
  return (
    <div style={{ gridColumn: full ? '1/-1' : undefined }}>
      <EditorLabel>{label}</EditorLabel>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={INPUT_STYLE}/>
    </div>
  )
}

function EditorLabel({ children }) {
  return <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:11, fontWeight:700, letterSpacing:'.07em', textTransform:'uppercase', color:'#475569', marginBottom:5 }}>{children}</div>
}

function RemoveBtn({ onClick }) {
  return (
    <button onClick={onClick} style={{ position:'absolute', top:10, right:10, background:'rgba(244,63,94,.1)', border:'1px solid rgba(244,63,94,.25)', borderRadius:6, color:'#f43f5e', cursor:'pointer', width:24, height:24, display:'flex', alignItems:'center', justifyContent:'center', fontSize:12 }}>✕</button>
  )
}

const INPUT_STYLE = { width:'100%', padding:'8px 11px', background:'#0d0e10', border:'1px solid rgba(255,255,255,.08)', borderRadius:8, outline:'none', fontFamily:'Geist,sans-serif', fontSize:13, color:'#f8fafc', boxSizing:'border-box', transition:'border-color .2s' }
const TA_STYLE = { ...INPUT_STYLE, resize:'vertical', lineHeight:1.6 }
const REMOVE_INLINE_STYLE = { background:'none', border:'none', color:'#475569', cursor:'pointer', fontSize:13, padding:'0 2px', flexShrink:0 }
const ADD_INLINE_STYLE = { background:'none', border:'none', color:'#00d2ff', cursor:'pointer', fontFamily:'JetBrains Mono,monospace', fontSize:11, padding:'4px 0', marginTop:2 }