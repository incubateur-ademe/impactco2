import { useEffect } from 'react'

export default function useDebounce(value, delay = 100) {
  useEffect(() => {
    const timer = setTimeout(() => {
      window?._paq?.push(['trackEvent', 'Interaction', 'Search', value])
    }, delay)
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])
}
