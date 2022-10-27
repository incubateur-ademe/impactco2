import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 1rem;
  margin-bottom: 1rem;
  border-radius: 1rem;
  overflow: hidden;
`
const Item = styled.div`
  width: ${(props) => props.percent * 100}%;
  height: 100%;
  background-color: ${(props) => props.color || props.theme.colors.main};
  transition: width 300ms ease-out;
`
export default function StackedChart(props) {
  return (
    <Wrapper className={props.className}>
      {props.items.map((item) => (
        <Item
          key={item.id}
          color={item.color}
          percent={item.value / props.total}
        />
      ))}
    </Wrapper>
  )
}
