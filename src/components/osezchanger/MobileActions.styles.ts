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
  font-size: 14px;
  gap: 8px;
  padding: 12px 16px;
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

export const Tag = styled.div`
  background-color: var(--primary-30);
  border-radius: 2px;
  color: var(--primary-70);
  font-size: 12px;
  padding: 2px 8px;
  width: fit-content;
`

export const Text = styled.div`
  min-width: 240xp;
`
