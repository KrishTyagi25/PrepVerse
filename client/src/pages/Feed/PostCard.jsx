import React, { useState } from 'react'
import { GlassCard }  from '../../components/ui/Atoms'
import { DiffBadge }  from '../../components/ui/Atoms'
import { Button }     from '../../components/ui/Button'

const TYPE_META = {
  post:      { icon:'✍️', label:'shared an update',     color:'#475569'  },
  solved:    { icon:'✅', label:'solved a problem',     color:'#10b981'  },
  badge:     { icon:'🏅', label:'earned a badge',       color:'#f59e0b'  },
  interview: { icon:'🤖', label:'completed an interview',color:'#7c3aed' },
  project:   { icon:'🚀', label:'shipped a project',    color:'#00d2ff'  },
}

export function PostCard({ post, onLike }) {
  const [showComments, setShowComments] = useState(false)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const meta = TYPE_META[post.type] ?? TYPE_META.post

  const submitComment = () => {
    if (!comment.trim()) return
    setComments(c => [...c, { author:'You', text: comment }])
    setComment('')
  }

  return (
    <GlassCard hover={false} className="p-5" style={{ animation:'fadeUp .3s ease' }}>
      {/* Header */}
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:12 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:40, height:40, borderRadius:'50%', background:'linear-gradient(135deg,rgba(0,210,255,.2),rgba(124,58,237,.2))', border:'1.5px solid rgba(0,210,255,.2)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:13, color:'#00d2ff', flexShrink:0, cursor:'pointer' }}>{post.author.avatar}</div>
          <div>
            <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:14, color:'#f8fafc', cursor:'pointer' }}>{post.author.name}</div>
            <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#475569' }}>{post.author.college} · {post.author.role} · {post.time}</div>
          </div>
        </div>
        <Button variant="ghost" size="sm">Connect +</Button>
      </div>

      {/* Type label */}
      <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:10 }}>
        <span style={{ fontSize:14 }}>{meta.icon}</span>
        <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color: meta.color }}>{post.author.name.split(' ')[0]} {meta.label}</span>
        {post.diff      && <DiffBadge level={post.diff}/>}
        {post.score     && <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#7c3aed', background:'rgba(124,58,237,.1)', border:'1px solid rgba(124,58,237,.25)', borderRadius:4, padding:'1px 7px' }}>{post.score}/100</span>}
      </div>

      {/* Content */}
      <p style={{ fontFamily:'Geist,sans-serif', fontSize:14, color:'#94a3b8', lineHeight:1.7, marginBottom:12 }}>{post.content}</p>

      {/* Badge pill */}
      {post.badge && (
        <div style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'6px 14px', borderRadius:999, background:'rgba(245,158,11,.1)', border:'1px solid rgba(245,158,11,.3)', fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:12, color:'#f59e0b', marginBottom:12 }}>
          {post.badge}
        </div>
      )}

      {/* Project link */}
      {post.projectName && (
        <a href={post.projectUrl} target="_blank" rel="noreferrer" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'8px 14px', borderRadius:10, background:'rgba(0,210,255,.06)', border:'1px solid rgba(0,210,255,.2)', textDecoration:'none', marginBottom:12 }}>
          <span style={{ fontSize:16 }}>🔗</span>
          <div>
            <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:13, color:'#00d2ff' }}>{post.projectName}</div>
            <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#475569' }}>View project →</div>
          </div>
        </a>
      )}

      {/* Actions */}
      <div style={{ display:'flex', gap:4, paddingTop:10, borderTop:'1px solid rgba(255,255,255,.05)' }}>
        <button onClick={onLike} style={{ display:'flex', alignItems:'center', gap:5, padding:'6px 12px', borderRadius:8, border:'none', background: post.liked ? 'rgba(0,210,255,.1)' : 'transparent', cursor:'pointer', transition:'all .15s', fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:600, fontSize:12, color: post.liked ? '#00d2ff' : '#475569' }}>
          {post.liked ? '♥' : '♡'} {post.likes}
        </button>
        <button onClick={() => setShowComments(c => !c)} style={{ display:'flex', alignItems:'center', gap:5, padding:'6px 12px', borderRadius:8, border:'none', background:'transparent', cursor:'pointer', transition:'all .15s', fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:600, fontSize:12, color:'#475569' }}>
          💬 {post.comments + comments.length}
        </button>
        <button style={{ display:'flex', alignItems:'center', gap:5, padding:'6px 12px', borderRadius:8, border:'none', background:'transparent', cursor:'pointer', fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:600, fontSize:12, color:'#475569' }}>
          ↗ Share
        </button>
      </div>

      {/* Comments */}
      {showComments && (
        <div style={{ marginTop:12, paddingTop:12, borderTop:'1px solid rgba(255,255,255,.05)' }}>
          {comments.map((c,i) => (
            <div key={i} style={{ display:'flex', gap:8, marginBottom:8 }}>
              <div style={{ width:28, height:28, borderRadius:'50%', background:'rgba(0,210,255,.1)', border:'1px solid rgba(0,210,255,.2)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:10, color:'#00d2ff', flexShrink:0 }}>AS</div>
              <div style={{ padding:'7px 11px', borderRadius:8, background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.06)', fontFamily:'Geist,sans-serif', fontSize:13, color:'#94a3b8', flex:1 }}>{c.text}</div>
            </div>
          ))}
          <div style={{ display:'flex', gap:8, marginTop:8 }}>
            <input value={comment} onChange={e => setComment(e.target.value)} onKeyDown={e => e.key==='Enter' && submitComment()} placeholder="Add a comment…" style={{ flex:1, padding:'8px 11px', background:'#111214', border:'1px solid rgba(255,255,255,.08)', borderRadius:8, outline:'none', fontFamily:'Geist,sans-serif', fontSize:13, color:'#f8fafc' }}/>
            <Button variant="ghost" size="sm" onClick={submitComment}>Post</Button>
          </div>
        </div>
      )}
    </GlassCard>
  )
}