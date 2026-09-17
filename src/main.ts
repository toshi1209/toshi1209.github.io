import './style.css'

const heroImg = document.querySelector('.hero-cat img')

if (heroImg instanceof HTMLImageElement) {
  void fetch('/sakura.b64')
    .then((res) => {
      if (!res.ok) throw new Error('sakura image missing')
      return res.text()
    })
    .then((b64) => {
      heroImg.src = 'data:image/webp;base64,' + b64.trim()
      heroImg.closest('.hero-cat')?.classList.add('landed')
    })
    .catch(() => {
      heroImg.alt = '入口で待っている白い猫、さくら'
    })
}

type Walker = {
  el: HTMLElement
  x: number
  y: number
  vx: number
  face: number
  sitUntil: number
  nextTurn: number
}

const WALKERS = [
  { file: '/walk-white.b64', face: 1 },
  { file: '/walk-cream.b64', face: 1 },
  { file: '/walk-gray.b64', face: 1 },
  { file: '/walk-blossom.b64', face: -1 },
]

async function loadCat(file: string): Promise<string> {
  const res = await fetch(file)
  if (!res.ok) throw new Error(file)
  const b64 = (await res.text()).trim()
  return 'data:image/webp;base64,' + b64
}

function roam(srcs: string[]) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const yard = document.querySelector('.yard')
  if (!(yard instanceof HTMLElement)) return

  const lanes = [0.08, 0.2, 0.34, 0.5, 0.68, 0.84]
  const count = window.innerWidth < 800 ? 5 : 8
  const cats: Walker[] = []
  const now = performance.now()

  for (let i = 0; i < count; i += 1) {
    const meta = WALKERS[i % WALKERS.length]
    const el = document.createElement('div')
    el.className = 'stray'
    const img = document.createElement('img')
    img.src = srcs[i % srcs.length]
    img.alt = ''
    el.append(img)
    el.style.width = `${88 + ((i * 17) % 40)}px`
    yard.append(el)

    const dir = i % 2 === 0 ? 1 : -1
    cats.push({
      el,
      x: Math.random() * window.innerWidth,
      y: window.innerHeight * lanes[i % lanes.length],
      vx: dir * (0.45 + Math.random() * 0.7),
      face: meta.face,
      sitUntil: now + Math.random() * 600,
      nextTurn: now + 2800 + Math.random() * 5000,
    })
  }

  const step = (t: number) => {
    const w = window.innerWidth
    const h = window.innerHeight
    for (const cat of cats) {
      if (t >= cat.sitUntil) {
        cat.x += cat.vx
        if (cat.x > w + 60) {
          cat.x = -120
          cat.y = h * lanes[Math.floor(Math.random() * lanes.length)]
        } else if (cat.x < -120) {
          cat.x = w + 60
          cat.y = h * lanes[Math.floor(Math.random() * lanes.length)]
        }
        if (t > cat.nextTurn) {
          if (Math.random() < 0.28) {
            cat.sitUntil = t + 800 + Math.random() * 1600
          } else {
            cat.vx *= -1
          }
          cat.nextTurn = t + 2600 + Math.random() * 4200
        }
      }
      const face = cat.vx >= 0 ? cat.face : -cat.face
      cat.el.style.transform = `translate(${cat.x}px, ${cat.y}px) scaleX(${face})`
    }
    requestAnimationFrame(step)
  }

  requestAnimationFrame(step)
}

function fallBlossoms() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const sky = document.querySelector('.sky')
  if (!(sky instanceof HTMLElement)) return

  const petal = `<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 5c2.6 5.2 2.8 9.4 0 14.2C13.2 14.4 13.4 10.2 16 5Zm9.4 4.8c-5 3.4-8.6 5.4-14 6.2 4.6-3.4 8.8-5.2 14-6.2Zm1.8 10.6c-6 .2-10.2-.8-15-4.1 5.2.5 9.8 2.1 15 4.1ZM16 27c-2.6-5.2-2.8-9.4 0-14.2 2.8 4.8 2.6 9 0 14.2Zm-11.2-6.6c6-.2 10.2.8 15 4.1-5.2-.5-9.8-2.1-15-4.1Zm-1.8-10.6c5-3.4 8.6-5.4 14-6.2-4.6 3.4-8.8 5.2-14 6.2Z"/></svg>`

  const count = window.innerWidth < 800 ? 22 : 36
  type Petal = {
    el: HTMLElement
    x: number
    y: number
    r: number
    vy: number
    spin: number
    sway: number
    phase: number
  }
  const petals: Petal[] = []

  for (let i = 0; i < count; i += 1) {
    const el = document.createElement('div')
    el.className = 'blossom'
    el.innerHTML = petal
    const size = 10 + Math.random() * 16
    el.style.width = `${size}px`
    el.style.color = Math.random() < 0.35 ? '#f3a3b4' : '#e37a93'
    el.style.opacity = String(0.55 + Math.random() * 0.4)
    sky.append(el)
    petals.push({
      el,
      x: Math.random() * window.innerWidth,
      y: -40 - Math.random() * window.innerHeight,
      r: Math.random() * 360,
      vy: 0.35 + Math.random() * 0.7,
      spin: (Math.random() - 0.5) * 1.8,
      sway: 12 + Math.random() * 28,
      phase: Math.random() * Math.PI * 2,
    })
  }

  const step = (t: number) => {
    const w = window.innerWidth
    const h = window.innerHeight
    for (const p of petals) {
      p.y += p.vy
      p.r += p.spin
      const x = p.x + Math.sin(t / 700 + p.phase) * p.sway
      if (p.y > h + 30) {
        p.y = -30
        p.x = Math.random() * w
      }
      p.el.style.transform = `translate(${x}px, ${p.y}px) rotate(${p.r}deg)`
    }
    requestAnimationFrame(step)
  }

  requestAnimationFrame(step)
}

void Promise.all(WALKERS.map((c) => loadCat(c.file)))
  .then((srcs) => {
    roam(srcs)
  })
  .catch(() => {
    /* images missing: page still works */
  })

fallBlossoms()
