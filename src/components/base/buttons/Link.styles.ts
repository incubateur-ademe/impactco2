import Link from 'next/link'
import styled from 'styled-components'

const LinkStyle = (style?: 'secondary') => {
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

export const StyledLink = styled(Link)<{ $color?: 'secondary' }>`
  ${({ $color }) => LinkStyle($color)}
`
