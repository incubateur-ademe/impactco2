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
      <GhostButton
        icon='send-plane'
        onClick={() => {
          window.please?.track(['trackEvent', 'OsezChanger', 'Partager', 'osez_changer_partager'])
          setModal('share')
        }}>
        Partager
      </GhostButton>
      <GhostButton
        icon='code-s-slash'
        onClick={() => {
          window.please?.track(['trackEvent', 'OsezChanger', 'Integrer', 'osez_changer_integrer'])
          setModal('integration')
        }}>
        Intégrer
      </GhostButton>
      <GhostButton
        icon='download'
        onClick={() => {
          window.please?.track(['trackEvent', 'OsezChanger', 'Telecharger', 'osez_changer_telecharger'])
          takeScreenshot()
        }}>
        Télécharger
      </GhostButton>
    </Container>
  )
}

export default Actions
