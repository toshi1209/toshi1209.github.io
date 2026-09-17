import './style.css'

void Promise.all(
  ['/n1.b64', '/n2.b64'].map((path) =>
    fetch(path).then((res) => {
      if (!res.ok) throw new Error('neko')
      return res.text()
    }),
  ),
)
  .then((parts) => {
    document.documentElement.style.setProperty(
      '--neko',
      `url("data:image/png;base64,${parts.join('').replace(/\s+/g, '')}")`,
    )
  })
  .catch(() => {})
