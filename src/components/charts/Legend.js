import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin: 0.5rem 0 1.5rem;
`
const Item = styled.div`
  font-size: 0.75rem;
  font-weight: 300;
  padding-left: 1.375rem;
  position: relative;

  &:before {
    background-color: ${(props) => props.color};
    border-radius: 0.25rem;
    content: '';
    height: 1.125rem;
    left: 0;
    position: absolute;
    top: 0;
    width: 1.125rem;
  }
`
const More = styled.sup`
  color: var(--primary-50);
  cursor: pointer;
  font-size: 0.625em;
`
export default function Legend(props) {
  return (
    <Wrapper className={props.className}>
      {props.items.map((item) => (
        <Item key={item.label} color={item.color}>
          <span dangerouslySetInnerHTML={{ __html: item.label }} />{' '}
          {item.onClick ? <More onClick={item.onClick}>(?)</More> : ''}
        </Item>
      ))}
    </Wrapper>
  )
}
