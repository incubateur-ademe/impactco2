import React from 'react'
import useParamContext from 'components/providers/ParamProvider'
import Tag from 'components/misc/tag/Tag'
import { Container, Text } from './New.styles'

const New = () => {
  const { setLanguage } = useParamContext()
  return (
    <Container
      onClick={() => {
        setLanguage('en')
      }}>
      <Tag text='Nouveau' />
      <Text>
        Le simulateur transport est maintenant disponible <u>en anglais</u> !
      </Text>
    </Container>
  )
}

export default New
