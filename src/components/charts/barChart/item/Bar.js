import React from 'react'
import styled from 'styled-components'

import Value from './bar/Value'

const Chart = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`
const Container = styled.div`
  position: relative;
  width: ${(props) => props.percent * 100}%;
  height: 1.75rem;
  transform-origin: left;
  background-color: ${(props) => props.color || props.theme.colors.main};
  border-radius: 1rem;
`
export default function Bar(props) {
  return (
    <Chart>
      <Container percent={props.value / props.max} color={props.color}>
        <Value value={props.value} max={props.max} />
      </Container>
    </Chart>
  )
}
