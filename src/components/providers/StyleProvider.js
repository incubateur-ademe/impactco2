import React from 'react'
import { ThemeProvider } from 'styled-components'
import { useQueryParam, StringParam, withDefault } from 'use-query-params'

import StyleContext from 'utils/StyleContext'

const themes = {
  default: {
    name: 'Défaut',
    colors: {
      main: '#05386B',
      second: '#ffffdb',
      background: '#379683',
      text: '#ffffdb',
    },
    fonts: '"Montserrat", Arial, sans-serif',
  },
  classic: {
    name: 'Classique',
    colors: {
      main: '#32337B',
      second: '#fdfdfd',
      background: '#fdfdfd',
      text: '#32337B',
    },
    fonts: '"Montserrat", Arial, sans-serif',
  },
  accessible: {
    name: 'Accessible',
    colors: {
      main: 'black',
      second: 'white',
      background: 'white',
      text: 'black',
    },
    fonts: 'Arial, sans-serif',
  },
}
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
      <ThemeProvider
        theme={{ colors: themes[theme].colors, fonts: themes[theme].fonts }}
      >
        {props.children}
      </ThemeProvider>
    </StyleContext.Provider>
  )
}
