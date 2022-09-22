import React from 'react'
import styled from 'styled-components'

import Item from './list/Item'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  ${(props) => props.theme.mq.small} {
    gap: 0.75rem;
  }
`

export default function List(props) {
  return (
    <Wrapper>
      {props.items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </Wrapper>
  )
}
