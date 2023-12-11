import Image from 'next/image'
import React from 'react'
import { track } from 'utils/matomo'
import { Container, Text } from './Resource.styles'

const Resource = ({ image, text, href }: { image: string; text: string; href: string }) => {
  return (
    <Container
      href={href}
      target='_blank'
      rel='noreferrer noopener'
      onClick={() => {
        track('OsezChanger', `Ressource-${href}`, `osez_changer_ressource_${href}`)
      }}>
      <Image src={image} alt='' width={100} height={86} />
      <Text>{text}</Text>
    </Container>
  )
}

export default Resource
