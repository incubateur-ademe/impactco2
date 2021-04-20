import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: calc(50% - 1em);
  margin: 0.5em;

  ${(props) => props.theme.mq.medium} {
    width: calc(25% - 1em);
  }
  ${(props) => props.theme.mq.small} {
    width: calc(50% - 1em);
  }
`
const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: 1em;
  font-family: ${(props) => props.displayTheme.fonts};
  background-color: ${(props) => props.displayTheme.colors.background};
  border-radius: 1em;
  box-shadow: ${(props) =>
    props.current
      ? 'rgba(0, 0, 0, 0.64) 0px 0px 8px 0px, rgba(0, 0, 0, 0.16) 0px 0px 15px 0px, rgba(0, 0, 0, 0.48) 0px 0px 20px 4px'
      : 'rgba(0, 0, 0, 0.16) 0px 0px 8px 0px, rgba(0, 0, 0, 0.04) 0px 0px 15px 0px, rgba(0, 0, 0, 0.12) 0px 0px 20px 4px'}!important;
  cursor: pointer;
`
const Title = styled.h4`
  margin-bottom: 0.4em;
  font-size: 1.5em;
  color: ${(props) => props.displayTheme.colors.text};
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
      : props.displayTheme.colors.second};
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
