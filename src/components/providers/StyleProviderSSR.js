import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'

import StyleContext from 'src/utils/StyleContext'
import { themes } from 'src/utils/styles'

const StyleProviderSSR = (props) => {
  const [theme, setTheme] = useState('default')

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
const wrapper = ({ element }) => <StyleProviderSSR>{element}</StyleProviderSSR>
export default wrapper
