import React, { useState, useContext } from 'react'
import styled from 'styled-components'

import { mq } from 'utils/styles'

import CO2NumberContext from 'utils/CO2NumberContext'

const Wrapper = styled.div`
  position: relative;
  flex: 1;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -2%;
    width: 104%;
    height: 100%;
    border: 2px solid ${(props) => props.theme.colors.main};
    transform: rotate3d(1, -1, 0, 33deg) rotate(5.1deg);
    opacity: ${(props) => (props.focus ? 1 : 0)};
    transition: opacity 200ms ease-out;
  }

  &:hover {
    &:before {
      opacity: 1;
    }
  }
`
const Input = styled.input`
  position: relative;
  width: 100%;
  padding: 0 0.3em;
  font-size: ${(props) => (props.length > 6 ? '1.5em' : '2.5em')};
  font-weight: 700;
  line-height: ${(props) => (props.length > 6 ? '2.2' : 'inherit')};
  color: ${(props) => props.theme.colors.main};
  text-align: center;
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:focus {
    outline: none;
    cursor: text;
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }
`
export default function NumberInput(props) {
  const { setCO2 } = useContext(CO2NumberContext)

  const [focus, setFocus] = useState(false)

  return (
    <Wrapper focus={focus}>
      <Input
        type='number'
        value={props.value < 10 ? props.value : Math.round(props.value)}
        length={String(props.value).length}
        onChange={(e) => {
          if (e.currentTarget.value * props.total <= 999999) {
            setCO2(e.currentTarget.value * props.total)
          }
        }}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </Wrapper>
  )
}
