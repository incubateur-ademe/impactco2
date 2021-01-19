import React, { useContext } from 'react'
import styled from 'styled-components'

import ModalContext from 'utils/ModalContext'
import Button from '@bit/datagir.simulateurs.button'

import Modal from '@bit/datagir.simulateurs.modal'
import EquivalentSelector from './equivalentsModal/EquivalentSelector'

const Title = styled.h2`
  text-align: center;
`

export default function EquivalentsModal() {
  const { equivalents, setEquivalents } = useContext(ModalContext)

  return (
    <Modal open={equivalents} setOpen={setEquivalents} textColor={'main'}>
      <Title>Équivalents</Title>
      <EquivalentSelector />
      <Button onClick={() => setEquivalents(false)}>Valider</Button>
    </Modal>
  )
}
