import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 1rem;
  font-size: 1.2em;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 1.2em;
    width: 1.2em;
    border: 2px solid ${(props) => props.theme.colors.main};
    border-radius: 0.25rem;
    cursor: pointer;
  }

  &:after {
    content: '✓';
    position: absolute;
    top: 0;
    left: 0;
    color: ${(props) => props.theme.colors.main};
    text-align: center;
    width: calc(1.2rem + 4px);
    font-size: 2em;
    line-height: calc(1.2rem + 4px);
    opacity: ${(props) => (props.checked ? 1 : 0)};
    cursor: pointer;
  }
`
const Input = styled.input`
  margin-right: 1em;
  opacity: 0;
  pointer-events: none;
`
const Label = styled.label``
export default function Checkbox(props) {
  return (
    <Wrapper
      checked={props.option.value}
      onClick={(e) => props.option.setter((prev) => !prev)}
    >
      <Input
        type='checkbox'
        checked={props.option.value}
        onChange={(e) => props.option.setter(e.currentTarget.checked)}
      />
      <Label>{props.option.label}</Label>
    </Wrapper>
  )
}
