import React from 'react'
import styled from 'styled-components'

import MagicLink from 'components/base/MagicLink'
import Marianne from 'components/base/Marianne'
import Ademe from 'components/base/Ademe'
import Section from 'components/base/Section'
import Logo from 'components/misc/Logo'
import ThemeToggle from './header/ThemeToggle'

const Wrapper = styled.header`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin: 0.25rem 0;

  ${(props) => props.theme.mq.small} {
    margin-bottom: 0.5rem;
    font-size: 0.75rem;
  }
`
const Left = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`
const Logos = styled(MagicLink)`
  display: flex;
  align-items: center;
  margin: 0 0 0 -0.75em;
  background-color: #fff;
`
export default function Header(props) {
  return (
    <Section>
      <Section.Content>
        <Wrapper className={props.className}>
          <Left>
            <Logos to='/' aria-label='Accueil'>
              <Marianne />
              <Ademe />
            </Logos>
            <Logo />
          </Left>
          <ThemeToggle />
        </Wrapper>
      </Section.Content>
    </Section>
  )
}
