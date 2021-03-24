import React from 'react'
import styled from 'styled-components'

import ademe from './footer/ademe.jpg'
import repufrancaise from './footer/repufrancaise.jpg'

import Button from 'components/base/Button'
import MagicLink from 'components/base/MagicLink'
import ThemeToggle from 'components/base/ThemeToggle'
import Logo from './footer/Logo'

const Wrapper = styled.div`
  position: relative;
  background-color: ${(props) =>
    props.theme.colors[props.background || 'second']};
  transition: all 600ms;
`
const Content = styled.div`
  max-width: ${(props) => props.width || '40em'};
  margin: 0 auto;
  padding: 1em 0 0;

  ${(props) => props.theme.mq.small} {
    margin: 0 3vw;
  }
`
const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2em;

  ${(props) => props.theme.mq.small} {
    flex-direction: column;
    align-items: inherit;
  }
`
const Sources = styled.div`
  flex: 1;

  ${(props) => props.theme.mq.small} {
    margin-bottom: 2rem;
    text-align: center;
  }
`
const Source = styled.a`
  display: block;
`
const Title = styled.h3`
  margin: 0;
  color: ${(props) => props.theme.colors[props.color || 'text']};
`
const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  ${(props) => props.theme.mq.small} {
    align-items: center;
  }
`
const StyledButton = styled(Button)`
  margin-bottom: 1rem;
`
const LogosWrapper = styled.div`
  display: flex;
  justify-content: center;
`
const Logos = styled(MagicLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-decoration: none;
  background-color: white;
`
const Institution = styled.img`
  display: block;
  height: 5.625em;
`

export default function Footer(props) {
  return (
    <Wrapper background={props.background}>
      <Content width={props.width}>
        <Flex>
          {props.sources && (
            <Sources>
              <Title color={props.color}>Sources des données</Title>

              {props.sources.map((source) => (
                <Source
                  key={source.label}
                  href={source.href}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {source.label}
                </Source>
              ))}
            </Sources>
          )}
          <Right>
            {props.setConfiguratorOpen && (
              <StyledButton
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth',
                  })
                  props.setConfiguratorOpen(true)
                }}
              >
                Je veux l'intégrer à mon site !
              </StyledButton>
            )}
            <ThemeToggle mobile />
          </Right>
        </Flex>
      </Content>
      <LogosWrapper>
        <Logos to='https://datagir.ademe.fr/'>
          <Institution src={repufrancaise} alt='République Française' />
          <Institution src={ademe} alt='ADEME' />
          <Logo />
        </Logos>
      </LogosWrapper>
    </Wrapper>
  )
}
