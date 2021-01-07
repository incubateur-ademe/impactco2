import React, { useState, useContext } from 'react'
import styled from 'styled-components'

import EquivalentsContext from 'utils/EquivalentsContext'
import Equivalent from './equivalents/Equivalent'
import More from './equivalents/More'
import ChoicePopin from './equivalents/ChoicePopin'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -0.5em;
`
export default function Equivalents() {
  const { equivalents } = useContext(EquivalentsContext)

  const [open, setOpen] = useState(false)

  return (
    <Wrapper>
      {equivalents
        .filter((equivalent) => equivalent.active)
        .map((equivalent) => (
          <Equivalent key={equivalent.id} equivalent={equivalent} />
        ))}
      <More onClick={() => setOpen(true)} />
      <ChoicePopin open={open} setOpen={setOpen} />
    </Wrapper>
  )
}
