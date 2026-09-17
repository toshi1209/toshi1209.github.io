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
      img.alt = '額に桜をつけた白い猫、さくら'
    })
}
