import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin-bottom: 1.5rem;
`
const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`
const Input = styled.select`
  appearance: none;
  background-color: transparent;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' viewBox='0 0 24 24' ><path fill='%23${(
    props
  ) =>
    (props.color || props.theme.colors.main).replace(
      '#',
      ''
    )}' d='M12,13.1l5-4.9l1.4,1.4L12,15.9L5.6,9.5l1.4-1.4L12,13.1z'/></svg>");
  background-position: calc(100% - 0.5em) 50%;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  border: 0.125rem solid ${(props) => props.color || props.theme.colors.main};
  border-radius: 0.5em;
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;
  padding: 0.5em 2em 0.5em 1em;
`
export default function Select(props) {
  return (
    <Wrapper className={props.className}>
      {props.label && <Label htmlFor={props.name}>{props.label}</Label>}
      {props.getLabel && <Label htmlFor={props.name}>{props.getLabel()}</Label>}
      <Input
        id={props.name}
        name={props.name}
        value={props.value}
        color={props.color}
        onChange={(e) => {
          props.onChange({ value: e.currentTarget.value, name: props.name })
        }}>
        {props.children}
      </Input>
    </Wrapper>
  )
}
