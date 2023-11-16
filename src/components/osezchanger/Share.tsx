import Image from 'next/image'
import React from 'react'
import { Button, Container } from './Share.styles'

const Share = ({ takeScreenshot }: { takeScreenshot: () => void }) => {
  return (
    <Container>
      <Button>
        <Image src='/icons/send-plane.svg' alt='' width={16} height={16} /> Partager
      </Button>
      <Button>
        <Image src='/icons/code-s-slash.svg' alt='' width={16} height={16} /> Integrer
      </Button>
      <Button onClick={takeScreenshot}>
        <Image src='/icons/download.svg' alt='' width={16} height={16} /> Télécharger
      </Button>
    </Container>
  )
}

export default Share
