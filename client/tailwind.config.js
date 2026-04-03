/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Bricolage Grotesque', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
        body:    ['Geist', 'sans-serif'],
      },
      colors: {
        bg:      '#080909',
        bg1:     '#0c0d0e',
        bg2:     '#111214',
        bg3:     '#16181b',
        bg4:     '#1c1f23',
        cyan:    '#00d2ff',
        violet:  '#7c3aed',
        emerald: '#10b981',
        amber:   '#f59e0b',
        rose:    '#f43f5e',
        t0:      '#f8fafc',
        t1:      '#94a3b8',
        t2:      '#475569',
        t3:      '#1e293b',
      },
      borderColor: { DEFAULT: 'rgba(255,255,255,0.07)' },
      animation: {
        'float':    'float 5s ease-in-out infinite',
        'floatR':   'floatR 7s ease-in-out infinite',
        'pulse2':   'pulse2 2s ease-in-out infinite',
        'spin-slow':'spin 8s linear infinite',
        'wave':     'wave 28s linear infinite',
        'ticker':   'ticker 32s linear infinite',
        'glow':     'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        float:     { '0%,100%':{ transform:'translateY(0)' },     '50%':{ transform:'translateY(-10px)' } },
        floatR:    { '0%,100%':{ transform:'translateY(0) rotate(-1deg)' }, '50%':{ transform:'translateY(-14px) rotate(1deg)' } },
        pulse2:    { '0%,100%':{ opacity:'1' }, '50%':{ opacity:'.35' } },
        glowPulse: { '0%,100%':{ boxShadow:'0 0 20px rgba(0,210,255,.08)' }, '50%':{ boxShadow:'0 0 48px rgba(0,210,255,.22)' } },
      },
      backgroundImage: {
        'grad-primary': 'linear-gradient(135deg, #00d2ff 0%, #7c3aed 100%)',
        'grad-card':    'linear-gradient(145deg, #111214 0%, #0c0d0e 100%)',
      },
    },
  },
  plugins: [],
}