import React, { Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { themes } from 'utils/styles'

const StyleContext = React.createContext<{
  theme: 'default' | 'night'
  setTheme: Dispatch<SetStateAction<'default' | 'night'>>
} | null>(null)

export function StyleProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'default' | 'night'>('default')

  useEffect(() => {
    setTheme(window.location.search.includes('theme=night') ? 'night' : 'default')
  }, [])
  return (
    <StyleContext.Provider
      value={{
        theme,
        setTheme,
      }}>
      <ThemeProvider theme={{ ...themes[theme] }}>{children}</ThemeProvider>
    </StyleContext.Provider>
  )
}

const useStyleContext = () => {
  const context = useContext(StyleContext)

  if (!context) {
    throw new Error('useStyleContext has to be used within <StyleProvider>')
  }

  return context
}

export default useStyleContext
