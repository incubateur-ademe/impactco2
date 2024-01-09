import React from 'react'
import styled, { keyframes } from 'styled-components'

const loading = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  50% {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
`
const Wrapper = styled.div`
  position: relative;

  &:before {
    animation: ${(props) => (props.$isFetching ? loading : 'none')} 1s infinite;
    background-color: var(--secondary-10);
    content: '';
    height: 100%;
    left: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    top: 0;
    width: 100%;
  }
`
const Input = styled.input`
  background: transparent;
  border: none;
  color: var(--neutral-70);
  font-size: 1rem;
  font-weight: normal;
  line-height: 1.25;
  padding: 0.5rem 0 0.5rem 1.5rem;
  position: relative;
  width: 100%;

  &::placeholder {
    color: var(--neutral-70);
    opacity: 0.6;
  }
  &:focus {
    outline: none;
  }
`
export default React.forwardRef(function TextInput(props, ref) {
  return (
    <Wrapper $isFetching={props.isFetching}>
      <Input
        ref={ref}
        type='text'
        placeholder={props.placeholder}
        value={props.search}
        onChange={(e) => props.setSearch(e.target.value)}
        onFocus={() => props.setFocus(true)}
        onBlur={() => props.setFocus(false)}
      />
    </Wrapper>
  )
})
