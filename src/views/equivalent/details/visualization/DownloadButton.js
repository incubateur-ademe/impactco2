import React from 'react'
import styled, { keyframes } from 'styled-components'

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
    transform: translate3d(0, -1rem, 0) scaleY(1.1);
  }

  70% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -0.5rem, 0) scaleY(1.05);
  }

  80% {
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translate3d(0, 0, 0) scaleY(0.95);
  }

  90% {
    transform: translate3d(0, -0.125rem, 0) scaleY(1.02);
  }
`

const Wrapper = styled.button`
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
  display: flex;
  align-items: flex-end;
  gap: 0.25rem;
  margin: 0;
  padding: 0 0 0.125rem 0.375rem;
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.main};
  background: transparent;
  border: none;
  border-bottom: 0.125rem solid ${(props) => props.theme.colors.main};
  cursor: pointer;

  &:hover {
    svg {
      animation: ${hover} 600ms infinite;
    }
  }
`
const Svg = styled.svg`
  display: block;
  width: 0.875rem;
  height: auto;

  path {
    fill: ${(props) => props.theme.colors.main};
  }
`
export default function DownloadButton(props) {
  return (
    <Wrapper onClick={props.onClick} className='noscreenshot'>
      <Svg
        width='22'
        height='25'
        viewBox='0 0 22 25'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M9.31546 1.68556C9.29953 1.78376 9.29217 1.88314 9.29346 1.98258L9.29346 18.9141L9.12175 18.5449C8.95094 18.184 8.71847 17.8557 8.43487 17.5747L3.68685 12.8267C3.08991 12.2013 2.12963 12.0963 1.41157 12.5777C0.646405 13.138 0.480267 14.2124 1.04055 14.9777C1.08584 15.0395 1.13521 15.0982 1.18834 15.1535L9.77428 23.7394C10.4445 24.4104 11.5318 24.411 12.2028 23.7407L20.79 15.1535C21.4597 14.4819 21.4582 13.3947 20.7867 12.725C20.7338 12.6723 20.6776 12.6231 20.6183 12.5777C19.9003 12.0963 18.94 12.2013 18.343 12.8267L13.5864 17.5661C13.3342 17.818 13.1227 18.1077 12.9597 18.4247L12.7278 18.9399V2.07708C12.7604 1.19986 12.1476 0.430241 11.2854 0.265445C10.3493 0.113635 9.46733 0.749425 9.31546 1.68556Z' />
      </Svg>
      Télécharger
    </Wrapper>
  )
}
