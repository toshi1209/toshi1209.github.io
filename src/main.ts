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

function fallBlossoms() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const sky = document.querySelector('.sky')
  if (!(sky instanceof HTMLElement)) return

  const blossom = `<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 5c2.6 5.2 2.8 9.4 0 14.2C13.2 14.4 13.4 10.2 16 5Zm9.4 4.8c-5 3.4-8.6 5.4-14 6.2 4.6-3.4 8.8-5.2 14-6.2Zm1.8 10.6c-6 .2-10.2-.8-15-4.1 5.2.5 9.8 2.1 15 4.1ZM16 27c-2.6-5.2-2.8-9.4 0-14.2 2.8 4.8 2.6 9 0 14.2Zm-11.2-6.6c6-.2 10.2.8 15 4.1-5.2-.5-9.8-2.1-15-4.1Zm-1.8-10.6c5-3.4 8.6-5.4 14-6.2-4.6 3.4-8.8 5.2-14 6.2Z"/></svg>`
  const petal = `<svg viewBox="0 0 20 28" aria-hidden="true"><path fill="currentColor" d="M10 1c4.2 3.4 7.6 8.2 7.8 14.2.2 5.2-2.6 9.4-7.8 12.3C4.8 24.6 2 20.4 2.2 15.2 2.4 9.2 5.8 4.4 10 1Z"/></svg>`

  const count = window.innerWidth < 800 ? 42 : 68
  type Petal = {
    el: HTMLElement
    x: number
    y: number
    r: number
    vy: number
    spin: number
    sway: number
    phase: number
    drift: number
  }
  const petals: Petal[] = []
  const w0 = window.innerWidth
  const h0 = window.innerHeight

  for (let i = 0; i < count; i += 1) {
    const el = document.createElement('div')
    el.className = 'blossom'
    const isFlower = i % 5 === 0
    el.innerHTML = isFlower ? blossom : petal
    const size = isFlower ? 16 + Math.random() * 14 : 12 + Math.random() * 22
    el.style.width = `${size}px`
    const palette = ['#e37a93', '#f3a3b4', '#f7c1cc', '#de6b86', '#f6d6de']
    el.style.color = palette[i % palette.length]
    el.style.opacity = String(0.62 + Math.random() * 0.34)
    sky.append(el)
    petals.push({
      el,
      x: Math.random() * w0,
      y: Math.random() * h0 - 40,
      r: Math.random() * 360,
      vy: 0.42 + Math.random() * 0.95,
      spin: (Math.random() - 0.5) * 2.6,
      sway: 18 + Math.random() * 46,
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.45) * 0.22,
    })
  }

  const step = (t: number) => {
    const w = window.innerWidth
    const h = window.innerHeight
    for (const p of petals) {
      p.y += p.vy
      p.x += p.drift
      p.r += p.spin
      const x = p.x + Math.sin(t / 560 + p.phase) * p.sway
      if (p.y > h + 36 || x < -60 || x > w + 60) {
        p.y = -28
        p.x = Math.random() * w
      }
      p.el.style.transform = `translate(${x}px, ${p.y}px) rotate(${p.r}deg)`
    }
    requestAnimationFrame(step)
  }

  requestAnimationFrame(step)
}

fallBlossoms()
