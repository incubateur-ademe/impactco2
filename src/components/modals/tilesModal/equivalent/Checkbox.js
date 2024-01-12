import React from 'react'
import styled from 'styled-components'
import { MEDIA } from 'utils/styles'

const Wrapper = styled.div`
  align-items: center;
  background-color: var(--neutral-00);
  border: 0.125rem solid var(--neutral-70);
  border-radius: 0.5rem;
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
const Check = styled.svg`
  height: 1.2rem;
  width: auto;

  ${MEDIA.LT.SMALL} {
    height: 1rem;
  }

  path {
    fill: none;
    stroke: var(--primary-50);
    stroke-dasharray: 4322.794921875;
    stroke-dashoffset: ${(props) => (props.checked ? 0 : 4322.794921875)};
    stroke-width: 600;
  }
`
export default function Checkbox(props) {
  return (
    <Wrapper checkbox={props.checkbox}>
      <Check checked={props.checked} width='3213' height='2768' viewBox='0 0 3213 2768'>
        <path id='check' d='M165 1360C165 1360 1153 2220 1277 2336C1885.14 828 3101 224 3101 224' />
      </Check>
    </Wrapper>
  )
}
