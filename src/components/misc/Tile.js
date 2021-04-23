import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 33.333%;
  padding: 0.5rem;

  ${(props) => props.theme.mq.small} {
    width: 50%;
  }
`
const Content = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 1em;
  border-radius: 1em;
  text-align: center;
  color: ${(props) =>
    props.active ? props.theme.colors.second : props.theme.colors.ter};
  background-color: ${(props) =>
    props.active ? props.theme.colors.main : props.theme.colors.second};
  border: 2px solid
    ${(props) =>
      props.active ? props.theme.colors.main : props.theme.colors.text};
  cursor: ${(props) => (props.active ? 'pointer' : 'inherit')};
  overflow: hidden;

  &:hover {
    box-shadow: ${(props) =>
      props.active
        ? 'rgba(0, 0, 0, 0.16) 0px 0px 8px 0px, rgba(0, 0, 0, 0.04) 0px 0px 15px 0px, rgba(0, 0, 0, 0.12) 0px 0px 20px 4px;'
        : 'none'};
  }
`
export default function Tile(props) {
  return (
    <Wrapper onClick={props.onClick}>
      <Content active={props.active}>{props.children}</Content>
    </Wrapper>
  )
}
