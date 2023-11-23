import Link from 'next/link'
import styled from 'styled-components'

export const Container = styled(Link)`
  align-items: center;
  background-color: var(--primary-10);
  border: 1px solid var(--primary-20);
  border-radius: 8px;
  color: var(--primary-60);
  display: none;
  flex-wrap: wrap;
  font-size: 0.875rem;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  text-decoration: none;
  @media screen and (max-width: 1100px) {
    display: flex;
  }
  width: 100%;

  &:hover {
    background-color: var(--primary-20);
    border: 1px solid var(--primary-30);
    color: var(--primary-60);
  }

  &:focus {
    outline: 3px solid var(--primary-40);
    outline-offset: 2px;
  }

  &:active {
    background-color: var(--primary-30);
    border: 1px solid var(--primary-40);
    color: var(--primary-80);
  }
`

export const Text = styled.div`
  min-width: 240xp;
`
