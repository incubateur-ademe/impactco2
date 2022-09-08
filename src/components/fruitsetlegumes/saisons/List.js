import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
`
const Item = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(33.3333% - 1rem);
  padding: 1.125rem 0.25rem;
  background-color: ${(props) =>
    props.theme.colors[props.background ? 'textLight' : 'second']};
  border-radius: 1rem;

  ${(props) => props.theme.mq.medium} {
    width: calc(33.3333% - 0.5rem);
  }
  ${(props) => props.theme.mq.small} {
    width: calc(50% - 0.375rem);
  }
`
export default function List(props) {
  return (
    <Wrapper>
      {props.items.map((item) => (
        <Item key={item.id}>{item.title}</Item>
      ))}
    </Wrapper>
  )
}
