import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.mainLight};
  border-radius: 0.125rem;
  height: 0.25rem;
  margin-bottom: 0.5rem;
  overflow: hidden;
  position: relative;
  width: 100%;

  &:before {
    background-color: ${(props) => props.theme.colors.main};
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transform: scaleX(${(props) => props.percent});
    transform-origin: left;
  }
`
export default function Chart(props) {
  return <Wrapper percent={props.item.value / props.max} />
}
