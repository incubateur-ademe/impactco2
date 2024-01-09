import Link from 'next/link'
import styled from 'styled-components'

export const Card = styled(Link)`
  background-color: var(--neutral-00);
  border: 1px solid var(--secondary-20);
  border-radius: 4px;
  color: var(--neutral-70);
  display: flex;
  font-size: 1rem;
  font-weight: 700;
  gap: 0.75rem;
  line-height: 1.25rem;
  padding: 0.75rem;
  text-decoration: none;

  &:hover {
    border: 1px solid var(--secondary-30);
  }

  &:focus {
    outline: 3px solid var(--secondary-40);
    outline-offset: 2px;
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }
`

export const Bar = styled.div<{ $width: number }>`
  background-color: var(--primary-50);
  border-radius: 40px;
  height: 1.25rem;
  width: ${({ $width }) => $width}px;
`

export const Values = styled.span`
  align-items: center;
  color: var(--primary-60);
  display: flex;
  font-size: 1rem;
  font-weight: 700;
  gap: 1rem;
  line-height: 1.25rem;
  margin-top: 0.5rem;
  max-height: 1.25rem;
`

export const Value = styled.span`
  font-size: 1.25rem;
`
