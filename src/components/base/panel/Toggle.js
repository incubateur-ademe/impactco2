import React from 'react'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'

const Wrapper = styled.button`
  position: fixed;
  top: 50%;
  right: 0;
  padding: 0.7rem 0.9rem;
  background-color: ${(props) => props.theme.colors.main};
  border: 5px solid ${(props) => props.theme.colors.main};
  border-right: none;
  border-radius: 2rem 0 0 2rem;
  transition: all 400ms ease-out;
  overflow: hidden;
  cursor: pointer;

  &:hover,
  &:focus {
    outline: none;
  }

  ${(props) => props.theme.mq.medium} {
    display: none;
  }
`
const Arrow = styled.svg`
  display: block;
  width: 2rem;
  height: auto;
  opacity: ${(props) => (props.open ? 1 : 0)};
  transition: opacity 300ms ease-out;

  path {
    fill: ${(props) => props.theme.colors.background};
  }
`
export default function Toggle(props) {
  return (
    <>
      <Wrapper
        className={props.className}
        open={props.open}
        onClick={props.onClick}
        data-tip={props.tooltip}
        aria-label={props.tooltip}
      >
        {props.children}
        <Arrow
          open={props.open}
          x='0px'
          y='0px'
          width='46.02px'
          height='46.02px'
          viewBox='0 0 46.02 46.02'
        >
          <path d='M14.757,46.02c-1.412,0-2.825-0.521-3.929-1.569c-2.282-2.17-2.373-5.78-0.204-8.063l12.758-13.418L10.637,9.645    C8.46,7.37,8.54,3.76,10.816,1.582c2.277-2.178,5.886-2.097,8.063,0.179l16.505,17.253c2.104,2.2,2.108,5.665,0.013,7.872    L18.893,44.247C17.77,45.424,16.267,46.02,14.757,46.02z' />
        </Arrow>
      </Wrapper>
      <ReactTooltip delayShow={600} place='left' />
    </>
  )
}
