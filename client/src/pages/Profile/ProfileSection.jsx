import React, { useState } from 'react'
import { GlassCard }      from '../../components/ui/Atoms'
import { Badge }          from '../../components/ui/Atoms'
import { Button }         from '../../components/ui/Button'
import { ProjectCard }    from './ProjectCard'
import { AddProjectModal }from './AddProjectModal'

const INIT_PROJECTS = [
  { id:1, name:'PrepVerse',      desc:'Full-stack interview prep platform. Built with React, Node.js, and MongoDB.',           stack:['React','Node.js','MongoDB','TailwindCSS'], github:'https://github.com', live:'https://prepverse.vercel.app', stars:48, status:'In Progress' },
  { id:2, name:'TaskFlow',       desc:'Real-time collaborative task manager with drag-and-drop and Socket.io notifications.', stack:['React','Express','Socket.io','PostgreSQL'], github:'https://github.com', live:'https://taskflow.vercel.app',  stars:23, status:'Live' },
  { id:3, name:'AlgoVisualizer', desc:'Interactive visualizer for 15+ sorting and graph algorithms. Used by 2k+ students.',  stack:['React','D3.js','Framer Motion'],             github:'https://github.com', live:null,                            stars:87, status:'Live' },
]

export function ProjectsSection() {
  const [projects,  setProjects]  = useState(INIT_PROJECTS)
  const [addModal,  setAddModal]  = useState(false)

  const addProject = (p) => setProjects(prev => [{ ...p, id: Date.now(), stars:0, status:'In Progress' }, ...prev])

  return (
    <div style={{ marginBottom:20 }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <h2 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:'1.2rem', letterSpacing:'-.02em', margin:0 }}>Projects</h2>
          <Badge variant="ghost">{projects.length}</Badge>
        </div>
        <Button variant="outline" size="sm" onClick={() => setAddModal(true)}>+ Add project</Button>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:14 }}>
        {projects.map(p => <ProjectCard key={p.id} project={p}/>)}
      </div>

      <AddProjectModal open={addModal} onClose={() => setAddModal(false)} onAdd={addProject}/>
    </div>
  )
}