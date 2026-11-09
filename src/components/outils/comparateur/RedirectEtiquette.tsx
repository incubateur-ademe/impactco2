'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const RedirectEtiquette = () => {
  const router = useRouter()

  useEffect(() => {
    if (window.location.hash === '#etiquette') {
      router.push('/outils/etiquettes')
    }
  }, [router])

  return null
}

export default RedirectEtiquette
