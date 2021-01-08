import React, { useContext } from 'react'
import styled from 'styled-components'

import { mq } from 'utils/styles'

import CO2NumberContext from 'utils/CO2NumberContext'

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 0.5rem;
  font-size: 6em;

  ${mq.small} {
    font-size: 12vw;
  }
`
const InputWrapper = styled.div`
  position: relative;
  flex: 1;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -2%;
    width: 104%;
    height: 100%;
    background-color: ${(props) => props.theme.colors.second};
    border: 2px solid ${(props) => props.theme.colors.text};
    transform: rotate3d(1, -1, 0, 33deg) rotate(5.1deg);
  }
`
const Input = styled.input`
  position: relative;
  width: 100%;
  padding: 0 0.3em;
  font-weight: 900;
  font-style: italic;
  color: ${(props) => props.theme.colors.main};
  text-align: right;
  background-color: transparent;
  border: none;

  &:focus {
    outline: none;
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
const Unit = styled.a`
  display: block;
  font-size: 0.6em;
  font-weight: 700;
  line-height: 1.7;
  color: ${(props) => props.theme.colors.text};
  text-decoration: none;
`
export default function NumberInput() {
  const { CO2, setCO2 } = useContext(CO2NumberContext)

  return (
    <Wrapper>
      <InputWrapper length={String(CO2).length}>
        <Input
          type='number'
          value={CO2}
          onChange={(e) => {
            if (e.currentTarget.value <= 999999) {
              setCO2(e.currentTarget.value)
            }
          }}
        />
      </InputWrapper>
      <Unit
        href='https://ecolab.gitbook.io/documentation-ecolab/lexique-environnemental-et-changement-climat#lequivalent-co2-ou-co2-equivalent-co-2-e'
        target='_blank'
        rel='noopener noreferrer'
      >
        kg/CO2e
      </Unit>
    </Wrapper>
  )
}
