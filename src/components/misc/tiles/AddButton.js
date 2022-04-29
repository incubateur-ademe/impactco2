import React, { useContext } from 'react'
import styled from 'styled-components'

import ModalContext from 'utils/ModalContext'

const Wrapper = styled.button`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 12.75rem;
  margin: 0.75rem;
  padding: 1rem;
  color: ${(props) => props.theme.colors.background};
  background-color: ${(props) => props.theme.colors.main};
  border: none;
  border-radius: 1rem;
  cursor: pointer;

  ${(props) => props.theme.mq.small} {
    width: calc(50% - 0.75rem);
    margin: 0.375rem;
  }

  &:hover h4,
  &:focus h4 {
    transform: scale(1.2);
  }
`
const Title = styled.h4`
  height: 5rem;
  margin-bottom: 0.5rem;
  font-size: 5rem;
  line-height: 1;
  transition: transform 300ms ease-out;
`
const Text = styled.p`
  max-width: 8rem;
  font-size: 0.875rem;
  text-align: center;
`
export default function AddButton() {
  const { setTiles } = useContext(ModalContext)

  return (
    <Wrapper onClick={() => setTiles(true)}>
      <Title>+</Title>
      <Text>Ajouter un equivalent</Text>
    </Wrapper>
  )
}
