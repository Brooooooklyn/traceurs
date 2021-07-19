import { FC } from 'react'

import { FetchBullet } from '@traceurs/fetch'

const SCRIPT_HEADER = 'var requestMap = {};window.__traceurs__ = requestMap;'

export const Dye: FC<{ bullet: FetchBullet }> = function Dye({ bullet, children }) {
  const { requests } = bullet
  const scripts = requests.map((info, i) => {
    const initParam = info.init ? `,${JSON.stringify(info.init)}` : ''
    return `var k${i}=${info.input};requestMap[k${i}]=fetch(k${i},${initParam})`
  })
  if (!scripts.length) {
    return <>children</>
  }
  return (
    <>
      <script id="traceurs-dye" dangerouslySetInnerHTML={{ __html: `${SCRIPT_HEADER}${scripts}` }} />
      {children}
    </>
  )
}
