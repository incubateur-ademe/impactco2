import React from 'react'
import styled from 'styled-components'

import MagicLink from 'components/base/MagicLink'

const Wrapper = styled.div`
  position: relative;
  display: none;

  ${(props) => props.theme.mq.small} {
    display: block;
  }
`
const Button = styled.button`
  width: 4rem;
  height: 3rem;
  margin-bottom: -1rem;
  padding-bottom: 0.5rem;
  background-color: ${(props) =>
    props.current ? props.theme.colors.secondLight : 'transparent'};
  border: none;
  border-radius: 1rem 1rem 0 0;
  cursor: pointer;
  transition: background-color 200ms ease-out;

  ${Wrapper}:hover & {
    background-color: ${(props) => props.theme.colors.footer};
  }

  line {
    stroke: ${(props) => props.theme.colors[props.current ? 'second' : 'main']};
  }

  ${(props) => props.theme.mq.small} {
    margin-bottom: -1.5rem;
    padding-bottom: 0.5rem;
  }
`
const Svg = styled.svg`
  width: 1.75rem;
  height: 1.75rem;

  ${(props) => props.theme.mq.small} {
    width: 1.25rem;
    height: 1.25rem;
  }
`
const Line = styled.line`
  transition: transform 300ms ease-out;
`
const LineTop = styled(Line)`
  transform: scaleX(0.5);

  ${Wrapper}:hover & {
    transform: scaleX(1);
  }
`
const LineBottom = styled(Line)`
  transform: scaleX(1);

  ${Wrapper}:hover & {
    transform: scaleX(0.5);
  }
`
const MenuWrapper = styled.div`
  position: absolute;
  overflow: hidden;
  z-index: 12;
  top: 100%;
  right: 0;
  background-color: ${(props) => props.theme.colors.footer};
  border-radius: 1rem 0 1rem 1rem;
  box-shadow: -0.25rem 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.05);
  opacity: 0;
  pointer-events: none;
  transition: opacity 200ms;

  ${Wrapper}:hover & {
    opacity: 1;
    pointer-events: inherit;
  }
`
const Item = styled(MagicLink)`
  display: block;
  padding: 1rem 1.5rem 0.5rem;
  text-decoration: none;
  white-space: nowrap;

  &:last-child {
    padding: 0.5rem 1.5rem 1rem;
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.secondLight};
  }
`
export default function Burger(props) {
  return (
    <Wrapper>
      <Button
        current={props.location.pathname === '/teletravail'}
        aria-label='menu'
      >
        <Svg
          width='24'
          height='17'
          viewBox='0 0 24 17'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <LineTop
            x1='1.5'
            y1='1.5'
            x2='22.5'
            y2='1.5'
            strokeWidth='3'
            strokeLinecap='round'
          />
          <Line
            x1='1.5'
            y1='8.5'
            x2='18.5'
            y2='8.5'
            strokeWidth='3'
            strokeLinecap='round'
          />
          <LineBottom
            x1='1.5'
            y1='15.5'
            x2='22.5'
            y2='15.5'
            strokeWidth='3'
            strokeLinecap='round'
          />
        </Svg>
      </Button>
      <MenuWrapper>
        <Item to='/teletravail'>Mode télétravail</Item>
      </MenuWrapper>
    </Wrapper>
  )
}
