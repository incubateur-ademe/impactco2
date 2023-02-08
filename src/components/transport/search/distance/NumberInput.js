import React, { useState } from 'react'
import styled from 'styled-components'

import TextInput from 'components/base/TextInput'

const Wrapper = styled.form`
  display: flex;
  margin: 0 auto;
  position: relative;
`
const StyledTextInput = styled(TextInput)`
  margin: 0;
  width: 12rem;
  input {
    border-color: ${(props) => props.theme.colors.main};

    &:focus {
      box-shadow: 0 0 0 0.125rem ${(props) => props.theme.colors.mainLight};
      outline: none;
    }
  }
`
const Button = styled.button`
  background: ${(props) => props.theme.colors.main};
  border: none;
  border-radius: 0 1rem 1rem 0;
  bottom: 0;
  color: ${(props) => props.theme.colors.background};
  cursor: pointer;
  padding: 0 0.75rem;
  position: absolute;
  right: -0.1rem;
  top: 0;

  &:focus {
    opacity: 1;
  }

  svg {
    display: block;
    height: auto;
    width: 1.25rem;

    path {
      fill: ${(props) => props.theme.colors.main};
    }
  }
`

export default function NumberInput(props) {
  const [km, setKm] = useState(props.km)
  return (
    <Wrapper
      onSubmit={(e) => {
        e.preventDefault()
        props.setKm(km)
      }}
    >
      <StyledTextInput
        type='number'
        min={props.min}
        max={props.max}
        value={km}
        onChange={({ value }) => {
          setKm(value)
        }}
      />
      <Button>Valider</Button>
    </Wrapper>
  )
}
