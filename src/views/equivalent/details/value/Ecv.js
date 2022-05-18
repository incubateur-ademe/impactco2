import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import Graph from './ecv/Graph'

const Wrapper = styled.div`
  margin-bottom: 1.5rem;
  padding: 1rem 1.5rem 0.5rem;
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.background};
  border-radius: 0 0 1rem 1rem;
`
const List = styled.ul`
  list-style: none;
  margin: 0 -0.5rem;
  padding: 0;

  ${(props) => props.theme.mq.small} {
    column-count: 1;
  }
`
export default function Ecv(props) {
  const [ecvToDisplay, setEcvToDisplay] = useState([])
  useEffect(() => {
    props.equivalent &&
      setEcvToDisplay(
        props.equivalent.ecv.sort((a, b) => (a.value < b.value ? 1 : -1))
      )
  }, [props.equivalent])

  return ecvToDisplay && props.open ? (
    <Wrapper>
      <List>
        {ecvToDisplay.map((item) => (
          <Graph item={item} equivalent={props.equivalent} />
        ))}
      </List>
    </Wrapper>
  ) : null
}
