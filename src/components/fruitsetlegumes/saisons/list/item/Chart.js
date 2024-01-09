import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  background-color: var(--primary-20);
  border-radius: 0.125rem;
  height: 0.25rem;
  overflow: hidden;
  position: relative;
  width: 100%;

  &:before {
    background-color: ${(props) =>
      props.$percent > 0.5 ? 'error' : props.$percent > 0.075 ? 'var(--critical-50)' : 'var(--primary-50)'};
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transform: scaleX(${(props) => props.$percent});
    transform-origin: left;
  }
`
export default function Chart(props) {
  return <Wrapper $percent={props.item.season ? props.item.value / 15 : 15} />
}
