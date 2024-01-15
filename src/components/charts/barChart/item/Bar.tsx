import React from 'react'
import styled from 'styled-components'
import Value from './bar/Value'

const Wrapper = styled.div<{ $percent: number }>`
  height: 1.75rem;
  position: relative;
  transform-origin: left;
  width: ${(props) => props.$percent * 100}%;
`
const Container = styled.div<{ $color?: string }>`
  background-color: ${(props) => props.$color || 'var(--primary-50)'};
  border-radius: 1rem;
  height: 100%;
  overflow: hidden;
  position: relative;
  width: 100%;
`
const Usage = styled.div<{ $percent: number; $color?: string }>`
  background-color: ${(props) => props.$color || 'var(--primary-80)'};
  bottom: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: ${(props) => props.$percent * 100}%;
`
export default function Bar({
  value,
  max,
  usage,
  color,
}: {
  value: number
  max: number
  usage?: number
  color?: string
}) {
  return (
    <Wrapper $percent={value / max}>
      <Container color={color}>{usage !== undefined && <Usage $percent={usage / value} color={color} />}</Container>
      <Value value={value} max={max} />
    </Wrapper>
  )
}
