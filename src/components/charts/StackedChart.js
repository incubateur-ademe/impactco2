import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  overflow: hidden;
`
const Item = styled.div`
  width: ${(props) => props.percent * 100}%;
  height: 100%;
  background-color: ${(props) => props.color || props.theme.colors.main};
`
export default function StackedChart(props) {
  return (
    <Wrapper className={props.className}>
      {props.items.map((item) => (
        <Item color={item.color} percent={item.value / props.total} />
      ))}
    </Wrapper>
  )
}
