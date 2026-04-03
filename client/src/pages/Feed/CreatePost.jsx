import React, { useState } from 'react'
import { GlassCard } from '../../components/ui/Atoms'
import { Button }    from '../../components/ui/Button'

const POST_TYPES = [
  { id:'post',      icon:'✍️', label:'Update'    },
  { id:'solved',    icon:'✅', label:'Solved'    },
  { id:'badge',     icon:'🏅', label:'Badge'     },
  { id:'project',   icon:'🚀', label:'Project'   },
]

export function CreatePost({ onPost }) {
  const [open,    setOpen]    = useState(false)
  const [type,    setType]    = useState('post')
  const [content, setContent] = useState('')
  const [extra,   setExtra]   = useState('')  // badge name / project name / score

  const handleSubmit = () => {
    if (!content.trim()) return
    onPost({
      author: { name:'Aryan Sharma', college:'DTU', avatar:'AS', role:'Frontend' },
      type, content,
      ...(type === 'badge'     && { badge: extra || '🎯 Achievement' }),
      ...(type === 'project'   && { projectName: extra || 'My Project', projectUrl:'https://github.com' }),
      ...(type === 'interview' && { score: parseInt(extra) || 85 }),
      ...(type === 'solved'    && { diff: extra || 'Medium' }),
    })
    setContent(''); setExtra(''); setOpen(false)
  }

  return (
    <GlassCard hover={false} className="p-5">
      {!open ? (
        <div style={{ display:'flex', gap:12, alignItems:'center' }} onClick={() => setOpen(true)}>
          <div style={{ width:38, height:38, borderRadius:'50%', background:'linear-gradient(135deg,rgba(0,210,255,.2),rgba(124,58,237,.2))', border:'1.5px solid rgba(0,210,255,.2)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:13, color:'#00d2ff', flexShrink:0 }}>AS</div>
          <div style={{ flex:1, padding:'10px 14px', borderRadius:10, background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.06)', cursor:'text', fontFamily:'Geist,sans-serif', fontSize:14, color:'#1e293b' }}>
            Share an achievement, solved problem, or project…
          </div>
        </div>
      ) : (
        <div style={{ animation:'fadeUp .2s ease' }}>
          {/* Type selector */}
          <div style={{ display:'flex', gap:8, marginBottom:14 }}>
            {POST_TYPES.map(t => (
              <button key={t.id} onClick={() => setType(t.id)} style={{ display:'flex', alignItems:'center', gap:5, padding:'5px 12px', borderRadius:999, border:`1px solid ${type===t.id ? 'rgba(0,210,255,.4)' : 'rgba(255,255,255,.07)'}`, background: type===t.id ? 'rgba(0,210,255,.1)' : 'transparent', fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:600, fontSize:12, color: type===t.id ? '#00d2ff' : '#475569', cursor:'pointer', transition:'all .15s' }}>
                <span style={{ fontSize:13 }}>{t.icon}</span>{t.label}
              </button>
            ))}
          </div>

          {/* Extra field */}
          {type !== 'post' && (
            <input
              value={extra} onChange={e => setExtra(e.target.value)}
              placeholder={type==='badge' ? 'Badge name (e.g. 7-Day Streak)' : type==='project' ? 'Project name' : type==='solved' ? 'Difficulty (Easy/Medium/Hard)' : 'Score (e.g. 91)'}
              style={{ width:'100%', padding:'9px 12px', background:'#111214', border:'1px solid rgba(255,255,255,.08)', borderRadius:9, outline:'none', fontFamily:'Geist,sans-serif', fontSize:13, color:'#f8fafc', marginBottom:10, boxSizing:'border-box' }}
            />
          )}

          <textarea
            value={content} onChange={e => setContent(e.target.value)}
            placeholder="What's on your mind? Share your progress, a win, or a tip…"
            rows={4}
            style={{ width:'100%', padding:'11px 13px', background:'#111214', border:'1px solid rgba(255,255,255,.08)', borderRadius:10, outline:'none', fontFamily:'Geist,sans-serif', fontSize:14, color:'#f8fafc', resize:'none', lineHeight:1.6, boxSizing:'border-box', marginBottom:12 }}
          />
          <div style={{ display:'flex', justifyContent:'flex-end', gap:10 }}>
            <Button variant="ghost"   size="sm" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" size="sm" onClick={handleSubmit} disabled={!content.trim()}>Post →</Button>
          </div>
        </div>
      )}
    </GlassCard>
  )
}