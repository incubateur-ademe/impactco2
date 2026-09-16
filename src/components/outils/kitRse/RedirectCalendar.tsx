'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const RedirectCalendar = () => {
  const router = useRouter()

  useEffect(() => {
    const seen = localStorage.getItem('kit-rse-calendar')
    if (seen) {
      router.push('/outils/kit-rse/calendrier')
    }
  }, [router])

  return null
}

export default RedirectCalendar
