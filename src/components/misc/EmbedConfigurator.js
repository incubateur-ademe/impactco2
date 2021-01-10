import React, { useContext } from 'react'
import styled from 'styled-components'

import { mq } from 'utils/styles'
import EquivalentsContext from 'utils/EquivalentsContext'
import StyleContext from 'utils/StyleContext'

import Button from 'components/base/Button'
import TitleDisplay from './embedConfigurator/TitleDisplay'
import NumberInput from './embedConfigurator/NumberInput'
import Themes from './embedConfigurator/Themes'
import Code from './embedConfigurator/Code'

const Wrapper = styled.div`
  display: ${(props) => (props.open ? 'block' : 'none')};
  background-color: ${(props) => props.theme.colors.second};
  border-bottom: 5px solid ${(props) => props.theme.colors.text};
  color: ${(props) => props.theme.colors.main};
  transition: all 600ms;
`
const Content = styled.div`
  position: relative;
  max-width: 45em;
  margin: 0 auto;
  padding: 1em 0;

  ${mq.small} {
    margin: 0 3vw;
  }
`
const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1em 0;

  ${mq.small} {
    flex-direction: column-reverse;
    align-items: flex-start;
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
export default function EmbedConfigurator() {
  const { configuratorOpen, setConfiguratorOpen } = useContext(StyleContext)

  const { setPopinOpen } = useContext(EquivalentsContext)

  return (
    <Wrapper open={configuratorOpen}>
      <Content>
        <ButtonClose onClick={() => setConfiguratorOpen(false)}>+</ButtonClose>

        <Button onClick={() => setPopinOpen(true)}>
          Choisir les équivalents
        </Button>
        <Flex>
          <TitleDisplay />
          <NumberInput />
        </Flex>

        <Themes />
        <Code />
      </Content>
    </Wrapper>
  )
}
