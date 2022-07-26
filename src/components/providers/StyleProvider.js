import React, { useState, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import StyleContext from 'utils/StyleContext'
import { themes } from 'utils/styles'

export default function StyleProvider(props) {
  const [theme, setTheme] = useState('default')

  useEffect(() => {
    setTheme(
      window.location.search.includes('theme=night') ? 'night' : 'default'
    )
  }, [])
  return (
    <StyleContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      <ThemeProvider theme={{ ...themes[theme] }}>
        {props.children}
      </ThemeProvider>
    </StyleContext.Provider>
  )
}
