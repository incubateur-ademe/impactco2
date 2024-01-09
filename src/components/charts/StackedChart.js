import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  border-radius: 4rem;
  display: flex;
  height: 1rem;
  margin-bottom: 1rem;
  overflow: hidden;
  width: 100%;
`
const Item = styled.div`
  background-color: ${(props) => props.color || 'var(--primary-50)'};
  height: 100%;
  width: ${(props) => props.percent * 100}%;
`
export default function StackedChart(props) {
  return (
    <Wrapper className={props.className}>
      {props.items.map((item) => (
        <Item key={item.id} color={item.color} percent={item.value / props.total} />
      ))}
    </Wrapper>
  )
}
