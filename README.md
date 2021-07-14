# traceurs

> The name `traceurs` is from ***Obus traceurs*** in **French** · ***Flame tracer*** in **English** · ***曳光弹***.

Fetch your data eagerly, follow on the `FCP`.

# API outline

```tsx
// server.tsx

import { Dye } from '@traceurs/core'
import { createBullet } from '@traceurs/fetch'

function render() {
  const bullet = createBullet()
  bullet.loaded('/api/v1/users/recommend', {
    method: 'POST'
  })
  bullet.loaded('/api/v1/videos/recommend')

  return renderHtml(bullet)
}

function renderHtml(bullet) {
  return (
    <html>
      <head>
        <Dye bullet={bullet} />
      </head>
    </html>
  )
}
```

```ts
// client.ts
import { createFetch } from '@traceurs/fetch'

// params need to be same with `loaded` in server.tsx
createFetch(fetch)('/api/v1/users/recommend', {
  method: 'POST'
})
```

```html
<html>
  <head>
    <script id="traceurs-dye">
      const k1 = '/api/v1/users/recommend'
      const k2 = '/api/v1/videos/recommend'
      const requestMap = {}
      window.__traceurs__ = requestMap

      requestMap[k1] = fetch(k1, {
        method: 'POST'
      })
      requestMap[k2] = fetch(k2)
    </script>
  </head>
</html>
```
