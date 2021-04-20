import React from 'react'
import styled, { keyframes } from 'styled-components'

const flash = keyframes`
  from,
  75%,
  87.5%,
  to {
    opacity: 1;
  }

  81.25%,
  93.75% {
    opacity: 0;
  }
`
const Wrapper = styled.span`
  position: relative;
  display: inline-block;
  line-height: 1.3;
  color: ${(props) => props.theme.colors.main};
  box-shadow: 0px 0.1875rem 0px 0px
    ${(props) => (props.filled ? 'transparent' : props.theme.colors.main)};
  animation: ${(props) => (!props.filled ? flash : 'none')} 4s infinite;
`
const Value = styled.span`
  text-transform: lowercase;
`
const Input = styled.select`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: inherit;
  font-weight: inherit;

  color: transparent;
  background-color: transparent;
  border: none;
  box-shadow: 0px 0.1em 0px 0px ${(props) => props.theme.colors.main};
  transition: box-shadow 300ms ease-out;
  appearance: none;
  cursor: pointer;

  &:focus {
    outline: none;
    box-shadow: 0px 0.25rem 0px 0px ${(props) => props.theme.colors.main};
  }
`
export default function FancySelect(props) {
  return (
    <Wrapper filled={props.value}>
      <Value
        dangerouslySetInnerHTML={{
          __html: props.options.find((option) => option.value === props.value)
            ? props.options.find((option) => option.value === props.value)
                .label + (props.suffix ? ' ' + props.suffix : '')
            : '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
        }}
      />
      <Input
        id={props.name}
        name={props.name}
        value={props.value ? props.value : ''}
        onChange={(e) => {
          props.onChange(e.currentTarget.value)
        }}
      >
        {props.options.map((option, index) => (
          <option
            key={option.value + '-' + index}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </Input>
    </Wrapper>
  )
}
