import { FC, useEffect } from 'react'

const Crisp: FC = () => {
  useEffect(() => {
    window.$crisp = []
    window.CRISP_WEBSITE_ID = process.env.NEXT_PUBLIC_CRISP_CHAT
    ;(function () {
      const d = document
      const s = d.createElement('script')
      s.src = 'https://client.crisp.chat/l.js'
      s.async = true
      d.getElementsByTagName('head')[0].appendChild(s)
    })()
  }, [])

  return null
}

export default Crisp
