import React, { useState } from 'react'
import { Navbar }          from '../../components/layout/Navbar'
import { useCanvasBg }     from '../../hooks/useCanvasBg'
import { useCursor }       from '../../hooks/useCursor'
import { WelcomeBanner }   from './WelcomeBanner'
import { ProgressRings }   from './ProgressRings'
import { StreakCalendar }  from './StreakCalendar'
import { RecommendedCard } from './RecommendedCard'
import { ActivityFeed }    from './ActivityFeed'
import { QuickActions }    from './QuickActions'

export default function DashboardPage() {
  useCanvasBg('dash-canvas')
  useCursor()

  return (
    <div style={{ minHeight: '100vh', background: '#080909', color: '#f8fafc', fontFamily: 'Geist, sans-serif' }}>
      <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;700&family=Geist:wght@300;400;500;600&display=swap" rel="stylesheet"/>
      <style>{`
        body { cursor: none }
        #cur-dot  { width:5px;height:5px;border-radius:50%;background:#00d2ff;box-shadow:0 0 8px #00d2ff;position:fixed;top:0;left:0;pointer-events:none;z-index:9999 }
        #cur-ring { width:28px;height:28px;border-radius:50%;border:1.5px solid rgba(0,210,255,.5);position:fixed;top:0;left:0;pointer-events:none;z-index:9998;transition:width .2s,height .2s }
        body.hov #cur-ring { width:44px;height:44px;border-color:rgba(124,58,237,.7);margin:-8px }
      `}</style>

      <canvas id="dash-canvas" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}/>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar/>

        <main style={{ maxWidth: 1200, margin: '0 auto', padding: '100px 24px 60px' }}>

          <WelcomeBanner name="Aryan" streak={14}/>

          {/* Top row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, marginTop: 28 }}>
            <ProgressRings/>
            <StreakCalendar/>
            <QuickActions/>
          </div>

          {/* Bottom row */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20, marginTop: 20 }}>
            <ActivityFeed/>
            <RecommendedCard/>
          </div>

        </main>
      </div>

      <div id="cur-dot"/><div id="cur-ring"/>
    </div>
  )
}