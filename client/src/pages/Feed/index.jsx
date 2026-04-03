import React, { useState } from 'react'
import { Navbar }       from '../../components/layout/Navbar'
import { useCanvasBg }  from '../../hooks/useCanvasBg'
import { useCursor }    from '../../hooks/useCursor'
import { CreatePost }   from './CreatePost'
import { PostCard }     from './PostCard'
import { FeedSidebar }  from './FeedSidebar'

const INIT_POSTS = [
  { id:1,  author:{ name:'Priya Sharma',  college:'IIT Delhi',   avatar:'PS', role:'Frontend' }, time:'2h ago',  type:'badge',    content:"Just earned the '7-Day Streak' badge on PrepVerse! 🔥 Consistency is everything.", badge:'🔥 7-Day Streak',  likes:48, comments:6,  liked:false },
  { id:2,  author:{ name:'Rahul Verma',   college:'NIT Trichy',  avatar:'RV', role:'Backend'  }, time:'5h ago',  type:'solved',   content:"Finally cracked 'Trapping Rain Water' after 3 attempts. The two-pointer approach clicked after I drew it out. Hard problems just need a different lens. 💡", diff:'Hard', likes:72, comments:11, liked:false },
  { id:3,  author:{ name:'Ananya Singh',  college:'BITS Pilani', avatar:'AS', role:'Fullstack' }, time:'1d ago',  type:'post',     content:"Got placed at Razorpay! 🎉 100 days of consistent prep on PrepVerse made the difference. To everyone still grinding — it's worth it. DM me if you want to know my strategy.", likes:214, comments:38, liked:true },
  { id:4,  author:{ name:'Karan Mehta',   college:'IIT Bombay',  avatar:'KM', role:'ML / AI'  }, time:'1d ago',  type:'interview',content:"Just completed a live recruiter session with an SDE from Amazon. Scored 91/100 🤯. The feedback on my system design was incredibly detailed. 10/10 would recommend.", score:91, likes:95, comments:14, liked:false },
  { id:5,  author:{ name:'Sneha Patel',   college:'VIT Vellore', avatar:'SP', role:'Frontend' }, time:'2d ago',  type:'project',  content:"Shipped my portfolio project — a full-stack task manager with real-time updates! Built with React + Node + Socket.io. Would love feedback from the community 🚀", projectName:'TaskFlow', projectUrl:'https://github.com', likes:63, comments:9, liked:false },
]

export default function FeedPage() {
  useCanvasBg('feed-canvas')
  useCursor()

  const [posts, setPosts] = useState(INIT_POSTS)

  const addPost = (newPost) => setPosts(p => [{ ...newPost, id: Date.now(), time:'Just now', likes:0, comments:0, liked:false }, ...p])
  const toggleLike = (id) => setPosts(p => p.map(post => post.id === id ? { ...post, liked:!post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 } : post))

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
      <canvas id="feed-canvas" style={{ position:'fixed',inset:0,zIndex:0,pointerEvents:'none' }}/>
      <div style={{ position:'relative', zIndex:1 }}>
        <Navbar/>
        <main style={{ maxWidth:1100, margin:'0 auto', padding:'100px 24px 60px', display:'grid', gridTemplateColumns:'1fr 320px', gap:24, alignItems:'start' }}>
          <div>
            <CreatePost onPost={addPost}/>
            <div style={{ display:'flex', flexDirection:'column', gap:16, marginTop:16 }}>
              {posts.map(p => <PostCard key={p.id} post={p} onLike={() => toggleLike(p.id)}/>)}
            </div>
          </div>
          <FeedSidebar/>
        </main>
      </div>
      <div id="cur-dot"/><div id="cur-ring"/>
    </div>
  )
}