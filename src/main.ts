import './style.css'

void fetch('/neko.b64')
  .then((res) => {
    if (!res.ok) throw new Error('neko')
    return res.text()
  })
  .then((b64) => {
    document.documentElement.style.setProperty(
      '--neko',
      `url("data:image/png;base64,${b64.trim()}")`,
    )
  })
  .catch(() => {})
