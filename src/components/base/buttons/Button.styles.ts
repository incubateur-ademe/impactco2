import Link from 'next/link'
import styled from 'styled-components'
import { getBaseColor } from './colors'
import { Priority } from './priority'

const button = (priority?: Priority, size?: 'sm' | 'lg') => {
  const baseColor = getBaseColor(priority)

  return `
  -webkit-appearance: none;
  appearance: none;
  border: none;
  border-radius: 8px;
  padding: ${baseColor.color === 'secondary' ? 'calc(0.5rem - 1px) calc(1.25rem - 1px)' : '0.5rem 1.25rem'};
  cursor: pointer;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: fit-content;
  
  ${
    baseColor.color === 'secondary'
      ? `
        background-color: transparent;
        color: var(--primary-${baseColor.base + 10});
        border: solid 1px var(--primary-${baseColor.base + 10});

        &:hover {
          color: var(--primary-${baseColor.base + 30});
          border: solid 1px var(--primary-${baseColor.base + 30});
        }

        &:focus {
          outline: 3px solid var(--primary-${baseColor.base + 10});
          outline-offset: 2px;
        }

        &:active {
          color: var(--primary-${baseColor.base + 20});
          border: solid 1px var(--primary-${baseColor.base + 20});
        }
        
        &:disabled {
          cursor: not-allowed;
          border: solid 1px var(--neutral-20);
          color: var(--neutral-30);
        }`
      : `
        color: var(--neutral-00);
        background-color: var(--primary-${baseColor.base + 10});
        &:hover {
          background: var(--primary-${baseColor.base + 30});
        }

        &:focus {
          outline: 3px solid var(--primary-${baseColor.base + 10});
          outline-offset: 2px;
        }

        &:active {
          background-color: var(--primary-${baseColor.base + 20});
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
    padding: ${baseColor.color === 'secondary' ? 'calc(0.5rem - 1px) calc(1rem - 1px)' : '0.5rem 1rem'};
    font-size: 0.875rem;
    line-height: 1rem;
  `
      : ''
  }

  ${
    size === 'lg'
      ? `
    padding: ${baseColor.color === 'secondary' ? 'calc(1rem - 1px) calc(2rem - 1px)' : '1rem 2rem'};
    font-size: 1.125rem;
    line-height: 1.75rem;
  `
      : ''
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }
`
}

export const Button = styled.button<{ $size?: 'sm' | 'lg'; $priority?: Priority }>`
  ${({ $priority, $size }) => button($priority, $size)}
`

export const ButtonLink = styled(Link)<{ $size?: 'sm' | 'lg'; $priority?: Priority }>`
  font-size: 1rem;
  line-height: 1.5;
  text-decoration: none;
  ${({ $priority, $size }) => button($priority, $size)}
`
