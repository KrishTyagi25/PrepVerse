import React, { useState } from 'react'
import { Navbar }              from '../../components/layout/Navbar'
import { useCanvasBg }         from '../../hooks/useCanvasBg'
import { useCursor }           from '../../hooks/useCursor'
import { SettingsSidebar }     from './SettingsSidebar'
import { AccountSection }      from './AccountSection'
import { NotificationsSection }from './NotificationsSection'
import { PrivacySection }      from './PrivacySection'

const SECTIONS = { account:'account', notifications:'notifications', privacy:'privacy' }

export default function SettingsPage() {
  useCanvasBg('settings-canvas')
  useCursor()
  const [active, setActive] = useState('account')

  return (
    <div style={{ minHeight:'100vh', background:'#080909', color:'#f8fafc', fontFamily:'Geist,sans-serif' }}>
      <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;700&family=Geist:wght@300;400;500;600&display=swap" rel="stylesheet"/>
      <style>{`
        body{cursor:none}
        #cur-dot{width:5px;height:5px;border-radius:50%;background:#00d2ff;box-shadow:0 0 8px #00d2ff;position:fixed;top:0;left:0;pointer-events:none;z-index:9999}
        #cur-ring{width:28px;height:28px;border-radius:50%;border:1.5px solid rgba(0,210,255,.5);position:fixed;top:0;left:0;pointer-events:none;z-index:9998;transition:width .2s,height .2s}
        body.hov #cur-ring{width:44px;height:44px;border-color:rgba(124,58,237,.7);margin:-8px}
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
      `}</style>

      <canvas id="settings-canvas" style={{ position:'fixed',inset:0,zIndex:0,pointerEvents:'none' }}/>
      <div style={{ position:'relative', zIndex:1 }}>
        <Navbar/>
        <main style={{ maxWidth:1000, margin:'0 auto', padding:'100px 24px 60px', display:'grid', gridTemplateColumns:'220px 1fr', gap:28, alignItems:'start' }}>
          <SettingsSidebar active={active} onChange={setActive}/>
          <div style={{ animation:'fadeUp .3s ease' }} key={active}>
            {active === 'account'       && <AccountSection/>}
            {active === 'notifications' && <NotificationsSection/>}
            {active === 'privacy'       && <PrivacySection/>}
          </div>
        </main>
      </div>
      <div id="cur-dot"/><div id="cur-ring"/>
    </div>
  )
}