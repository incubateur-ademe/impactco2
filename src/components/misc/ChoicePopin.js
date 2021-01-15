import React, { useContext } from 'react'
import styled from 'styled-components'

import EquivalentsContext from 'utils/EquivalentsContext'
import Button from 'components/base/Button'

import Popin from 'components/base/Popin'
import EquivalentSelector from './choicePopin/EquivalentSelector'

const Title = styled.h2`
  text-align: center;
`

export default function ChoicePopin(props) {
  const { popinOpen, setPopinOpen } = useContext(EquivalentsContext)

  return (
    <Popin open={popinOpen} setOpen={setPopinOpen}>
      <Title>Équivalents</Title>
      <EquivalentSelector />
      <Button onClick={() => setPopinOpen(false)}>Valider</Button>
    </Popin>
  )
}
