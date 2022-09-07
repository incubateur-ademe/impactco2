import React from 'react'
import styled from 'styled-components'

import Value from './bar/Value'

const Wrapper = styled.div`
  position: relative;
  width: ${(props) => props.percent * 100}%;
  height: 1.75rem;
  transform-origin: left;
`
const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.color || props.theme.colors.main};
  border-radius: 1rem;
  overflow: hidden;
`
const Usage = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: ${(props) => props.percent * 100}%;
  background-color: ${(props) => props.color || props.theme.colors.mainDark};
`
export default function Bar(props) {
  return (
    <Wrapper percent={props.value / props.max}>
      <Container color={props.color}>
        {props.usage && (
          <Usage percent={props.usage / props.value} color={props.color} />
        )}
      </Container>
      <Value value={props.value} max={props.max} />
    </Wrapper>
  )
}
