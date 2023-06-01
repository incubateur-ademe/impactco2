import React from 'react'
import styled from 'styled-components'

import Logo from 'components/base/Logo'
import MagicLink from 'components/base/MagicLink'
import Marianne from 'components/base/Marianne'
import Section2 from 'components/base/Section2'
import Nav2 from 'components/layout/web/Nav2.js'

const Wrapper = styled.header`
  box-shadow: 0px 2px 6px #f3f6ff;

  display: flex;
  justify-content: space-between;
  position: relative;
  ${(props) => props.theme.mq.small} {
    font-size: 0.75rem;
    margin-bottom: 0.5rem;
  }
`
const Left = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  position: relative;
`
const Logos = styled(MagicLink)``

export default function Header2(props) {
  return (
    <Section2>
      <Section2.Content>
        <Wrapper className={props.className}>
          <Left>
            <Logos to='/' aria-label='Accueil'>
              <Marianne />
            </Logos>
            <Logo />
            <Nav2 />
          </Left>
        </Wrapper>
      </Section2.Content>
    </Section2>
  )
}
