import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import {
  useQueryParam,
  StringParam,
  BooleanParam,
  withDefault,
} from 'use-query-params'

import StyleContext from 'utils/StyleContext'
import { themes } from 'utils/styles'

export default function CO2NumberProvider(props) {
  const [theme, setTheme] = useQueryParam(
    'theme',
    withDefault(StringParam, 'default')
  )

  const [displayTitle, setDisplayTitle] = useQueryParam(
    'title',
    withDefault(BooleanParam, true)
  )

  const [configuratorOpen, setConfiguratorOpen] = useState(false)

  return (
    <StyleContext.Provider
      value={{
        themes,
        theme,
        setTheme,
        displayTitle,
        setDisplayTitle,
        configuratorOpen,
        setConfiguratorOpen,
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
