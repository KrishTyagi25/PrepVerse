export function SectionHeader({ title, desc }) {
  return (
    <div style={{ marginBottom:24 }}>
      <h2 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:'1.6rem', letterSpacing:'-.03em', marginBottom:6 }}>{title}</h2>
      <p style={{ fontSize:14, color:'#475569', lineHeight:1.6 }}>{desc}</p>
    </div>
  )
}