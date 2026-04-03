import { useEffect } from 'react'

export function useCanvasBg(canvasId = 'bg-canvas') {
  useEffect(() => {
    const canvas = document.getElementById(canvasId)
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W, H, raf

    const resize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // ── Particles ──────────────────────────────────────
    const COLORS = ['#00d2ff', '#7c3aed', '#10b981']
    class Dot {
      reset() {
        this.x   = Math.random() * W
        this.y   = Math.random() * H
        this.vx  = (Math.random() - .5) * .35
        this.vy  = (Math.random() - .5) * .35
        this.r   = .5 + Math.random() * 1.2
        this.c   = COLORS[Math.floor(Math.random() * 3)]
        this.life = Math.random()
        this.max  = .55 + Math.random() * .45
      }
      constructor() { this.reset() }
      tick() {
        this.x += this.vx; this.y += this.vy; this.life += .0018
        if (this.life > this.max || this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset()
      }
      draw() {
        const a = Math.sin((this.life / this.max) * Math.PI) * .55
        ctx.globalAlpha = a
        ctx.fillStyle   = this.c
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const dots = Array.from({ length: 90 }, () => new Dot())

    // ── Connection lines ────────────────────────────────
    function drawEdges() {
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x
          const dy = dots[i].y - dots[j].y
          const d  = Math.hypot(dx, dy)
          if (d < 110) {
            ctx.globalAlpha = (1 - d / 110) * .055
            ctx.strokeStyle = '#00d2ff'
            ctx.lineWidth   = .4
            ctx.beginPath()
            ctx.moveTo(dots[i].x, dots[i].y)
            ctx.lineTo(dots[j].x, dots[j].y)
            ctx.stroke()
          }
        }
      }
    }

    // ── Wave lines ──────────────────────────────────────
    let t = 0
    function drawWaves() {
      for (let layer = 0; layer < 4; layer++) {
        ctx.globalAlpha = .028 - layer * .004
        ctx.strokeStyle = layer % 2 === 0 ? '#00d2ff' : '#7c3aed'
        ctx.lineWidth   = .8
        ctx.beginPath()
        const amp  = 35 + layer * 18
        const freq = .007 - layer * .001
        const yOff = H * (.25 + layer * .18)
        for (let x = 0; x <= W; x += 4) {
          const y = yOff
            + Math.sin(x * freq + t + layer * 1.2) * amp
            + Math.sin(x * freq * .5 + t * .6) * (amp * .35)
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.stroke()
      }
      t += .009
    }

    // ── Loop ────────────────────────────────────────────
    function loop() {
      ctx.clearRect(0, 0, W, H)
      drawWaves()
      drawEdges()
      dots.forEach(d => { d.tick(); d.draw() })
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [canvasId])
}