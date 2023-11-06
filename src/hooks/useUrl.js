import { useEffect, useState } from 'react'

export function useUrl() {
  const [currentUrl, setCurrentUrl] = useState(null)
  useEffect(() => {
    setCurrentUrl(window.location.href)
  }, [])
  return currentUrl ? new URL(currentUrl) : null
}
