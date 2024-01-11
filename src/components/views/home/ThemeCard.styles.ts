import Link from 'next/link'
import styled from 'styled-components'

export const Card = styled(Link)`
  align-items: center;
  background-color: var(--neutral-00);
  border-radius: 8px;
  color: #235dd2;
  display: flex;
  gap: 8px;
  padding: 0.5rem 1rem;
  text-decoration: none;
  &:hover {
    color: #2e5199;
  }
`
