import Link from 'next/link'
import styled from 'styled-components'

export const Container = styled(Link)`
  align-items: center;
  background-color: white;
  border: 1px solid var(--secondary-20);
  border-radius: 4px;
  color: var(--neutral-80);
  display: flex;
  margin-top: 8px;
  text-decoration: none;

  img {
    border-right: 1px solid var(--secondary-20);
    border-radius: 4px 0 0 4px;
  }

  &:hover {
    border: 1px solid var(--secondary-30);
    img {
      border-right: 1px solid var(--secondary-30);
    }
  }

  &:focus {
    border: 1px solid var(--secondary-40);
    img {
      border-right: 1px solid var(--secondary-40);
    }
    outline: 3px solid var(--secondary-40);
    outline-offset: 2px;
  }
`

export const Text = styled.div`
  font-size: 14px;
  font-weight: 700;
  line-height: 18px;
  padding: 12px;
`
