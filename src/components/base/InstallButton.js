import React, { useContext } from 'react'
import styled, { keyframes } from 'styled-components'

import UXContext from 'utils/UXContext'
import Toggle from './panel/Toggle'

const hover = keyframes`
  from,
  20%,
  53%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translate3d(0, 0, 0);
  }

  40%,
  43% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -30px, 0) scaleY(1.1);
  }

  70% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -15px, 0) scaleY(1.05);
  }

  80% {
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translate3d(0, 0, 0) scaleY(0.95);
  }

  90% {
    transform: translate3d(0, -4px, 0) scaleY(1.02);
  }
`
const StyledWrapper = styled(Toggle)`
  transform: translate(${(props) => (props.open ? '-30rem' : '0')}, 1rem);

  &:hover,
  &:focus {
    .animate {
      animation: ${hover} 600ms infinite;
    }
  }
`
const Install = styled.svg`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: ${(props) => (props.open ? 'none' : 'block')};
  width: 2.1rem;
  height: auto;
  transition: all 300ms ease-out;
  overflow: visible;

  path {
    fill: ${(props) => props.theme.colors.background};
    transform-origin: center bottom;
  }
`
export default function InstallButton(props) {
  const { installPrompt } = useContext(UXContext)

  return (
    installPrompt && (
      <StyledWrapper
        open={props.open}
        onClick={() => installPrompt.prompt()}
        tooltip={'Installer ce simulateur'}
      >
        <Install open={props.open} x='0px' y='0px' viewBox='0 0 512 512'>
          <path
            className='animate'
            d='M339.093,246.464c-3.627-7.232-11.008-11.797-19.093-11.797h-42.667V21.333C277.333,9.557,267.797,0,256,0
			s-21.333,9.557-21.333,21.333v213.333H192c-8.085,0-15.467,4.565-19.093,11.797c-3.584,7.232-2.816,15.872,2.027,22.336l64,85.333
			c0.277,0.363,0.704,0.491,1.003,0.832c1.408,1.664,3.072,2.944,4.928,4.117c0.768,0.469,1.365,1.088,2.197,1.472
			c2.731,1.28,5.717,2.112,8.939,2.112s6.208-0.832,8.96-2.112c0.811-0.384,1.429-1.003,2.176-1.472
			c1.856-1.173,3.52-2.453,4.928-4.117c0.277-0.341,0.725-0.469,1.003-0.832l64-85.333
			C341.931,262.336,342.699,253.696,339.093,246.464z'
          />
          <path
            d='M490.667,320c-11.797,0-21.333,9.557-21.333,21.333v64c0,35.285-28.715,64-64,64H106.667c-35.285,0-64-28.715-64-64v-64
			c0-11.776-9.536-21.333-21.333-21.333C9.536,320,0,329.557,0,341.333v64C0,464.149,47.851,512,106.667,512h298.667
			C464.149,512,512,464.149,512,405.333v-64C512,329.557,502.464,320,490.667,320z'
          />
        </Install>
      </StyledWrapper>
    )
  )
}
