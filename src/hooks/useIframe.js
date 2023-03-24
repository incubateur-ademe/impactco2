import { useEffect, useState } from 'react'

export default function useIframe() {
  const [iframe, setIframe] = useState(false)
  useEffect(() => {
    setIframe(window.location.pathname.includes('iframe'))
  }, [])

  return iframe
}
