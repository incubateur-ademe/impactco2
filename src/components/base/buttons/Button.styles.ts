import Link from 'next/link'
import styled from 'styled-components'

const button = (color?: 'secondary', size?: 'sm' | 'lg') => `
  -webkit-appearance: none;
  appearance: none;
  border: none;
  border-radius: 8px;
  padding: ${color === 'secondary' ? 'calc(0.5rem - 1px) calc(1.25rem - 1px)' : '0.5rem 1.25rem'};
  cursor: pointer;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  ${
    color === 'secondary'
      ? `
        background-color: transparent;
        color: var(--primary-50);
        border: solid 1px var(--primary-50);

        &:hover {
          color: var(--primary-70);
          border: solid 1px var(--primary-70);
        }

        &:focus {
          outline: 3px solid var(--primary-50);
          outline-offset: 2px;
        }

        &:active {
          color: var(--primary-60);
          border: solid 1px var(--primary-60);
        }
        
        &:disabled {
          cursor: not-allowed;
          border: solid 1px var(--neutral-20);
          color: var(--neutral-30);
        }`
      : `
        color: white;
        background-color: var(--primary-50);
        &:hover {
          background: var(--primary-70);
        }

        &:focus {
          outline: 3px solid var(--primary-50);
          outline-offset: 2px;
        }

        &:active {
          background-color: var(--primary-60);
        }
        
        &:disabled {
          cursor: not-allowed;
          background-color: var(--neutral-20);
          color: var(--neutral-30);
        }`
  }
  
  ${
    size === 'sm'
      ? `
    padding: ${color === 'secondary' ? 'calc(0.5rem - 1px) calc(1rem - 1px)' : '0.5rem 1rem'};
    font-size: 0.875rem;
    line-height: 1rem;
  `
      : ''
  }

  ${
    size === 'lg'
      ? `
    padding: ${color === 'secondary' ? 'calc(1rem - 1px) calc(2rem - 1px)' : '1rem 2rem'};
    font-size: 1.125rem;
    line-height: 1.75rem;
  `
      : ''
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }
`

export const Button = styled.button<{ $size?: 'sm' | 'lg'; $color?: 'secondary' }>`
  ${({ $color, $size }) => button($color, $size)}
`

export const ButtonLink = styled(Link)<{ $size?: 'sm' | 'lg'; $color?: 'secondary' }>`
  font-size: 1rem;
  line-height: 1.5;
  text-decoration: none;
  ${({ $color, $size }) => button($color, $size)}
`
