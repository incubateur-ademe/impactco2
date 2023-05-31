import React from 'react'
import styled from 'styled-components'

import Ademe from 'components/base/Ademe'
import Logo from 'components/base/Logo'
import Marianne from 'components/base/Marianne'

import About from './footer/About'
import Contact from './footer/Contact'

const Logos = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: 0 0.75rem;
  text-decoration: none;

  ${(props) => props.theme.mq.small} {
    font-size: ${(props) => (props.iframe ? 0.75 : 1)}rem;
    padding: 0 0.25rem;
  }
`
const Accessibility = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  font-size: 0.75rem;
  font-weight: 300;
  padding-bottom: 1rem;
  text-align: center;
`
export default function Footer(props) {
  return (
    <>
      {props.isRawFooter ? null : (
        <>
          <Contact />
          <About />
        </>
      )}
      <Logos>
        <Marianne />
        <Ademe />
        <Logo />
      </Logos>
      <Accessibility>Accessibilité : partiellement conforme</Accessibility>
      <Accessibility>Version : {process.env.thebuildid}</Accessibility>
    </>
  )
}
