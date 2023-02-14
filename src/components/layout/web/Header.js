import React from 'react'
import styled from 'styled-components'

import Ademe from 'components/base/Ademe'
import Logo from 'components/base/Logo'
import MagicLink from 'components/base/MagicLink'
import Marianne from 'components/base/Marianne'
import Section from 'components/base/Section'

import ThemeToggle from './header/ThemeToggle'

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  margin: 0.25rem 0;
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
const Logos = styled(MagicLink)`
  align-items: center;
  background-color: #fff;
  display: flex;
  margin: 0 0 0 -0.75em;
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
