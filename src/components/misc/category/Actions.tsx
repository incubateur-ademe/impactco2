import React from 'react'
import { track } from 'utils/matomo'
import GhostButton from 'components/base/GhostButton'
import { Buttons } from './Actions.styles'

const Actions = ({
  onClick,
  tracking,
}: {
  onClick: (value: 'partager' | 'integrer' | 'telecharger') => void
  tracking: string
}) => {
  return (
    <Buttons>
      <GhostButton
        data-testid='header-share-button'
        icon='send-plane'
        onClick={() => {
          onClick('partager')
          track(tracking, 'Partager', `${tracking.replace(/ /g, '_').toLowerCase()}_partager`)
        }}>
        Partager
      </GhostButton>
      <GhostButton
        data-testid='header-integrate-button'
        icon='code-s-slash'
        onClick={() => {
          onClick('integrer')
          track(tracking, 'Integrer', `${tracking.replace(/ /g, '_').toLowerCase()}_integrer`)
        }}>
        Intégrer
      </GhostButton>
      <GhostButton
        icon='download'
        onClick={() => {
          onClick('telecharger')
        }}>
        Télécharger
      </GhostButton>
    </Buttons>
  )
}

export default Actions
