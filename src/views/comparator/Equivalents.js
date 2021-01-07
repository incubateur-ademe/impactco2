import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import Equivalent from './equivalents/Equivalent'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -0.5em;
`
export default function Equivalents() {
  const [equivalents, setEquivalents] = useState([])
  useEffect(() => {
    fetch('/data/equivalents.json')
      .then(res => res.json())
      .then(res => setEquivalents(res))
  }, [])

  return (
    <Wrapper>
      {equivalents.map(equivalent => (
        <Equivalent key={equivalent.id} equivalent={equivalent} />
      ))}
    </Wrapper>
  )
}
