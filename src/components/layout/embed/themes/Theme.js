import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: calc(50% - 1rem);
  margin: 0.5rem;
`
const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
  font-family: ${(props) => props.displayTheme.fonts};
  background-color: ${(props) => props.displayTheme.colors.background};
  border: 0.125rem solid
    ${(props) =>
      props.displayTheme.colors[props.current ? 'main' : 'background']};
  border-radius: 1rem;
  cursor: pointer;
`
const Title = styled.div`
  margin-bottom: 0.4em;
  font-size: 1.5em;
  font-weight: bold;
  color: ${(props) => props.displayTheme.colors.second};
`
const Tiles = styled.div`
  display: flex;
  margin: 0 -0.5em;
`
const Tile = styled.div`
  flex: 1;
  height: 2em;
  margin: 0 0.5em;
  background-color: ${(props) =>
    props.active
      ? props.displayTheme.colors.main
      : props.displayTheme.colors.background};
  border: 2px solid
    ${(props) =>
      props.active
        ? props.displayTheme.colors.main
        : props.displayTheme.colors.text};
  border-radius: 0.5em;
`
export default function Theme(props) {
  return (
    <Wrapper>
      <Content
        onClick={props.onClick}
        current={props.current}
        displayTheme={props.theme}
      >
        <Title displayTheme={props.theme}>{props.theme.name}</Title>
        <Tiles>
          <Tile displayTheme={props.theme} />
          <Tile displayTheme={props.theme} />
          <Tile active displayTheme={props.theme} />
        </Tiles>
      </Content>
    </Wrapper>
  )
}
