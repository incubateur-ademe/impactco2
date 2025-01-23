'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useThemeStore } from './theme'

const ThemeSync = () => {
  const searchParams = useSearchParams()
  const setTheme = useThemeStore((state) => state.setTheme)

  useEffect(() => {
    if (!searchParams) {
      return
    }

    const theme = searchParams.get('theme')
    if (theme) {
      setTheme(theme)
    }
  }, [searchParams, setTheme])

  return null
}

export default ThemeSync
