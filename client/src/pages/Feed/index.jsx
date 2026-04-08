import React, { useState } from 'react'
import { Navbar }       from '../../components/layout/Navbar'
import { useCanvasBg }  from '../../hooks/useCanvasBg'
import { useCursor }    from '../../hooks/useCursor'
import { CreatePost }   from './CreatePost'
import { PostCard }     from './PostCard'
import { FeedSidebar }  from './FeedSidebar'
import { feedService } from '../../api/services/feedService'
import { SkeletonCard } from '../../components/ui/Skeleton'

const [posts,   setPosts]   = useState([])
const [loading, setLoading] = useState(true)
const [page,    setPage]    = useState(1)
const [hasMore, setHasMore] = useState(true)

const fetchFeed = async (pageNum = 1, append = false) => {
  try {
    const { data } = await feedService.getFeed({ page: pageNum, limit: 10 })
    const newPosts = data.data.posts
    setPosts(prev => append ? [...prev, ...newPosts] : newPosts)
    setHasMore(pageNum < data.data.pagination.pages)
  } catch {
    toast('Failed to load feed', 'error')
  } finally {
    setLoading(false)
  }
}

useEffect(() => { fetchFeed() }, [])

const addPost = async (newPost) => {
  try {
    const { data } = await feedService.createPost(newPost)
    setPosts(p => [data.data.post, ...p])
    toast('Post shared!', 'success')
  } catch {
    toast('Failed to create post', 'error')
  }
}

// Replace toggleLike:
const toggleLike = async (id) => {
  try {
    const { data } = await feedService.toggleLike(id)
    setPosts(p => p.map(post =>
      post._id === id
        ? { ...post, liked: data.data.liked, likedByMe: data.data.liked, likesCount: data.data.likesCount }
        : post
    ))
  } catch {}
}

// Loading skeleton:
// In JSX, replace hardcoded posts with:
{loading
  ? Array.from({ length: 3 }).map((_,i) => <SkeletonCard key={i} lines={4}/>)
  : posts.map(p => <PostCard key={p._id} post={p} onLike={() => toggleLike(p._id)}/>)
}

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