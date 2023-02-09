import React from 'react'
import styled from 'styled-components'

import Ademe from 'components/base/Ademe'
import Datagir from 'components/base/Datagir'
import MagicLink from 'components/base/MagicLink'
import Marianne from 'components/base/Marianne'

const LogosWrapper = styled.div`
  background-color: #fff;
  display: flex;
  justify-content: center;
`
const Logos = styled(MagicLink)`
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
export default function Footer() {
  return (
    <>
      <LogosWrapper>
        <Logos
          to='https://datagir.ademe.fr/'
          aria-label='datagir.ademe.fr'
          noIcon
        >
          <Marianne />
          <Ademe />
          <Datagir />
        </Logos>
      </LogosWrapper>
      <Accessibility>Accessibilité : partiellement conforme</Accessibility>
    </>
  )
}
