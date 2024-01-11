import React from 'react'
import styled from 'styled-components'
import { MEDIA } from 'utils/styles'

const Wrapper = styled.div`
  background-color: var(--neutral-50);
  color: var(--neutral-70);
  margin-top: 1rem;
  padding: 1.5rem 1.5rem 1.5rem 1.8125rem;
  position: relative;

  &:before {
    background-color: ${(props) => (props.error ? 'var(--critical-50)' : 'var(--primary-50)')};
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    top: 0;
    width: 0.3125rem;
  }

  ${MEDIA.LT.MEDIUM} {
    padding: 1rem 1rem 1rem calc(1rem + 0.3125rem);
  }
`
export default function Alert(props) {
  return (
    <Wrapper {...props} error={props.error}>
      {props.children}
    </Wrapper>
  )
}
