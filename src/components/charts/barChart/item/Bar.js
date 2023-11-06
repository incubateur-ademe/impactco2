import React from 'react'
import styled from 'styled-components'
import Value from './bar/Value'

const Wrapper = styled.div`
  height: 1.75rem;
  position: relative;
  transform-origin: left;
  width: ${(props) => props.percent * 100}%;
`
const Container = styled.div`
  background-color: ${(props) => props.color || props.theme.colors.main};
  border-radius: 1rem;
  height: 100%;
  overflow: hidden;
  position: relative;
  width: 100%;
`
const Usage = styled.div`
  background-color: ${(props) => props.color || props.theme.colors.mainDark};
  bottom: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: ${(props) => props.percent * 100}%;
`
export default function Bar(props) {
  return (
    <Wrapper percent={props.value / props.max}>
      <Container color={props.color}>
        {props.usage && <Usage percent={props.usage / props.value} color={props.color} />}
      </Container>
      <Value value={props.value} max={props.max} />
    </Wrapper>
  )
}
