import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  svg {
    display: block;
    height: auto;
    width: 1.5rem;

    path {
      fill: var(--primary-50);
    }
  }

  &:focus {
    border-radius: 2px;
    outline: 3px solid var(--primary-40);
    outline-offset: 2px;
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }
`
export default function PlusOrMinusButton({ plus, onClick }: { plus?: boolean; onClick: () => void }) {
  return plus ? (
    <Wrapper aria-label='plus' onClick={onClick} data-testid='slider-plus-button'>
      <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M0 12C0 9.79086 1.79086 8 4 8H20C22.2091 8 24 9.79086 24 12C24 14.2091 22.2091 16 20 16H4C1.79086 16 0 14.2091 0 12Z'
          fill='#DE0244'
        />
        <path
          d='M12 24C9.79086 24 8 22.2091 8 20L8 4C8 1.79086 9.79086 9.65645e-08 12 0C14.2091 -9.65645e-08 16 1.79086 16 4L16 20C16 22.2091 14.2091 24 12 24Z'
          fill='#DE0244'
        />
      </svg>
    </Wrapper>
  ) : (
    <Wrapper aria-label='moins' onClick={onClick} data-testid='slider-moins-button'>
      <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M0 12C0 9.79086 1.79086 8 4 8H20C22.2091 8 24 9.79086 24 12C24 14.2091 22.2091 16 20 16H4C1.79086 16 0 14.2091 0 12Z'
          fill='#DE0244'
        />
      </svg>
    </Wrapper>
  )
}
