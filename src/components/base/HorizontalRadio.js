import React, { useMemo } from 'react'
import styled from 'styled-components'

import RadioInput from './horizontalRadio/RadioInput'

const Wrapper = styled.div`
  display: flex;
  border: 0.125rem solid ${(props) => props.color || props.theme.colors.main};
  border-radius: 0.5rem;
`
export default function HorizontalRadio(props) {
  return (
    <Wrapper className={props.className} color={props.color}>
      {props.options.map((option) => (
        <RadioInput
          key={option.value}
          id={props.name + ' ' + option.value}
          name={props.name}
          value={option.value}
          label={option.label}
          checked={option.value === props.value}
          color={props.color}
          onChange={(e) => {
            props.onChange(e.currentTarget.value)
          }}
        />
      ))}
    </Wrapper>
  )
}
