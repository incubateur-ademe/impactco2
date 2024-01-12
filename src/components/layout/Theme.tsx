import { useEffect } from 'react'

export default function useTheme() {
  useEffect(() => {
    if (window.location.search.includes('theme=night')) {
      document.body.classList.add('night')
    } else {
      document.body.classList.remove('night')
    }
  }, [])
}
