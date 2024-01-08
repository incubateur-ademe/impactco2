import Link from 'next/link'
import styled from 'styled-components'

const LinkStyle = (style?: 'secondary' | 'secondary-dark') => {
  if (style === 'secondary-dark') {
    return `
      border-radius: 2px;
      color: var(--secondary-60);

      &:hover {
        color: var(--secondary-80);
      }

      &:focus {
        outline: 3px solid var(--secondary-40);
        outline-offset: 2px;
      }

      &:focus:not(:focus-visible) {
        outline: none;
      }
    `
  }
  const color = style || 'primary'
  return `
    border-radius: 2px;
    color: var(--${color}-50);

    &:hover {
      color: var(--${color}-70);
    }

    &:focus {
      outline: 3px solid var(--${color}-40);
      outline-offset: 2px;
    }

    &:focus:not(:focus-visible) {
      outline: none;
    }
  `
}

export const Button = styled.button<{ $color?: 'secondary' }>`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;

  ${({ $color }) => LinkStyle($color)}
`

export const StyledLink = styled(Link)<{ $color?: 'secondary' | 'secondary-dark' }>`
  ${({ $color }) => LinkStyle($color)}
`
