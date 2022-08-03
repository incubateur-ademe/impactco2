import React from 'react'
import styled, { keyframes } from 'styled-components'

import Submit from './textInput/Submit'
import Geoloc from './textInput/Geoloc'

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
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.colors.second};
    pointer-events: none;
    opacity: 0;
    animation: ${(props) => (props.isFetching ? loading : 'none')} 1s infinite;
  }
`
const Input = styled.input`
  position: relative;
  width: 100%;
  padding: 0.5rem 0 0.5rem 1.5rem;
  font-size: 1rem;
  font-weight: normal;
  line-height: 1.25;
  color: ${(props) => props.theme.colors.text};
  background: transparent;
  border: none;

  &::placeholder {
    color: ${(props) => props.theme.colors.text};
    opacity: 0.6;
  }
  &:focus {
    outline: none;
  }
`
export default React.forwardRef(function TextInput(props, ref) {
  return (
    <Wrapper isFetching={props.isFetching}>
      <Input
        ref={ref}
        type='text'
        placeholder={props.placeholder}
        value={props.search}
        onChange={(e) => props.setSearch(e.target.value)}
        onFocus={() => props.setFocus(true)}
        onBlur={() => props.setFocus(false)}
      />
      <Submit
        visible={props.suggestion && props.suggestionVisible && props.search}
        setFocus={props.setFocus}
      />
      <Geoloc
        visible={
          props.focus &&
          !(props.suggestion && props.suggestionVisible && props.search)
        }
        navigateToPlace={props.navigateToPlace}
      />
    </Wrapper>
  )
})
