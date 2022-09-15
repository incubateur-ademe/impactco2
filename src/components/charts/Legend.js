import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin: 0.5rem 0 1.5rem;
`
const Item = styled.div`
  position: relative;
  padding-left: 1.375rem;
  font-size: 0.75rem;
  font-weight: 300;

  &:before {
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    width: 1.125rem;
    height: 1.125rem;
    background-color: ${(props) => props.color};
    border-radius: 0.25rem;
  }
`
const More = styled.sup`
  font-size: 0.625em;
  color: ${(props) => props.theme.colors.main};
  cursor: pointer;
`
export default function Legend(props) {
  return (
    <Wrapper className={props.className}>
      {props.items.map((item) => (
        <Item key={item.label} color={item.color}>
          {item.label}{' '}
          {item.onClick ? <More onClick={item.onClick}>(?)</More> : ''}
        </Item>
      ))}
    </Wrapper>
  )
}
