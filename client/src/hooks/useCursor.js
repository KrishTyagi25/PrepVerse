import { useEffect } from 'react'

export function useCursor() {
  useEffect(() => {
    const dot  = document.getElementById('cur-dot')
    const ring = document.getElementById('cur-ring')
    if (!dot || !ring) return

    let mx = 0, my = 0, rx = 0, ry = 0

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY
      dot.style.transform = `translate(${mx - 2.5}px,${my - 2.5}px)`
    }

    function lerpRing() {
      rx += (mx - rx) * .11
      ry += (my - ry) * .11
      ring.style.transform = `translate(${rx - 14}px,${ry - 14}px)`
      requestAnimationFrame(lerpRing)
    }
    lerpRing()

    const addHov = () => document.body.classList.add('hov')
    const remHov = () => document.body.classList.remove('hov')

    const targets = document.querySelectorAll('a,button,[data-hover]')
    targets.forEach(el => {
      el.addEventListener('mouseenter', addHov)
      el.addEventListener('mouseleave', remHov)
    })

    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      targets.forEach(el => {
        el.removeEventListener('mouseenter', addHov)
        el.removeEventListener('mouseleave', remHov)
      })
    }
  }, [])
}