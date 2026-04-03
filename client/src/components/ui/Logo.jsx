export function Logo({ size = 30 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 30 30" fill="none">
        <polygon points="15,2 28,26 2,26" stroke="url(#sg)" strokeWidth="2" fill="none"/>
        <polygon points="15,10 22,22 8,22" fill="url(#sg)" opacity=".35"/>
        <defs><linearGradient id="sg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#00d2ff"/><stop offset="100%" stopColor="#7c3aed"/></linearGradient></defs>
      </svg>
      <span style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 800, fontSize: size >= 30 ? '1.15rem' : '1.05rem', letterSpacing: '-.02em' }}>
        Prep<span style={{ color: '#00d2ff' }}>Verse</span>
      </span>
    </div>
  )
}