import React from 'react'
import styled from 'styled-components'

import MagicLink from 'components/base/MagicLink'
import Marianne from 'components/base/Marianne'
import Ademe from 'components/base/Ademe'
import Datagir from 'components/base/Datagir'

const StyledMagicLink = styled(MagicLink)`
  display: block;
  margin: 0 auto 1rem;
  font-size: 0.75rem;
  font-weight: 300;
  text-align: center;
`
const Logos = styled(MagicLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.iframe ? 'auto' : '100%')};
  margin: 0 auto;
  padding: 0 0.75rem;
  text-decoration: none;
  background-color: #fff;
  border-radius: ${(props) => (props.iframe ? 1 : 0)}rem;

  ${(props) => props.theme.mq.small} {
    padding: 0 0.25rem;
    font-size: ${(props) => (props.iframe ? 0.75 : 1)}rem;
  }
`
export default function IframeFooter() {
  return (
    <footer>
      <StyledMagicLink to='https://monconvertisseurco2.fr/'>
        Voir la version détaillée
        <br />
        (et les sources)
      </StyledMagicLink>
      <Logos
        to='https://datagir.ademe.fr/'
        aria-label='datagir.ademe.fr'
        iframe
        noIcon
      >
        <Marianne />
        <Ademe />
        <Datagir />
      </Logos>
    </footer>
  )
}
