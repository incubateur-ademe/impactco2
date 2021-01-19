import React from 'react'
import { ThemeProvider } from 'styled-components'
import { useQueryParam, StringParam, withDefault } from 'use-query-params'

import StyleContext from 'utils/StyleContext'
import { themes } from 'utils/styles'

export default function CO2NumberProvider(props) {
  const [theme, setTheme] = useQueryParam(
    'theme',
    withDefault(StringParam, 'default')
  )

  return (
    <StyleContext.Provider
      value={{
        themes,
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
