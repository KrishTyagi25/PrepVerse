import React, { useState } from 'react'

/**
 * Button
 * variant: 'primary' | 'outline' | 'ghost' | 'glow'
 * size:    'sm' | 'md' | 'lg'
 */
export function Button({
  variant = 'primary',
  size    = 'md',
  icon,
  iconRight,
  className = '',
  children,
  ...rest
}) {
  const [ripples, setRipples] = useState([])

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const id   = Date.now()
    setRipples(r => [...r, { x: e.clientX - rect.left, y: e.clientY - rect.top, id }])
    setTimeout(() => setRipples(r => r.filter(x => x.id !== id)), 600)
    rest.onClick?.(e)
  }

  const base = 'relative inline-flex items-center justify-center gap-2 font-display font-semibold tracking-tight rounded-xl overflow-hidden transition-all duration-200 cursor-none select-none'

  const sizes = {
    sm:  'px-4 py-2 text-[13px]',
    md:  'px-5 py-2.5 text-[14px]',
    lg:  'px-7 py-3.5 text-[15px]',
  }

  const variants = {
    primary: 'bg-gradient-to-r from-cyan to-violet text-white shadow-lg shadow-cyan/20 hover:-translate-y-0.5 hover:shadow-cyan/35',
    outline: 'border border-cyan/30 text-cyan hover:bg-cyan/[.06] hover:border-cyan/60',
    ghost:   'border border-white/[.07] text-t1 bg-white/[.025] hover:bg-white/[.05] hover:text-t0 hover:border-white/[.12]',
    glow:    'bg-cyan/10 border border-cyan/30 text-cyan hover:bg-cyan/[.16] hover:border-cyan/60 shadow-[0_0_20px_rgba(0,210,255,.12)] hover:shadow-[0_0_36px_rgba(0,210,255,.28)]',
  }

  return (
    <button
      {...rest}
      onClick={handleClick}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {ripples.map(r => (
        <span
          key={r.id}
          className="absolute rounded-full bg-white/20 w-2 h-2 -ml-1 -mt-1 animate-ping pointer-events-none"
          style={{ left: r.x, top: r.y, animationDuration: '600ms' }}
        />
      ))}
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {iconRight && <span className="flex-shrink-0">{iconRight}</span>}
    </button>
  )
}