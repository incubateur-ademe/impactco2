import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.span`
  color: ${(props) => props.color || 'var(--primary-50)'};
  display: inline-block;
  line-height: 1.3;
  position: relative;
`
const Input = styled.select`
  appearance: none;
  background-color: transparent;
  border: none;
  box-shadow: 0px 0.1em 0px 0px ${(props) => props.color || 'var(--primary-50)'};
  color: transparent;
  cursor: pointer;
  font-size: inherit;
  font-weight: inherit;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`

export default function FancySelect(props) {
  return (
    <Wrapper color={props.color}>
      <span
        data-testid='fancy-select-label'
        dangerouslySetInnerHTML={{
          __html: props.options.find((option) => option.value === props.value)
            ? props.options.find((option) => option.value === props.value).label
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
        color={props.color}>
        {props.options.map((option, index) => (
          <option key={option.value + '-' + index} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </Input>
    </Wrapper>
  )
}
