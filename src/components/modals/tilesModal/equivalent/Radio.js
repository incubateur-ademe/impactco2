import React from 'react'
import styled from 'styled-components'
import { MEDIA } from 'utils/styles'

const Wrapper = styled.div`
  align-items: center;
  background-color: var(--neutral-00);
  border: 0.125rem solid var(--neutral-70);
  border-radius: 2rem;
  display: flex;
  height: 1.75rem;
  justify-content: center;
  position: relative;
  width: 1.75rem;

  ${MEDIA.LT.SMALL} {
    height: 1.5rem;
    width: 1.5rem;
  }
`
const RadioButton = styled.svg`
  height: 1rem;
  width: auto;

  ${MEDIA.LT.SMALL} {
    height: 0.75rem;
  }

  circle {
    fill: ${(props) => (props.checked ? 'var(--primary-50)' : 'none')};
  }
`
export default function Radio(props) {
  return (
    <Wrapper checkbox={props.checkbox}>
      <RadioButton checked={props.checked} width='100' height='100' viewBox='0 0 100 100'>
        <circle cx='50' cy='50' r='50' id='check' />
      </RadioButton>
    </Wrapper>
  )
}
