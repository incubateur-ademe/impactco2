import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.mainLight};
  border-radius: 0.125rem;
  height: 0.25rem;
  overflow: hidden;
  position: relative;
  width: 100%;

  &:before {
    background-color: ${(props) =>
      props.theme.colors[props.percent > 0.5 ? 'error' : props.percent > 0.075 ? 'warning' : 'main']};
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
  return <Wrapper percent={props.item.season ? props.item.value / 15 : 15} />
}
