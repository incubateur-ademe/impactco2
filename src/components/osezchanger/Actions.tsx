import React, { Dispatch, SetStateAction } from 'react'
import GhostButton from './components/GhostButton'
import { Container } from './Actions.styles'
import { ModalType } from './modals/Modal'

const Actions = ({
  takeScreenshot,
  setModal,
}: {
  takeScreenshot: () => void
  setModal: Dispatch<SetStateAction<ModalType | undefined>>
}) => {
  return (
    <Container>
      <GhostButton icon='send-plane' onClick={() => setModal('share')}>
        Partager
      </GhostButton>
      <GhostButton icon='code-s-slash' onClick={() => setModal('integration')}>
        Intégrer
      </GhostButton>
      <GhostButton icon='download' onClick={takeScreenshot}>
        Télécharger
      </GhostButton>
    </Container>
  )
}

export default Actions
