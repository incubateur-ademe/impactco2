import React from 'react'
import styled from 'styled-components'
import { MEDIA } from 'utils/styles'
import Link from 'components/base/buttons/Link'

const Wrapper = styled(Link)`
  align-items: center;
  display: flex;
  margin: 0 0.75em;
  text-decoration: none;

  ${MEDIA.LT.SMALL} {
    font-size: 0.75rem;
  }

  svg {
    height: 3em;
    margin-right: 1em;
    width: auto;
  }

  &:hover {
    .circle1 {
      fill: var(--primary-50);
      transition: fill 300ms ease-in 200ms;
    }

    .circle2 {
    }
    .circle3 {
      transition: fill 300ms ease-out;
    }
  }
`
const Path = styled.path`
  fill: var(--primary-50);
`
const Circle = styled.circle`
  fill: var(--primary-50);
  stroke: var(--primary-50);
  transition: fill 300ms ease-out;

  ${Wrapper}:hover & {
    fill: #b5d0fa;
    transition: fill 300ms ease-in-out 400ms;
  }
`
const HollowCircle1 = styled.circle`
  fill: #b5d0fa;
  stroke: var(--primary-50);
  transform-origin: center;
  transition: fill 300ms ease-out;

  ${Wrapper}:hover & {
    fill: var(--primary-50);
    transform: rotate(-180deg);
    transition:
      transform 600ms ease-out,
      fill 300ms ease-out;
  }
`
const HollowCircle2 = styled(HollowCircle1)`
  ${Wrapper}:hover & {
    transition:
      transform 400ms ease-out 300ms,
      fill 300ms ease-in 200ms;
  }
`
const Title = styled.div`
  color: var(--primary-50);
  font-size: 1.15em;
  font-weight: bold;
  line-height: 1;
  margin: 0;
`
export default function FooterLogo(props) {
  return (
    <Wrapper href='/' className={props.className}>
      <svg width='333' height='333' viewBox='0 0 333 333' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <title>
          Impact CO<sub>2</sub>
        </title>
        <Path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M319.125 13.875H13.875V319.125H319.125V13.875ZM0 0V333H333V0H0Z'
        />
        <mask maskUnits='userSpaceOnUse' x='13' y='13' width='307' height='307'>
          <path d='M13.875 13.8738H319.125V319.124H13.875V13.8738Z' fill='#b5d0fa' />
        </mask>
        <g>
          <HollowCircle1 cx='52.4974' cy='51.4973' r='81.1898' strokeWidth='25' />
          <Circle cx='167.317' cy='166.317' r='81.1898' strokeWidth='25' />
          <HollowCircle2 cx='282.137' cy='281.137' r='81.1898' strokeWidth='25' />
        </g>
      </svg>
      <Title>
        Impact
        <br />
        CO<sub>2</sub>
      </Title>
    </Wrapper>
  )
}
