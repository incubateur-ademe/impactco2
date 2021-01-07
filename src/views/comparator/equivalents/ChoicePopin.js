import React from 'react'
import styled from 'styled-components'

import { colors } from 'utils/styles'
import Button from 'components/base/Button'

import EquivalentSelector from './choicePopin/EquivalentSelector'

const Wrapper = styled.div`
  position: fixed;
  z-index: 900;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: ${(props) => (props.open ? 'inherit' : 'none')};
`
const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, ${(props) => (props.open ? 0.6 : 0)});
  transition: background-color 300ms ease-in-out;
`
const Popin = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 25em;
  max-height: 90vh;
  margin: 2em;
  padding: 2em;
  color: ${colors.main};
  background-color: ${colors.text};
  border-radius: 1em;
  opacity: ${(props) => (props.open ? 1 : 0)};
  transform: scale(${(props) => (props.open ? 1 : 0.7)})
    translateY(${(props) => (props.open ? 0 : '10em')});
  transition: all 300ms ease-in-out;
`
const Title = styled.h2`
  text-align: center;
`
const ButtonClose = styled.div`
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  font-size: 2em;
  font-weight: 700;
  transform: rotate(45deg);
  cursor: pointer;
  line-height: 0.5;
`

export default function ChoicePopin(props) {
  return (
    <Wrapper open={props.open}>
      <Background open={props.open} onClick={() => props.setOpen(false)} />
      <Popin open={props.open}>
        <ButtonClose onClick={() => props.setOpen(false)}>+</ButtonClose>
        <Title>Équivalents</Title>
        <EquivalentSelector />
        <Button onClick={() => props.setOpen(false)}>Valider</Button>
      </Popin>
    </Wrapper>
  )
}
