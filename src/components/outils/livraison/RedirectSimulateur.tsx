'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const RedirectSimulateur = () => {
  const router = useRouter()

  useEffect(() => {
    if (window.location.hash === '#simulateur') {
      router.push('/outils/livraison?tab=simulateur')
    }
  }, [router])

  return null
}

export default RedirectSimulateur
