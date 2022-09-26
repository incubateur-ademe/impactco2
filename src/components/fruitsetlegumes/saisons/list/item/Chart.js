import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0.25rem;
  background-color: ${(props) => props.theme.colors.mainLight};
  border-radius: 0.125rem;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    transform: scaleX(${(props) => props.percent});
    transform-origin: left;
    background-color: ${(props) =>
      props.theme.colors[
        props.percent > 0.5
          ? 'error'
          : props.percent > 0.075
          ? 'warning'
          : 'main'
      ]};
  }
`
export default function Chart(props) {
  return <Wrapper percent={props.item.season ? props.item.value / 15 : 15} />
}
