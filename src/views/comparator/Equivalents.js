import React, { useContext } from 'react'
import styled from 'styled-components'

import EquivalentsContext from 'utils/EquivalentsContext'
import Equivalent from './equivalents/Equivalent'
import More from './equivalents/More'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -0.5em;
`
export default function Equivalents() {
  const { equivalents, setPopinOpen } = useContext(EquivalentsContext)

  return (
    <Wrapper>
      {equivalents
        .filter((equivalent) => equivalent.active)
        .map((equivalent) => (
          <Equivalent key={equivalent.id} equivalent={equivalent} />
        ))}
      <More onClick={() => setPopinOpen(true)} />
    </Wrapper>
  )
}
