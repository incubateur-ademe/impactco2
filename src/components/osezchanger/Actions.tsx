import React, { Dispatch, SetStateAction } from 'react'
import { track } from 'utils/matomo'
import GhostButton from '../base/GhostButton'
import { Container } from './Actions.styles'
import { OverScreenOsezChanger } from './overScreens/Type'

const Actions = ({
  takeScreenshot,
  setOverScreen,
}: {
  takeScreenshot: () => void
  setOverScreen: Dispatch<SetStateAction<OverScreenOsezChanger | undefined>>
}) => {
  return (
    <Container>
      <GhostButton
        colored
        size='sm'
        icon='send-plane'
        onClick={() => {
          track('OsezChanger', 'Partager', 'osez_changer_partager')
          setOverScreen('share')
        }}>
        Partager
      </GhostButton>
      <GhostButton
        colored
        size='sm'
        icon='code-s-slash'
        onClick={() => {
          track('OsezChanger', 'Integrer', 'osez_changer_integrer')
          setOverScreen('integration')
        }}>
        Intégrer
      </GhostButton>
      <GhostButton
        colored
        size='sm'
        icon='image'
        onClick={() => {
          takeScreenshot()
        }}>
        Télécharger
      </GhostButton>
    </Container>
  )
}

export default Actions
