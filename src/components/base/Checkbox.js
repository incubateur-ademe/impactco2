import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.label`
  position: relative;
  display: flex;
  font-size: ${(props) => (props.small ? '1em' : '1.2em')};
  cursor: pointer;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 1.1em;
    width: 1.1em;
    border: 2px solid ${(props) => props.color || props.theme.colors.main};
    border-radius: 0.25rem;
    pointer-events: none;
  }

  &:after {
    content: '✓';
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.color || props.theme.colors.main};
    font-size: 1.75em;
    line-height: 0.7;
    opacity: ${(props) => (props.checked ? 1 : 0)};
    pointer-events: none;
  }
`
const Input = styled.input`
  margin-right: ${(props) => (props.label ? '0.625em' : 0)};
  opacity: 0;
  cursor: pointer;
  height: 0;

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
      htmlFor={props.name}
    >
      <Input
        id={props.name}
        type='checkbox'
        checked={props.checked}
        label={props.children || props.label}
        onChange={(e) => props.onChange(e.target.checked)}
      />
      {(props.children || props.label) && (
        <Label>{props.children || props.label}</Label>
      )}
    </Wrapper>
  )
}
