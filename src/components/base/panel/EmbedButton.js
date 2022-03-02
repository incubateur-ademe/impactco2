import React, { useContext } from 'react'
import styled, { keyframes } from 'styled-components'

import UXContext from 'utils/UXContext'
import Toggle from './Toggle'

const hover = keyframes`
  from {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-30%, 100%);
  }
  51% {
    transform: translate(30%, -100%);
  }
  to {
    transform: translate(0, 0);
  }
`
const StyledWrapper = styled(Toggle)`
  transform: translate(
    ${(props) => (props.open ? '-30rem' : '0')},
    calc(${(props) => (props.four ? '-200% - 3rem' : '-150% - 2rem')})
  );

  &:hover,
  &:focus {
    .animate {
      animation: ${hover} 400ms;
    }
  }
`
const Embed = styled.svg`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
  width: 2.75rem;
  height: auto;
  opacity: ${(props) => (props.open ? 0 : 1)};
  transition: all 300ms ease-out;

  path {
    fill: ${(props) => props.theme.colors.background};
  }
`
export default function EmbedButton(props) {
  const { installPrompt } = useContext(UXContext)

  return (
    <StyledWrapper
      open={props.open}
      onClick={props.onClick}
      four={installPrompt}
      tooltip={'Intégrer ce simulateur'}
    >
      <Embed
        open={props.open}
        x='0px'
        y='0px'
        width='94.504px'
        height='94.504px'
        viewBox='0 0 94.504 94.504'
      >
        <path d='M93.918,45.833L69.799,21.714c-0.75-0.75-2.077-0.75-2.827,0l-5.229,5.229c-0.781,0.781-0.781,2.047,0,2.828    l17.477,17.475L61.744,64.724c-0.781,0.781-0.781,2.047,0,2.828l5.229,5.229c0.375,0.375,0.884,0.587,1.414,0.587    c0.529,0,1.039-0.212,1.414-0.587l24.117-24.118C94.699,47.881,94.699,46.614,93.918,45.833z' />
        <path d='M32.759,64.724L15.285,47.248l17.477-17.475c0.375-0.375,0.586-0.883,0.586-1.414c0-0.53-0.21-1.039-0.586-1.414    l-5.229-5.229c-0.375-0.375-0.884-0.586-1.414-0.586c-0.53,0-1.039,0.211-1.414,0.586L0.585,45.833    c-0.781,0.781-0.781,2.047,0,2.829L24.704,72.78c0.375,0.375,0.884,0.587,1.414,0.587c0.53,0,1.039-0.212,1.414-0.587l5.229-5.229    C33.542,66.771,33.542,65.505,32.759,64.724z' />
        <path
          className='animate'
          d='M60.967,13.6c-0.254-0.466-0.682-0.812-1.19-0.962l-4.239-1.251c-1.058-0.314-2.172,0.293-2.484,1.352L33.375,79.382    c-0.15,0.509-0.092,1.056,0.161,1.521c0.253,0.467,0.682,0.812,1.19,0.963l4.239,1.251c0.189,0.056,0.38,0.083,0.567,0.083    c0.863,0,1.66-0.564,1.917-1.435l19.679-66.644C61.278,14.612,61.221,14.065,60.967,13.6z'
        />
      </Embed>
    </StyledWrapper>
  )
}
