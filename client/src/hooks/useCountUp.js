import { useEffect, useRef } from 'react'

/**
 * useCountUp
 * Animates a number from 0 → target when the ref enters the viewport.
 * @param {number} target  - final number
 * @param {number} duration - ms
 * @returns ref to attach to the DOM element
 */
export function useCountUp(target, duration = 1800) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.unobserve(el)

        let start = null
        const step = (ts) => {
          if (!start) start = ts
          const p = Math.min((ts - start) / duration, 1)
          const ease = 1 - Math.pow(1 - p, 3) // ease-out cubic
          const val = Math.floor(ease * target)
          el.textContent = val.toLocaleString()
          if (p < 1) requestAnimationFrame(step)
          else el.textContent = target.toLocaleString()
        }
        requestAnimationFrame(step)
      },
      { threshold: 0.5 }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [target, duration])

  return ref
}