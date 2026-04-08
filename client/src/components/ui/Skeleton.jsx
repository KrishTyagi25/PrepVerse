import React from 'react'

export function Skeleton({ width = '100%', height = 16, borderRadius = 8, style = {} }) {
  return (
    <div style={{
      width, height, borderRadius,
      background: 'linear-gradient(90deg, rgba(255,255,255,.04) 25%, rgba(255,255,255,.08) 50%, rgba(255,255,255,.04) 75%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.5s infinite',
      ...style,
    }}/>
  )
}

export function SkeletonCard({ lines = 3 }) {
  return (
    <div style={{ padding: 20, borderRadius: 14, background: 'rgba(255,255,255,.02)', border: '1px solid rgba(255,255,255,.07)' }}>
      <Skeleton height={14} width="60%" style={{ marginBottom: 12 }}/>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} height={11} width={i === lines - 1 ? '40%' : '100%'} style={{ marginBottom: 8 }}/>
      ))}
      <style>{`@keyframes shimmer { from{background-position:200% 0} to{background-position:-200% 0} }`}</style>
    </div>
  )
}

export function SkeletonRow() {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:12, padding:'13px 16px', borderBottom:'1px solid rgba(255,255,255,.04)' }}>
      <Skeleton width={32} height={32} borderRadius={999}/>
      <div style={{ flex:1 }}>
        <Skeleton height={13} width="50%" style={{ marginBottom:6 }}/>
        <Skeleton height={10} width="30%"/>
      </div>
      <Skeleton width={60} height={22} borderRadius={6}/>
      <style>{`@keyframes shimmer { from{background-position:200% 0} to{background-position:-200% 0} }`}</style>
    </div>
  )
}