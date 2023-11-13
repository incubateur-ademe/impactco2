import React from 'react'
import { Container } from './Share.styles'

const Share = ({ takeScreenshot }: { takeScreenshot: () => void }) => {
  return (
    <Container>
      <button>Partager</button>
      <button>Integrer</button>
      <button onClick={takeScreenshot}>Télécharger</button>
    </Container>
  )
}

export default Share
