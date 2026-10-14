'use client'

import { useEffect } from 'react'

const ViewCalendar = () => {
  useEffect(() => {
    localStorage.setItem('kit-rse-calendar', 'true')
  }, [])

  return null
}

export default ViewCalendar
