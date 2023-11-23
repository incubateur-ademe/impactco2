import React from 'react'
import { Container } from './Tag.styles'

const Tag = ({ text }: { text: string }) => {
  return <Container>{text}</Container>
}

export default Tag
