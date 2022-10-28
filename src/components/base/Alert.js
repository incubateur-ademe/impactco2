import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  margin-top: 1rem;
  padding: 1.5rem 1.5rem 1.5rem 1.8125rem;
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.textLight};

  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 0.3125rem;
    background-color: ${(props) =>
      props.error ? props.theme.colors.error : props.theme.colors.main};
  }

  ${(props) => props.theme.mq.medium} {
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
