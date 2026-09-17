import './style.css'

const img = document.querySelector('.hero-cat img')

if (img instanceof HTMLImageElement) {
  void fetch('/sakura.b64')
    .then((res) => {
      if (!res.ok) throw new Error('sakura image missing')
      return res.text()
    })
    .then((b64) => {
      img.src = 'data:image/webp;base64,' + b64.trim()
    })
    .catch(() => {
      img.alt = '入口で待っている白い猫、さくら'
    })
}

type Stray = {
  el: HTMLElement
  x: number
  y: number
  vx: number
  sitUntil: number
  nextTurn: number
}

const CAT = `<svg viewBox="0 0 96 54" fill="none" aria-hidden="true">
  <path class="tail" d="M20 30c-11 4-16-6-13-16" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/>
  <ellipse cx="46" cy="31" rx="23" ry="13" fill="currentColor"/>
  <circle cx="72" cy="22" r="12" fill="currentColor"/>
  <path d="M63 16l1.5-11 9 9" fill="currentColor"/>
  <path d="M74 13l9-10 2 12" fill="currentColor"/>
  <circle cx="77" cy="21" r="1.35" fill="#141216"/>
  <path d="M80 26c3 1 5 1 7-1" stroke="#141216" stroke-width="1.2" stroke-linecap="round"/>
  <g class="legs" stroke="currentColor" stroke-width="3.2" stroke-linecap="round">
    <path class="leg a" d="M34 40v11"/>
    <path class="leg b" d="M43 41v10"/>
    <path class="leg a" d="M52 40v11"/>
    <path class="leg b" d="M61 41v10"/>
  </g>
</svg>`

const PALETTE = ['#f7f2f3', '#e4d6d9', '#f0c9d2', '#d5cfcb', '#f4e8ec', '#cbb8bc']

function roam() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const yard = document.querySelector('.yard')
  if (!(yard instanceof HTMLElement)) return

  const lanes = [0.1, 0.22, 0.38, 0.55, 0.72, 0.86]
  const count = window.innerWidth < 800 ? 5 : 8
  const cats: Stray[] = []
  const now = performance.now()

  for (let i = 0; i < count; i += 1) {
    const el = document.createElement('div')
    el.className = 'stray'
    el.innerHTML = CAT
    el.style.color = PALETTE[i % PALETTE.length]
    el.style.width = `${56 + ((i * 11) % 28)}px`
    yard.append(el)

    const dir = i % 2 === 0 ? 1 : -1
    cats.push({
      el,
      x: Math.random() * window.innerWidth,
      y: window.innerHeight * lanes[i % lanes.length],
      vx: dir * (0.55 + Math.random() * 0.85),
      sitUntil: now + Math.random() * 900,
      nextTurn: now + 2400 + Math.random() * 5000,
    })
  }

  const step = (t: number) => {
    const w = window.innerWidth
    const h = window.innerHeight
    for (const cat of cats) {
      if (t < cat.sitUntil) {
        cat.el.dataset.pose = 'sit'
      } else {
        cat.el.dataset.pose = 'walk'
        cat.x += cat.vx
        if (cat.x > w + 40) {
          cat.x = -90
          cat.y = h * lanes[Math.floor(Math.random() * lanes.length)]
        } else if (cat.x < -90) {
          cat.x = w + 40
          cat.y = h * lanes[Math.floor(Math.random() * lanes.length)]
        }
        if (t > cat.nextTurn) {
          if (Math.random() < 0.35) {
            cat.sitUntil = t + 700 + Math.random() * 1800
          } else {
            cat.vx *= -1
          }
          cat.nextTurn = t + 2200 + Math.random() * 4200
        }
      }
      const face = cat.vx >= 0 ? 1 : -1
      cat.el.style.transform = `translate(${cat.x}px, ${cat.y}px) scaleX(${face})`
    }
    requestAnimationFrame(step)
  }

  requestAnimationFrame(step)
}

roam()
