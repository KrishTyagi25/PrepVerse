import { Button } from '../../components/ui/Button'
import { useAuth } from '../../context/AuthContext'
import { useParams } from 'react-router-dom'

export function ProjectsSection({ projects, editing, setEditing, onAdd, onUpdate, onRemove, onSave, saving }) {
  const { user: me }   = useAuth()
  const { username }   = useParams()
  const isOwnProfile   = !username || username === me?._id

  return (
    <div style={{ marginTop:20 }}>

      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
        <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:15, color:'#f8fafc' }}>
          Projects
        </div>
        {isOwnProfile && (
          <div style={{ display:'flex', gap:8 }}>
            {editing ? (
              <>
                <Button variant="primary" size="sm" onClick={onSave} disabled={saving}>
                  {saving ? 'Saving…' : 'Save'}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setEditing(false)}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => setEditing(true)}>
                ✏️ Edit
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Edit mode */}
      {editing ? (
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {projects.map((proj, i) => (
            <div key={i} style={{ padding:16, borderRadius:12, background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.07)', position:'relative' }}>
              
              {/* Remove button */}
              <button
                onClick={() => onRemove(i)}
                style={{ position:'absolute', top:10, right:10, background:'rgba(244,63,94,.1)', border:'1px solid rgba(244,63,94,.2)', borderRadius:6, color:'#f43f5e', cursor:'pointer', width:24, height:24, fontSize:12 }}
              >✕</button>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                {[
                  ['name',   'Project name', 'PrepVerse'],
                  ['stack',  'Tech stack',   'React · Node.js'],
                  ['github', 'GitHub URL',   'github.com/...'],
                  ['live',   'Live URL',     'project.vercel.app'],
                ].map(([field, label, ph]) => (
                  <div key={field}>
                    <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#475569', textTransform:'uppercase', marginBottom:4 }}>
                      {label}
                    </div>
                    <input
                      value={proj[field] ?? ''}
                      onChange={e => onUpdate(i, field, e.target.value)}
                      placeholder={ph}
                      style={{ width:'100%', padding:'8px 10px', background:'#0d0e10', border:'1px solid rgba(255,255,255,.08)', borderRadius:7, outline:'none', fontFamily:'Geist,sans-serif', fontSize:13, color:'#f8fafc', boxSizing:'border-box' }}
                    />
                  </div>
                ))}

                {/* Description — full width */}
                <div style={{ gridColumn:'1/-1' }}>
                  <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#475569', textTransform:'uppercase', marginBottom:4 }}>
                    Description
                  </div>
                  <textarea
                    value={proj.description ?? ''}
                    onChange={e => onUpdate(i, 'description', e.target.value)}
                    rows={2}
                    placeholder="What it does, impact, scale"
                    style={{ width:'100%', padding:'8px 10px', background:'#0d0e10', border:'1px solid rgba(255,255,255,.08)', borderRadius:7, outline:'none', fontFamily:'Geist,sans-serif', fontSize:13, color:'#f8fafc', boxSizing:'border-box', resize:'vertical' }}
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Add project button */}
          <button
            onClick={onAdd}
            style={{ padding:'10px', borderRadius:10, border:'1px dashed rgba(0,210,255,.25)', background:'rgba(0,210,255,.04)', color:'#00d2ff', fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:600, fontSize:13, cursor:'pointer' }}
          >
            + Add project
          </button>
        </div>

      /* Empty state */
      ) : projects.length === 0 ? (
        <div style={{ padding:'24px', textAlign:'center', borderRadius:12, border:'1px dashed rgba(255,255,255,.07)' }}>
          <div style={{ fontSize:28, marginBottom:8 }}>🚀</div>
          <div style={{ fontFamily:'Geist,sans-serif', fontSize:13, color:'#475569' }}>
            {isOwnProfile ? 'No projects yet — click Edit to add your work' : 'No projects added yet'}
          </div>
        </div>

      /* View mode */
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          {projects.map((proj, i) => (
            <div key={i} style={{ padding:16, borderRadius:12, background:'rgba(255,255,255,.02)', border:'1px solid rgba(255,255,255,.07)' }}>
              <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:14, color:'#f8fafc', marginBottom:4 }}>
                {proj.name}
              </div>
              <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#7c3aed', marginBottom:8 }}>
                {proj.stack}
              </div>
              <div style={{ fontFamily:'Geist,sans-serif', fontSize:12, color:'#475569', lineHeight:1.6, marginBottom:10 }}>
                {proj.description}
              </div>
              <div style={{ display:'flex', gap:10 }}>
                {proj.github && (
                  <a href={`https://${proj.github}`} target="_blank" rel="noreferrer"
                    style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#00d2ff', textDecoration:'none' }}>
                    GitHub →
                  </a>
                )}
                {proj.live && (
                  <a href={`https://${proj.live}`} target="_blank" rel="noreferrer"
                    style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#10b981', textDecoration:'none' }}>
                    Live →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}