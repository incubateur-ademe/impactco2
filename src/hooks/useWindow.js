import { useEffect, useState } from 'react'

export default function useWindow() {
  const [clientWindow, setClientWindow] = useState(null)

  useEffect(() => {
    setClientWindow(window)
  }, [])

  return clientWindow
}
