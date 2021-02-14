import React from 'react'
import styled from 'styled-components'

import Theme from './themes/Theme'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1em -0.5em;
`
export default function Themes(props) {
  const themeKeys = Object.keys(props.themes)

  return (
    <Wrapper>
      {themeKeys.map((themeKey) => (
        <Theme
          key={themeKey}
          theme={props.themes[themeKey]}
          current={themeKey === props.theme}
          onClick={() => props.setTheme(themeKey)}
        />
      ))}
    </Wrapper>
  )
}
