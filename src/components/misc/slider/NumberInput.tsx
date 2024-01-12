import React, { Dispatch, SetStateAction, useState } from 'react'
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
    border-color: var(--primary-50);

    &:focus {
      box-shadow: 0 0 0 0.125rem var(--primary-10);
      outline: none;
    }
  }
`
const Button = styled.button`
  background: var(--primary-50);
  border: none;
  border-radius: 0 1rem 1rem 0;
  bottom: 0;
  color: var(--neutral-00);
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
      fill: var(--primary-50);
    }
  }
`

export default function NumberInput({
  value,
  setValue,
  max,
}: {
  value: number
  setValue: Dispatch<SetStateAction<number>>
  max: number
}) {
  const [tempValue, setTempValue] = useState(value.toString())
  return (
    <Wrapper
      onSubmit={(e) => {
        e.preventDefault()
        if (tempValue) {
          setValue(Number.parseInt(tempValue))
        }
      }}>
      <StyledTextInput
        data-testid='slider-number-input'
        type='number'
        min={1}
        step={1}
        max={max}
        value={tempValue}
        onChange={(event: { value: string }) => {
          setTempValue(event.value)
        }}
      />
      <Button data-testid='slider-number-input-validate'>Valider</Button>
    </Wrapper>
  )
}
