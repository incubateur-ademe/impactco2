import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.label`
  cursor: pointer;
  display: flex;
  font-size: ${(props) => (props.small ? '1em' : '1.2em')};
  position: relative;

  &:before {
    border: 2px solid ${(props) => props.color || 'var(--primary-50)'};
    border-radius: 0.25rem;
    content: '';
    height: 1.1em;
    left: 0;
    pointer-events: none;
    position: absolute;
    top: 0;
    width: 1.1em;
  }

  &:after {
    align-items: center;
    color: ${(props) => props.color || 'var(--primary-50)'};
    content: '✓';
    display: flex;
    font-size: 1.75em;
    justify-content: center;
    left: 0;
    line-height: 0.7;
    opacity: ${(props) => (props.checked ? 1 : 0)};
    pointer-events: none;
    position: absolute;
    top: 0;
  }
`
const Input = styled.input`
  cursor: pointer;
  height: 0;
  margin-right: ${(props) => (props.label ? '0.625em' : 0)};
  opacity: 0;

  &:focus {
    opacity: 0.5;
  }
`
const Label = styled.span`
  font-size: 0.833333333em;
  white-space: nowrap;
`
export default function Checkbox(props) {
  return (
    <Wrapper
      checked={props.checked}
      small={props.small}
      color={props.color}
      className={props.className}
      htmlFor={props.name}>
      <Input
        id={props.name}
        type='checkbox'
        checked={props.checked}
        label={props.children || props.label}
        onChange={(e) => props.onChange(e.target.checked)}
      />
      {(props.children || props.label) && <Label>{props.children || props.label}</Label>}
    </Wrapper>
  )
}
