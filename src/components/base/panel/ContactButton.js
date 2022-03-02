import React, { useContext } from 'react'
import styled, { keyframes } from 'styled-components'

import UXContext from 'utils/UXContext'
import Toggle from './Toggle'

const hover = keyframes`
  from {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
  50% {
    transform: translate(200%, -50%);
    opacity: 0;
  }
  50.1% {
    transform: translate(-200%, -50%);
    opacity: 0;
  }
  to {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
`
const StyledWrapper = styled(Toggle)`
  transform: translate(
    ${(props) => (props.open ? '-30rem' : '0')},
    ${(props) => (props.four ? 'calc(100% + 3rem)' : 'calc(50% + 2rem)')}
  );

  &:hover,
  &:focus {
    .animate {
      animation: ${hover} 600ms;
    }
  }
`
const Mail = styled.svg`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: ${(props) => (props.open ? 'none' : 'block')};
  width: 2.25rem;
  height: auto;
  transition: all 300ms ease-out;

  path {
    fill: ${(props) => props.theme.colors.background};
  }
`
export default function ContactButton(props) {
  const { installPrompt } = useContext(UXContext)

  return (
    <StyledWrapper
      open={props.open}
      onClick={props.onClick}
      four={installPrompt}
      tooltip={'Contact'}
    >
      <Mail
        open={props.open}
        className='animate'
        x='0px'
        y='0px'
        viewBox='0 0 382.117 382.117'
      >
        <path
          d='M336.764,45.945H45.354C20.346,45.945,0,65.484,0,89.5v203.117c0,24.016,20.346,43.555,45.354,43.555h291.41
	c25.008,0,45.353-19.539,45.353-43.555V89.5C382.117,65.484,361.772,45.945,336.764,45.945z M336.764,297.72H45.354
	c-3.676,0-6.9-2.384-6.9-5.103V116.359l131.797,111.27c2.702,2.282,6.138,3.538,9.676,3.538l22.259,0.001
	c3.536,0,6.974-1.257,9.677-3.539l131.803-111.274v176.264C343.664,295.336,340.439,297.72,336.764,297.72z M191.059,192.987
	L62.87,84.397h256.378L191.059,192.987z'
        />
      </Mail>
    </StyledWrapper>
  )
}
