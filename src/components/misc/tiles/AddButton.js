import React from 'react'
import styled from 'styled-components'
import { track } from 'utils/matomo'
import { MEDIA } from 'utils/styles'
import useModalContext from 'components/providers/ModalProvider'

const Wrapper = styled.button`
  align-items: center;
  background-color: var(--primary-50);
  border: none;
  border-radius: 1rem;
  color: var(--neutral-00);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  position: relative;
  width: calc(33.3333% - 1rem);

  &:hover h4,
  &:focus h4 {
    transform: scale(1.2);
  }

  ${MEDIA.LT.MEDIUM} {
    width: calc(33.3333% - 0.5rem);
  }
  ${MEDIA.LT.SMALL} {
    width: calc(50% - 0.375rem);
  }
`
const Title = styled.div`
  font-size: 5rem;
  height: 5rem;
  line-height: 1;
  margin-bottom: 0.5rem;
`
const Text = styled.p`
  font-size: 0.875rem;
  max-width: 8rem;
  text-align: center;
`
export default function AddButton() {
  const { setTiles } = useModalContext()

  return (
    <Wrapper
      onClick={() => {
        track('Comparateur carbone', 'Ajouter un équivalent', 'comparateur_ajouter_un_equivalent')
        setTiles(true)
      }}>
      <Title>+</Title>
      <Text>Ajouter un équivalent</Text>
    </Wrapper>
  )
}
