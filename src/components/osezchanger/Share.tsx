import React from 'react'
import GhostButton from './components/GhostButton'
import { Container } from './Share.styles'

const Share = ({ takeScreenshot }: { takeScreenshot: () => void }) => {
  return (
    <Container>
      <GhostButton icon='send-plane'>Partager</GhostButton>
      <GhostButton icon='code-s-slash'>Intégrer</GhostButton>
      <GhostButton icon='download' onClick={takeScreenshot}>
        Télécharger
      </GhostButton>
    </Container>
  )
}

export default Share
