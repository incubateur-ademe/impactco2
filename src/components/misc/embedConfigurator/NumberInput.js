import React, { useContext } from 'react'
import styled from 'styled-components'

import CO2NumberContext from 'utils/CO2NumberContext'

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 1em;
`
const Input = styled.input`
  position: relative;
  width: 6em;
  padding: 0.8em 0.2em 0.8em 0.8em;
  font-size: 1.2em;
  color: ${(props) => props.theme.colors.main};
  text-align: right;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.colors.main};
  border-radius: 1em;

  &:focus {
    outline: none;
  }
`
const Unit = styled.div`
  padding: 0.8em 0 0.8em 0.4em;
  font-size: 1.2em;
  font-weight: normal;
  line-height: 1.15;
  color: ${(props) => props.theme.colors.main};
  text-decoration: none;
`
export default function NumberInput() {
  const { CO2, setCO2 } = useContext(CO2NumberContext)

  return (
    <Wrapper>
      <Input
        type='number'
        value={CO2}
        onChange={(e) => {
          if (e.currentTarget.value <= 999999) {
            setCO2(e.currentTarget.value)
          }
        }}
      />
      <Unit>kg/CO2e</Unit>
    </Wrapper>
  )
}
