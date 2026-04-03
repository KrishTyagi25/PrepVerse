import React from 'react'
import { Field } from '../../components/ui/Field'

const DIFFS     = ['All','Easy','Medium','Hard']
const TAGS      = ['All','Arrays','DP','Trees','Graphs','Strings','Sliding Window','Two Pointers','BFS','DFS','LinkedList','Stack','Heap','Trie','Backtracking','HashMap']
const COMPANIES = ['All','Google','Amazon','Meta','Microsoft','Flipkart','Razorpay']
const STATUSES  = ['All','Solved','Unsolved']

function SelectPill({ options, value, onChange }) {
  return (
    <div style={{ display:'flex', gap:4, flexWrap:'wrap' }}>
      {options.map(o => (
        <button key={o} onClick={() => onChange(o)} style={{
          padding:'5px 12px', borderRadius:999, border:`1px solid ${value===o ? 'rgba(0,210,255,.4)' : 'rgba(255,255,255,.07)'}`,
          background: value===o ? 'rgba(0,210,255,.1)' : 'rgba(255,255,255,.025)',
          fontFamily:'JetBrains Mono,monospace', fontSize:11, cursor:'pointer', transition:'all .15s',
          color: value===o ? '#00d2ff' : '#475569',
        }}>{o}</button>
      ))}
    </div>
  )
}

export function FilterBar({ search, onSearch, diff, onDiff, tag, onTag, company, onCompany, status, onStatus }) {
  return (
    <div style={{ background:'rgba(255,255,255,.02)', border:'1px solid rgba(255,255,255,.07)', borderRadius:14, padding:'16px 18px', marginBottom:20, display:'flex', flexDirection:'column', gap:14 }}>

      <Field
        label="Search problems"
        placeholder="Binary search, sliding window…"
        value={search}
        onChange={e => onSearch(e.target.value)}
        icon={<SearchIcon/>}
      />

      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        <Row label="Difficulty"><SelectPill options={DIFFS}     value={diff}    onChange={onDiff}/></Row>
        <Row label="Status">    <SelectPill options={STATUSES}  value={status}  onChange={onStatus}/></Row>
        <Row label="Company">   <SelectPill options={COMPANIES} value={company} onChange={onCompany}/></Row>
        <Row label="Topic">     <SelectPill options={TAGS}      value={tag}     onChange={onTag}/></Row>
      </div>
    </div>
  )
}

function Row({ label, children }) {
  return (
    <div style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
      <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#475569', textTransform:'uppercase', letterSpacing:'.06em', paddingTop:7, minWidth:68 }}>{label}</span>
      {children}
    </div>
  )
}

function SearchIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/></svg>
}