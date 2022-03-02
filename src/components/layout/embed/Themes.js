import React, { useContext } from 'react'
import styled from 'styled-components'

import { themes } from 'utils/styles'
import StyleContext from 'utils/StyleContext'
import Theme from './themes/Theme'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1em -0.5em;
`
export default function Themes() {
  const { theme, setTheme } = useContext(StyleContext)

  return (
    <Wrapper>
      {Object.keys(themes).map((themeKey) => (
        <Theme
          key={themeKey}
          theme={themes[themeKey]}
          current={themeKey === theme}
          onClick={() => setTheme(themeKey)}
        />
      ))}
    </Wrapper>
  )
}
