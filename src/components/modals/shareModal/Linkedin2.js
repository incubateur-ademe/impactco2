import React from 'react'
import { LinkedinShareButton } from 'react-share'
import styled from 'styled-components'

const Svg = styled.svg``
export default function Linkedin2(props) {
  return (
    <LinkedinShareButton
      url={props.url}
      title={props.title}
      summary={props.summary}
      source={props.source}
      aria-label='Partager sur linkedin'>
      <Svg width='60px' height='60px' viewBox='0 0 60 60' version='1.1' xmlns='http://www.w3.org/2000/svg'>
        <g id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
          <g id='linkedinz'>
            <rect id='Rectangle' fill='#1B9B93' x='0' y='0' width='60' height='60' rx='8' />
            <path
              d='M20,21.4325 C20,20.64125 20.6575,20 21.46875,20 L38.53125,20 C39.3425,20 40,20.64125 40,21.4325 L40,38.5675 C40,39.35875 39.3425,40 38.53125,40 L21.46875,40 C20.6575,40 20,39.35875 20,38.5675 L20,21.4325 Z M26.17875,36.7425 L26.17875,27.71125 L23.1775,27.71125 L23.1775,36.7425 L26.17875,36.7425 Z M24.67875,26.4775 C25.725,26.4775 26.37625,25.785 26.37625,24.9175 C26.3575,24.03125 25.72625,23.3575 24.69875,23.3575 C23.67125,23.3575 23,24.0325 23,24.9175 C23,25.785 23.65125,26.4775 24.65875,26.4775 L24.67875,26.4775 Z M30.81375,36.7425 L30.81375,31.69875 C30.81375,31.42875 30.83375,31.15875 30.91375,30.96625 C31.13,30.4275 31.62375,29.86875 32.45375,29.86875 C33.54,29.86875 33.97375,30.69625 33.97375,31.91125 L33.97375,36.7425 L36.975,36.7425 L36.975,31.5625 C36.975,28.7875 35.495,27.4975 33.52,27.4975 C31.9275,27.4975 31.21375,28.3725 30.81375,28.98875 L30.81375,29.02 L30.79375,29.02 C30.8003887,29.0095655 30.8070554,28.9991488 30.81375,28.98875 L30.81375,27.71125 L27.81375,27.71125 C27.85125,28.55875 27.81375,36.7425 27.81375,36.7425 L30.81375,36.7425 Z'
              id='Shape'
              fill='#FFFFFF'
              fillRule='nonzero'
            />
          </g>
        </g>
      </Svg>
    </LinkedinShareButton>
  )
}
