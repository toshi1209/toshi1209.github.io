import './style.css'

const heroImg = document.querySelector('.hero-cat img')

function land() {
  heroImg?.closest('.hero-cat')?.classList.add('landed')
}

if (heroImg instanceof HTMLImageElement) {
  const show = () => {
    if (heroImg.naturalWidth > 0) land()
  }
  if (heroImg.complete) show()
  heroImg.addEventListener('load', show)
  heroImg.addEventListener('error', land)
  window.setTimeout(land, 1600)

  void Promise.all(
    ['/s1.b64', '/s2.b64', '/s3.b64'].map((path) =>
      fetch(path).then((res) => {
        if (!res.ok) throw new Error('sakura image missing')
        return res.text()
      }),
    ),
  )
    .then((parts) => {
      heroImg.src = 'data:image/jpeg;base64,' + parts.join('').replace(/\s+/g, '')
    })
    .catch(() => {
      heroImg.alt = '入口で待っている白い猫、さくら'
      land()
    })
}

function fallBlossoms() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const sky = document.querySelector('.sky')
  if (!(sky instanceof HTMLElement)) return

  const blossom = `<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 5c2.6 5.2 2.8 9.4 0 14.2C13.2 14.4 13.4 10.2 16 5Zm9.4 4.8c-5 3.4-8.6 5.4-14 6.2 4.6-3.4 8.8-5.2 14-6.2Zm1.8 10.6c-6 .2-10.2-.8-15-4.1 5.2.5 9.8 2.1 15 4.1ZM16 27c-2.6-5.2-2.8-9.4 0-14.2 2.8 4.8 2.6 9 0 14.2Zm-11.2-6.6c6-.2 10.2.8 15 4.1-5.2-.5-9.8-2.1-15-4.1Zm-1.8-10.6c5-3.4 8.6-5.4 14-6.2-4.6 3.4-8.8 5.2-14 6.2Z"/></svg>`
  const petal = `<svg viewBox="0 0 20 28" aria-hidden="true"><path fill="currentColor" d="M10 1c4.2 3.4 7.6 8.2 7.8 14.2.2 5.2-2.6 9.4-7.8 12.3C4.8 24.6 2 20.4 2.2 15.2 2.4 9.2 5.8 4.4 10 1Z"/></svg>`

  const count = window.innerWidth < 800 ? 72 : 110
  const palette = ['#e37a93', '#f3a3b4', '#de6b86', '#f08aa6', '#e892a8', '#f6b7c4', '#ffd0da']

  for (let i = 0; i < count; i += 1) {
    const el = document.createElement('div')
    el.className = 'blossom'
    const isFlower = i % 4 === 0
    el.innerHTML = isFlower ? blossom : petal
    const size = isFlower ? 30 + Math.random() * 26 : 20 + Math.random() * 30
    el.style.width = `${size}px`
    el.style.color = palette[i % palette.length]
    el.style.opacity = String(0.78 + Math.random() * 0.22)
    el.style.setProperty('--x', `${Math.random() * 100}vw`)
    el.style.setProperty('--dx', `${(Math.random() - 0.4) * 360}px`)
    el.style.setProperty('--dur', `${6 + Math.random() * 7}s`)
    el.style.setProperty('--delay', `${-Math.random() * 10}s`)
    el.style.setProperty('--spin', `${320 + Math.random() * 640}deg`)
    el.style.setProperty('--sway', `${1.1 + Math.random() * 1.4}s`)
    sky.append(el)
  }
}

fallBlossoms()
