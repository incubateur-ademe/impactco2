import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  max-width: 30rem;
  height: 2.5rem;
  margin: 0 auto;
`
const Button = styled.button`
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;

  svg {
    display: block;
    width: 1.5rem;
    height: auto;

    path {
      fill: ${(props) => props.theme.colors.main};
    }
  }
`
export default function Categories() {
  return <Wrapper>Categories</Wrapper>
}
