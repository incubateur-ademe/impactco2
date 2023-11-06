import React, { useContext } from 'react'
import { DarkModeSwitch } from 'react-toggle-dark-mode'
import styled from 'styled-components'
import { hideon } from 'utils/hideon'
import StyleContext from 'components/providers/StyleProvider'

const Wrapper = styled.div`
  height: 32px;
  ${hideon}
`

export default function ThemeToggle2(props) {
  const { theme, setTheme } = useContext(StyleContext)

  const [isDarkMode, setDarkMode] = React.useState(false)

  const toggleDarkMode = (checked) => {
    setDarkMode(checked)
    theme === 'night' ? setTheme('default') : setTheme('night')
  }

  return (
    <Wrapper mobile={props.mobile} hideon={props.hideon}>
      <DarkModeSwitch style={{ marginBottom: '2rem' }} checked={isDarkMode} onChange={toggleDarkMode} size={32} />
    </Wrapper>
  )
}
