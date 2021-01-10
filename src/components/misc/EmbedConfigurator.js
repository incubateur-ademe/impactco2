import React, { useContext } from 'react'
import styled from 'styled-components'

import { mq } from 'utils/styles'
import EquivalentsContext from 'utils/EquivalentsContext'
import Button from 'components/base/Button'

import TitleDisplay from './embedConfigurator/TitleDisplay'
import NumberInput from './embedConfigurator/NumberInput'
import Themes from './embedConfigurator/Themes'
import Code from './embedConfigurator/Code'

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.second};
  border-bottom: 5px solid ${(props) => props.theme.colors.text};
  color: ${(props) => props.theme.colors.main};
  transition: all 600ms;
`
const Content = styled.div`
  max-width: 45em;
  margin: 0 auto;
  padding: 1em 0;

  ${mq.small} {
    margin: 1em 3vw;
  }
`
const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1em;
`

export default function EmbedConfigurator() {
  const { setPopinOpen } = useContext(EquivalentsContext)

  return (
    <Wrapper>
      <Content>
        <Flex>
          <NumberInput />
          <Button onClick={() => setPopinOpen(true)}>
            Choisir les équivalents
          </Button>
        </Flex>
        <TitleDisplay />
        <Themes />
        <Code />
      </Content>
    </Wrapper>
  )
}
