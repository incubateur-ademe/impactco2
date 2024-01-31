import { useEffect, useState } from 'react'

export default function useTheme() {
  const [theme, setTheme] = useState('default')

  useEffect(() => {
    setTheme(window.location.search.includes('theme=night') ? 'night' : 'default')
  }, [])

  useEffect(() => {
    if (theme === 'night') {
      document.body.classList.add('night')
    } else {
      document.body.classList.remove('night')
    }
  }, [theme])

  return { theme }
}
