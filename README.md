# traceurs

> The name `traceurs` is from **_Obus traceurs_** in **French** · **_Flame tracer_** in **English** · **_曳光弹_**.

Fetch your data eagerly, follow on the `FCP`.

# API outline

```tsx
// server.tsx

import { Dye } from '@traceurs/react'
import { createBullet } from '@traceurs/fetch'

import { requestRecommend, requestUserList } from '@app/client'

function render() {
  const bullet = createBullet()
  bullet.loaded(requestRecommend)
  bullet.loaded(requestUserList)

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

export const requestRecommend = createFetch(fetch)('/api/v1/users/recommend', {
  method: 'POST',
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
        method: 'POST',
      })
      requestMap[k2] = fetch(k2)
    </script>
  </head>
</html>
```
