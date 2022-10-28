import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'

import MagicLink from 'components/base/MagicLink'
import Marianne from 'components/base/Marianne'
import Ademe from 'components/base/Ademe'
import Datagir from 'components/base/Datagir'

const Wrapper = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const StyledMagicLink = styled(MagicLink)`
  display: block;
  margin: 0.75rem auto;
  font-size: 0.75rem;
  font-weight: 300;
  text-align: center;
`
const Logos = styled(MagicLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0.75rem;
  text-decoration: none;
  background-color: #fff;
  border-radius: 1rem;
  overflow: hidden ${(props) => props.theme.mq.small} {
    padding: 0 0.25rem;
    font-size: ${(props) => (props.iframe ? 0.75 : 1)}rem;
  }
`
export default function IframeFooter(props) {
  return (
    <Wrapper>
      <StyledMagicLink to={`https://impactco2.fr/${props.url}`}>
        Voir la version détaillée
        <br />
        (et les sources)
      </StyledMagicLink>
      <Logos
        to='https://datagir.ademe.fr/'
        aria-label='datagir.ademe.fr'
        noIcon
      >
        <Marianne />
        <Ademe />
        <Datagir />
      </Logos>
    </Wrapper>
  )
}
