import './style.css'

const CAT = `<svg class="walker" viewBox="0 0 280 232" aria-hidden="true">
  <g class="leg-r"><path class="fur" d="M240,146 L252.8,153.1 L265.4,161.9 L272.5,164.5 L274.3,166.6 L274.7,169.6 L271.7,183.0 L267.5,214.0 L264.6,223.5 L262.0,226.8 L260.6,227.3 L256.5,226.1 L253.6,223.2 L252.9,221.2 L255.5,215.3 L257.8,186.3 L255.2,183.0 L250.8,181.5 L239.0,180.7 L240.6,186.3 L240.3,191.2 L228.0,212.1 L223.0,218.8 L217.8,223.3 L213.2,225.3 L208.7,225.3 L201.7,223.2 L200.6,220.4 L199.0,220.1 L198.5,217.9 L200.0,214.8 L203.5,212.6 L206.1,212.6 L210.5,214.4 L217.9,202.9 L218.3,196.1 L214.4,190.2 L209.5,185.3 L191.4,173.5 L186.2,168.3 L182.0,162.1 L188,148 Z"/></g>
  <g class="leg-m"><path class="fur" d="M148,146 L145.5,155.7 L136.8,156.0 L133.4,158.5 L141.1,193.8 L141.8,212.1 L138.5,226.4 L135.8,229.5 L132.2,230.5 L124.4,230.5 L124.0,229.1 L121.5,228.9 L120.9,227.6 L119.7,227.4 L119.4,223.8 L120.4,221.5 L126.9,217.0 L128.5,214.7 L129.5,211.7 L128.8,205.2 L125.3,198.3 L119.1,189.5 L101.8,167.8 L112,148 Z"/></g>
  <g class="leg-f"><path class="fur" d="M78,148 L88.6,179.4 L60.4,213.7 L53.0,221.2 L47.6,225.0 L42.5,226.9 L31.4,227.6 L28.7,226.4 L28.2,224.3 L25.4,223.2 L26.1,219.3 L29.8,216.5 L36.9,217.1 L40.5,216.2 L45.9,211.7 L54.9,195.4 L61.7,177.4 L64.0,168.0 L64.0,162.1 L52,148 Z"/></g>
  <g class="torso">
    <path class="fur" d="M1.1,101.3 L1.6,99.8 L8.3,93.5 L12.6,84.1 L27.9,74.0 L29.7,68.0 L28.0,57.8 L28.5,56.4 L34.5,60.1 L44.1,72.1 L51.5,78.3 L64.8,84.5 L76.2,87.4 L82.0,88.1 L93.0,87.4 L119.6,81.5 L133.8,79.6 L158.5,78.9 L179.9,82.2 L200.3,90.3 L213.6,93.9 L221.3,93.9 L228.8,91.7 L241.8,85.8 L249.5,80.5 L255.5,74.2 L259.7,66.7 L263.6,49.7 L264.3,30.1 L262.3,20.3 L256.8,11.4 L255.9,5.9 L258.4,2.0 L262.8,1.1 L265.6,2.3 L267.8,4.6 L275.0,17.0 L277.9,28.4 L278.2,45.1 L275.3,61.8 L268.5,81.0 L260.7,93.5 L249.5,103.7 L247.8,107.2 L251.3,118.6 L251.3,127.8 L249.1,137.9 L248.7,146.1 L249.7,149.0 L236,176 L200,178 L160,176 L110,176 L64,176 L59.1,146.1 L57.8,138.2 L57.8,131.7 L47.0,121.7 L35.0,116.2 L27.5,113.9 L13.9,115.8 L10.7,115.2 L6.3,111.1 L4.9,107.3 L1.8,103.9 Z"/>
  </g>
</svg>`

function mountCats() {
  document.querySelectorAll('.neko').forEach((el) => {
    if (!(el instanceof HTMLElement)) return
    const kind = [...el.classList].find((c) => c.startsWith('neko-') && !['neko', 'neko-mark', 'neko-mid', 'neko-tiny', 'neko-wash'].includes(c))
    el.innerHTML = CAT.replace('class="walker"', `class="walker ${kind ?? ''}"`)
  })
}

function fallBlossoms() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const sky = document.querySelector('.sky')
  if (!(sky instanceof HTMLElement)) return

  const blossom = `<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 5c2.6 5.2 2.8 9.4 0 14.2C13.2 14.4 13.4 10.2 16 5Zm9.4 4.8c-5 3.4-8.6 5.4-14 6.2 4.6-3.4 8.8-5.2 14-6.2Zm1.8 10.6c-6 .2-10.2-.8-15-4.1 5.2.5 9.8 2.1 15 4.1ZM16 27c-2.6-5.2-2.8-9.4 0-14.2 2.8 4.8 2.6 9 0 14.2Zm-11.2-6.6c6-.2 10.2.8 15 4.1-5.2-.5-9.8-2.1-15-4.1Zm-1.8-10.6c5-3.4 8.6-5.4 14-6.2-4.6 3.4-8.8 5.2-14 6.2Z"/></svg>`
  const petal = `<svg viewBox="0 0 20 28" aria-hidden="true"><path fill="currentColor" d="M10 1c4.2 3.4 7.6 8.2 7.8 14.2.2 5.2-2.6 9.4-7.8 12.3C4.8 24.6 2 20.4 2.2 15.2 2.4 9.2 5.8 4.4 10 1Z"/></svg>`

  const count = window.innerWidth < 800 ? 16 : 24
  const palette = ['#e37a93', '#f3a3b4', '#de6b86', '#f08aa6', '#e892a8', '#f6b7c4']

  for (let i = 0; i < count; i += 1) {
    const el = document.createElement('div')
    el.className = 'blossom'
    const isFlower = i % 4 === 0
    el.innerHTML = isFlower ? blossom : petal
    const size = isFlower ? 22 + Math.random() * 16 : 14 + Math.random() * 18
    el.style.width = `${size}px`
    el.style.color = palette[i % palette.length]
    el.style.opacity = String(0.72 + Math.random() * 0.24)
    el.style.setProperty('--x', `${Math.random() * 100}vw`)
    el.style.setProperty('--dx', `${(Math.random() - 0.4) * 240}px`)
    el.style.setProperty('--dur', `${9 + Math.random() * 8}s`)
    el.style.setProperty('--delay', `${-Math.random() * 14}s`)
    el.style.setProperty('--spin', `${280 + Math.random() * 520}deg`)
    el.style.setProperty('--sway', `${1.2 + Math.random() * 1.5}s`)
    sky.append(el)
  }
}

mountCats()
fallBlossoms()
