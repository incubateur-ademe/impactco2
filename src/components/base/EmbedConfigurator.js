import React from 'react'
import styled from 'styled-components'

import Checkbox from './embedConfigurator/Checkbox'
import TextInput from './embedConfigurator/TextInput'
import Themes from './embedConfigurator/Themes'
import Code from './embedConfigurator/Code'
import Button from 'components/base/Button'

const Wrapper = styled.div`
  display: ${(props) => (props.open ? 'block' : 'none')};
  width: 30em;
  background-color: ${(props) => props.theme.colors.second};
  border-left: 5px solid ${(props) => props.theme.colors.main};
  color: ${(props) => props.theme.colors.main};
  transition: all 600ms;

  ${(props) => props.theme.mq.medium} {
    width: auto;
    border-left: none;
    border-bottom: 2px solid ${(props) => props.theme.colors.main};
  }
`
const Content = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  max-width: 30em;
  height: 100%;
  margin: 0 auto;
  padding: 2em;
  overflow-y: scroll;
  overflow-x: hidden;

  ${(props) => props.theme.mq.medium} {
    position: relative;
    max-width: 45em;
    height: auto;
    overflow: inherit;
  }
  ${(props) => props.theme.mq.small} {
    margin: 0 3vw;
    padding: 1em 0;
  }
`
const ButtonClose = styled.div`
  position: absolute;
  top: 0.25em;
  right: 0.1em;
  font-size: 3em;
  font-weight: 700;
  transform: rotate(45deg);
  cursor: pointer;
  line-height: 0.5;
`
const Title = styled.h2`
  font-size: 2em;
  margin-bottom: 1rem;
`
const Subtitle = styled.h3`
  font-size: 1.3em;
  margin-bottom: 1rem;
`
const ButtonWrapper = styled.div`
  margin-bottom: 1em;
`
export default function EmbedConfigurator(props) {
  return (
    <Wrapper open={props.configuratorOpen}>
      <Content>
        <ButtonClose
          onClick={() => {
            props.options.map((option) => {
              if (option.default) {
                option.setter(option.default)
              }
              return option
            })
            props.setTheme('default')
            props.setConfiguratorOpen(false)
          }}
        >
          +
        </ButtonClose>
        <Title>Intégrer le simulateur</Title>
        <Code id={props.id} />
        <Subtitle>Options d'intégration</Subtitle>
        {props.options.map((option) =>
          option.type === 'boolean' ? (
            <Checkbox option={option} />
          ) : option.type === 'button' ? (
            <ButtonWrapper>
              <Button onClick={option.setter}>{option.label}</Button>
            </ButtonWrapper>
          ) : (
            <TextInput option={option} />
          )
        )}
        <Themes
          themes={props.themes}
          theme={props.theme}
          setTheme={props.setTheme}
        />
      </Content>
    </Wrapper>
  )
}
