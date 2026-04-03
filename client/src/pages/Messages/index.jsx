import React, { useState } from 'react'
import { Navbar }             from '../../components/layout/Navbar'
import { useCanvasBg }        from '../../hooks/useCanvasBg'
import { useCursor }          from '../../hooks/useCursor'
import { ConversationList }   from './ConversationList'
import { ChatWindow }         from './ChatWindow'

const INIT_CONVOS = [
  { id:1, name:'Priya Sharma',  avatar:'PS', college:'IIT Delhi',    lastMsg:'Thanks for the tip on sliding window!', time:'2m',  unread:2, online:true  },
  { id:2, name:'Rahul Verma',   avatar:'RV', college:'NIT Trichy',   lastMsg:'Did you solve that DP problem yet?',    time:'1h',  unread:0, online:true  },
  { id:3, name:'Arjun Nair',    avatar:'AN', college:'Google SWE',   lastMsg:'Session recap: great improvement on system design.', time:'3h', unread:1, online:false },
  { id:4, name:'Ananya Singh',  avatar:'AS', college:'BITS Pilani',  lastMsg:'Congrats on the Razorpay offer!! 🎉',   time:'1d',  unread:0, online:false },
  { id:5, name:'Karan Mehta',   avatar:'KM', college:'IIT Bombay',   lastMsg:'Which resource do you use for graphs?', time:'2d',  unread:0, online:true  },
]

export default function MessagesPage() {
  useCanvasBg('msg-canvas')
  useCursor()

  const [convos,  setConvos]  = useState(INIT_CONVOS)
  const [activeId, setActiveId] = useState(1)

  const active = convos.find(c => c.id === activeId)

  const selectConvo = (id) => {
    setActiveId(id)
    setConvos(c => c.map(cv => cv.id === id ? { ...cv, unread:0 } : cv))
  }

  return (
    <div style={{ minHeight:'100vh', background:'#080909', color:'#f8fafc', fontFamily:'Geist,sans-serif' }}>
      <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;700&family=Geist:wght@300;400;500;600&display=swap" rel="stylesheet"/>
      <style>{`
        body{cursor:none}
        #cur-dot{width:5px;height:5px;border-radius:50%;background:#00d2ff;box-shadow:0 0 8px #00d2ff;position:fixed;top:0;left:0;pointer-events:none;z-index:9999}
        #cur-ring{width:28px;height:28px;border-radius:50%;border:1.5px solid rgba(0,210,255,.5);position:fixed;top:0;left:0;pointer-events:none;z-index:9998;transition:width .2s,height .2s}
        body.hov #cur-ring{width:44px;height:44px;border-color:rgba(124,58,237,.7);margin:-8px}
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-track{background:transparent} ::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:4px}
      `}</style>
      <canvas id="msg-canvas" style={{ position:'fixed',inset:0,zIndex:0,pointerEvents:'none' }}/>
      <div style={{ position:'relative', zIndex:1 }}>
        <Navbar/>
        <main style={{ maxWidth:1100, margin:'0 auto', padding:'100px 24px 60px' }}>
          <div style={{ display:'grid', gridTemplateColumns:'320px 1fr', gap:0, border:'1px solid rgba(255,255,255,.07)', borderRadius:18, overflow:'hidden', height:'calc(100vh - 200px)', minHeight:500 }}>
            <ConversationList convos={convos} activeId={activeId} onSelect={selectConvo}/>
            <ChatWindow convo={active}/>
          </div>
        </main>
      </div>
      <div id="cur-dot"/><div id="cur-ring"/>
    </div>
  )
}