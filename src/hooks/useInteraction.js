import { useEffect } from 'react'

const handleInteraction = () => {
  window?._paq?.push(['trackEvent', 'Interaction', 'Click', null])
  document.body.removeEventListener('click', handleInteraction)
}
export default function useInteraction() {
  useEffect(() => {
    window?._paq?.push(['trackEvent', 'User', 'Branche', process.env.BRANCH])

    document.body.addEventListener('click', handleInteraction)
    return () => {
      document.body.removeEventListener('click', handleInteraction)
    }
  }, [])
}
