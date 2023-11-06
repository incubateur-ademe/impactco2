import React from 'react'
import styled from 'styled-components'
import { buildCurrentUrlFor } from 'utils/urls'
import useWindow from 'hooks/useWindow'
import Ademe from 'components/base/Ademe'
import Logo from 'components/base/Logo'
import MagicLink from 'components/base/MagicLink'
import Marianne from 'components/base/Marianne'

const Wrapper = styled.footer`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const StyledMagicLink = styled(MagicLink)`
  display: block;
  font-size: 0.75rem;
  font-weight: 300;
  margin: 0.75rem auto;
  text-align: center;
`

const Logos = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  text-decoration: none;
  overflow: hidden ${(props) => props.theme.mq.small} {
    font-size: ${(props) => (props.iframe ? 0.75 : 1)}rem;
    padding: 0 0.25rem;
  }
`

export default function IframeFooter() {
  const window = useWindow()
  let actualSrc = window?.location.href.split('iframes')[1] || ''
  if (actualSrc.indexOf('livraison') > 0) {
    actualSrc = '/livraison'
  }
  let fullUrl = buildCurrentUrlFor(process?.env?.websiteurl, actualSrc)
  return (
    <Wrapper>
      <StyledMagicLink to={fullUrl}>
        Voir la version détaillée
        <br />
        (et les sources)
      </StyledMagicLink>
      <Logos>
        <Marianne />
        <Ademe />
        <Logo />
      </Logos>
    </Wrapper>
  )
}
