import React from 'react'
import Tag from 'components/misc/tag/Tag'
import { Container, Text } from './MobileActions.styles'

const MobileAction = () => {
  return (
    <Container href='#osez-changer'>
      <Tag text='Nouveau' />
      <Text>Découvrir le challenge chaussures !</Text>
    </Container>
  )
}

export default MobileAction
