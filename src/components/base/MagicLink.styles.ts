import Link from 'next/link'
import styled from 'styled-components'

export const Button = styled.button<{ $color?: 'secondary' }>`
  ${({ $color }) =>
    $color === 'secondary' &&
    `
      color: var(--secondary-50);

      &:hover {
        color: var(--secondary-70);
      }

      &:focus {
        outline: 3px solid var(--secondary-40);
        outline-offset: 2px;
      }
    `}
`

export const StyledLink = styled(Link)<{ $color?: 'secondary' }>`
  border-radius: 2px;
  ${({ $color }) =>
    $color === 'secondary'
      ? `
          color: var(--secondary-50);

          &:hover {
            color: var(--secondary-70);
          }

          &:focus {
            outline: 3px solid var(--secondary-40);
            outline-offset: 2px;
          }
        `
      : `
          color: var(--primary-50);

          &:hover {
            color: var(--primary-70);
          }

          &:focus {
            outline: 3px solid var(--primary-40);
            outline-offset: 2px;
          }
        `}
`
