import React from 'react'
import styled from 'styled-components'

import MagicLink from 'components/base/MagicLink'

const Wrapper = styled(MagicLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  margin: 0 0.75em;

  ${(props) => props.theme.mq.small} {
    font-size: 0.75rem;
  }
`
const Svg = styled.svg`
  width: 3.5em;
  height: auto;
  margin-right: 0.5em;
`
const Title = styled.h1`
  margin: 0;
  font-size: 0.875em;
  color: ${(props) => props.theme.colors.main};
`
const Path = styled.path`
  fill: ${(props) => props.theme.colors.main};
  ${Wrapper}:hover & {
    transform: rotate(90deg);
    transform-origin: center;
    transition: transform 200ms 120ms ease-out;
  }
`
const Circle = styled.path`
  fill: ${(props) => props.theme.colors.main};
  ${Wrapper}:hover & {
    transform: rotate(90deg);
    transform-origin: center;
    transition: transform 300ms ease-out;
  }
`
const Wheel = styled.g`
  ${Wrapper}:hover & {
    transform: rotate(360deg);
    transition: transform 750ms ease-out;
  }
`
export default function Logo() {
  return (
    <Wrapper to='/'>
      <Svg
        width='42'
        height='42'
        viewBox='0 0 42 42'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M40.2843 2.12731H2.53923V39.8724H40.2843V2.12731ZM0.823547 0.411621V41.5881H42V0.411621H0.823547Z'
          fill='#26827C'
        />
        <mask
          id='mask0_616_5994'
          maskUnits='userSpaceOnUse'
          x='2'
          y='2'
          width='39'
          height='38'
        >
          <path
            d='M2.53925 2.12695H40.2843V39.872H2.53925V2.12695Z'
            fill='#fff'
          />
        </mask>
        <g mask='url(#mask0_616_5994)'>
          <Path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M43.8192 3.8156L4.35838 43.2764L-0.949249 37.9688L38.5115 -1.49204L43.8192 3.8156Z'
            fill='#26827C'
          />
          <Circle
            fillRule='evenodd'
            clipRule='evenodd'
            d='M8.83201 8.47364C10.8839 6.42172 10.8839 3.09488 8.83201 1.04296C6.78008 -1.00897 3.45325 -1.00897 1.40132 1.04296C-0.650606 3.09488 -0.650606 6.42172 1.40132 8.47364C3.45325 10.5256 6.78008 10.5256 8.83201 8.47364ZM14.1396 13.7813C19.1229 8.79803 19.1229 0.718575 14.1396 -4.26468C9.15639 -9.24793 1.07694 -9.24793 -3.90631 -4.26468C-8.88957 0.718576 -8.88957 8.79803 -3.90631 13.7813C1.07694 18.7645 9.15639 18.7645 14.1396 13.7813Z'
            fill='#26827C'
          />
          <Circle
            fillRule='evenodd'
            clipRule='evenodd'
            d='M41.2844 40.9258C43.3364 38.8739 43.3364 35.547 41.2844 33.4951C39.2325 31.4432 35.9057 31.4432 33.8537 33.4951C31.8018 35.547 31.8018 38.8739 33.8537 40.9258C35.9057 42.9777 39.2325 42.9777 41.2844 40.9258ZM46.5921 46.2334C51.5753 41.2502 51.5753 33.1707 46.5921 28.1875C41.6088 23.2042 33.5294 23.2042 28.5461 28.1875C23.5629 33.1707 23.5629 41.2502 28.5461 46.2334C33.5294 51.2167 41.6088 51.2167 46.5921 46.2334Z'
            fill='#26827C'
          />
        </g>
      </Svg>

      <Title>
        Mon
        <br />
        Convertisseur
        <br />
        CO2
      </Title>
    </Wrapper>
  )
}
