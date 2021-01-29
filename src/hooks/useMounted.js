import { useState, useEffect } from 'react'

export default function useMounted() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
    return () => {
      setMounted(false)
    }
  }, [])

  return mounted
}
