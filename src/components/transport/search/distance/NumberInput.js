import React, { useState } from 'react'
import styled from 'styled-components'

import TextInput from 'components/base/TextInput'

const Wrapper = styled.form`
  position: relative;
  display: flex;
  margin: 0 auto;
`
const StyledTextInput = styled(TextInput)`
  margin: 0;
  width: 12rem;
  input {
    border-color: ${(props) => props.theme.colors.main};

    &:focus {
      outline: none;
      box-shadow: 0 0 0 0.125rem ${(props) => props.theme.colors.mainLight};
    }
  }
`
const Button = styled.button`
  position: absolute;
  top: 0;
  bottom: 0;
  right: -0.1rem;
  padding: 0 0.75rem;
  color: ${(props) => props.theme.colors.background};
  background: ${(props) => props.theme.colors.main};
  border: none;
  border-radius: 0 1rem 1rem 0;
  cursor: pointer;

  &:focus {
    opacity: 1;
  }

  svg {
    display: block;
    width: 1.25rem;
    height: auto;

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
