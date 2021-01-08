import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  flex: 1;
  padding: 1em;
  margin: 0.5em;
  font-family: ${(props) => props.displayTheme.fonts};
  background-color: ${(props) => props.displayTheme.colors.background};
  border-radius: 1em;
  box-shadow: ${(props) =>
    props.current
      ? 'rgba(0, 0, 0, 0.64) 0px 0px 8px 0px, rgba(0, 0, 0, 0.16) 0px 0px 15px 0px, rgba(0, 0, 0, 0.48) 0px 0px 20px 4px;'
      : 'rgba(0, 0, 0, 0.16) 0px 0px 8px 0px, rgba(0, 0, 0, 0.04) 0px 0px 15px 0px, rgba(0, 0, 0, 0.12) 0px 0px 20px 4px;'};
  cursor: pointer;
`
const Title = styled.h4`
  margin-bottom: 0.4em;
  font-size: 1.5em;
  color: ${(props) => props.displayTheme.colors.text};
`
const Text = styled.p`
  color: ${(props) => props.displayTheme.colors.text};
`
export default function Theme(props) {
  return (
    <Wrapper
      onClick={props.onClick}
      current={props.current}
      displayTheme={props.theme}
    >
      <Title displayTheme={props.theme}>{props.theme.name}</Title>
      <Text displayTheme={props.theme}>Lorem ipsum dolor sit amet :)</Text>
    </Wrapper>
  )
}
