import Link from 'next/link'
import styled from 'styled-components'
import { getBaseColor } from './colors'
import { Priority } from './priority'

const LinkStyle = (priority?: Priority) => {
  const baseColor = getBaseColor(priority)
  return `
    border-radius: 2px;
    color: var(--${baseColor.color}-${baseColor.base});

    &:hover {
      color: var(--${baseColor.color}-${baseColor.base + 20});
    }

    &:focus {
      outline: 3px solid var(--${baseColor.color}-${baseColor.base - 20});
      outline-offset: 2px;
    }

    &:focus:not(:focus-visible) {
      outline: none;
    }
  `
}

export const Button = styled.button<{ $priority?: Priority }>`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;

  ${({ $priority }) => LinkStyle($priority)}
`

export const StyledLink = styled(Link)<{ $priority?: Priority }>`
  ${({ $priority }) => LinkStyle($priority)}
`
