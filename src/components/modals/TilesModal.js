import React, { useContext } from 'react'
import styled from 'styled-components'

import ModalContext from 'utils/ModalContext'
import DataContext from 'utils/DataContext'
import Modal from 'components/base/Modal'
import Button from 'components/base/Button'
import Equivalent from './tilesModal/Equivalent'

const Title = styled.h1``
const Text = styled.p``
const Equivalents = styled.div`
  margin-bottom: 3rem;
`
const StyledButtonWrapper = styled(Button.Wrapper)`
  position: fixed;
  bottom: 0;
  left: 0.5rem;
  right: 0.5rem;
  padding: 0.5rem;
  background-color: ${(props) => props.theme.colors.background};
  border-top: 0.0625rem solid ${(props) => props.theme.colors.footer};
  border-radius: 0 0 1rem 1rem;
`
export default function TilesModal() {
  const { tiles: open, setTiles: setOpen } = useContext(ModalContext)

  const { equivalents, tiles, setTiles } = useContext(DataContext)

  return (
    <Modal open={open} setOpen={setOpen}>
      <Title>Ajouter ou enlever des équivalents</Title>
      <Text>
        Sélectionnez (ou désélectionnez) des équivalents pour créer votre
        infographie personnalisée.
      </Text>
      <Equivalents>
        {equivalents.map((equivalent) => (
          <Equivalent
            key={equivalent.slug}
            equivalent={equivalent}
            checked={tiles.find((tile) => tile === equivalent)}
            setChecked={(checked) =>
              setTiles((prevTiles) =>
                checked
                  ? [...prevTiles, equivalent]
                  : prevTiles.filter((tile) => tile.id !== equivalent.slug)
              )
            }
          />
        ))}
      </Equivalents>
      <StyledButtonWrapper>
        <Button onClick={() => setOpen(false)}>Valider et fermer</Button>
      </StyledButtonWrapper>
    </Modal>
  )
}
