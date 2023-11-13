import React from 'react'
import { Container } from './Action.styles'

const Action = ({ image, imageAlt, text, href }: { image: string; imageAlt: string; text: string; href: string }) => {
  return (
    <Container href={href} target='_blank' rel='noreferrer noopener'>
      <img src={image} alt={imageAlt} />
      {text}
    </Container>
  )
}

export default Action
