import React, { useState, useEffect } from 'react'
import { Navbar } from '../../components/layout/Navbar'
import { useCanvasBg } from '../../hooks/useCanvasBg'
import { useCursor } from '../../hooks/useCursor'
import { ProfileHeader } from './ProfileHeader'
import { StatsGrid } from './StatsGrid'
import { BadgeShelf } from './BadgeShelf'
import { SolveHeatmap } from './SolveHeatmap'
import { ProjectsSection } from './ProfileSection'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { userService } from '../../api/userService'
import { useToast } from '../../components/ui/Toast'

export default function ProfilePage() {
  const toast = useToast()
  useCanvasBg('profile-canvas')
  useCursor()
  const { username } = useParams()
  const { user: me } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  // ✅ Added states
  const [projects, setProjects] = useState([])
  const [editingProjects, setEditingProjects] = useState(false)
  const [projectsSaving, setProjectsSaving] = useState(false)

  useEffect(() => {
    const id = username ?? me?._id
    if (!id) return
    userService.getProfile(id)
      .then(({ data }) => setProfile(data.data.user))
      .catch(() => toast('Profile not found', 'error'))
      .finally(() => setLoading(false))
  }, [username, me?._id])

  // ✅ Load projects
  useEffect(() => {
    if (!profile) return
    const isOwnProfile = profile._id === me?._id
    if (isOwnProfile) {
      userService.getProjects()
        .then(({ data }) => setProjects(data.data.projects ?? []))
        .catch(() => {})
    } else {
      setProjects(profile.projects ?? [])
    }
  }, [profile])

  // ✅ Save handler
  const saveProjects = async () => {
    setProjectsSaving(true)
    try {
      await userService.saveProjects({ projects })
      toast('Projects saved ✓', 'success')
      setEditingProjects(false)
    } catch {
      toast('Failed to save projects', 'error')
    } finally {
      setProjectsSaving(false)
    }
  }

  const addProject = () => setProjects(p => [...p, { name:'', description:'', stack:'', github:'', live:'' }])
  const updateProject = (i, field, val) => setProjects(p => p.map((x,idx) => idx===i ? { ...x, [field]:val } : x))
  const removeProject = (i) => setProjects(p => p.filter((_,idx) => idx!==i))

  if (loading) return <div style={{ minHeight: '100vh', background: '#080909' }} />
  if (!profile) return (
    <div style={{ minHeight: '100vh', background: '#080909', color: '#f8fafc', fontFamily: 'Geist,sans-serif' }}>
      <Navbar />
      <main style={{ maxWidth: 900, margin: '150px auto', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontWeight: 700, fontSize: 24 }}>Profile not found</h2>
      </main>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#080909', color: '#f8fafc', fontFamily: 'Geist,sans-serif' }}>
      <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;700&family=Geist:wght@300;400;500;600&display=swap" rel="stylesheet" />
      <style>{`
        body{cursor:none}
        #cur-dot{width:5px;height:5px;border-radius:50%;background:#00d2ff;box-shadow:0 0 8px #00d2ff;position:fixed;top:0;left:0;pointer-events:none;z-index:9999}
        #cur-ring{width:28px;height:28px;border-radius:50%;border:1.5px solid rgba(0,210,255,.5);position:fixed;top:0;left:0;pointer-events:none;z-index:9998;transition:width .2s,height .2s}
        body.hov #cur-ring{width:44px;height:44px;border-color:rgba(124,58,237,.7);margin:-8px}
      `}</style>

      <canvas id="profile-canvas" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <main style={{ maxWidth: 900, margin: '0 auto', padding: '100px 24px 60px' }}>
          <ProfileHeader profile={profile} />
          <StatsGrid profile={profile} />
          <BadgeShelf />
          <ProjectsSection 
            projects={projects}
            editing={editingProjects}
            setEditing={setEditingProjects}
            onAdd={addProject}
            onUpdate={updateProject}
            onRemove={removeProject}
            onSave={saveProjects}
            saving={projectsSaving}
          />
          <SolveHeatmap />
        </main>
      </div>
      <div id="cur-dot" /><div id="cur-ring" />
    </div>
  )
}