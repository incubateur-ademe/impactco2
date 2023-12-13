import Link from 'next/link'
import styled from 'styled-components'

export const LeftSide = styled.div`
  align-items: center;
  background-color: var(--primary-10);
  border-radius: 16px 0 0 16px;
  border-right: 1px solid var(--primary-20);
  display: flex;
  padding: 1.5rem;
`
export const ImageContainer = styled.div`
  align-items: center;
  background-color: white;
  border-radius: 50%;
  display: flex;
  height: 72px;
  justify-content: center;
  padding: 12px;
  width: 72px;
`

export const Content = styled.div`
  color: var(--neutral-60);
  padding: 1.5rem;

  b {
    color: var(--neutral-70);
  }

  p {
    margin: 0;
  }
`

export const LinkText = styled.div`
  color: var(--primary-50);
  font-weight: 500;
  margin-top: 0.5rem;

  svg {
    margin-left: 0.5rem;
  }
`

export const Container = styled(Link)`
  border: 1px solid var(--primary-20);
  border-radius: 16px;
  display: flex;
  text-decoration: none;

  &:hover {
    border: 1px solid var(--primary-30);

    ${LeftSide} {
      background-color: var(--primary-20);
      border-right: 1px solid var(--primary-30);
    }

    ${Content} {
      color: var(--neutral-70);

      b {
        color: var(--neutral-80);
      }
    }
    ${LinkText} {
      color: var(--primary-60);
    }
  }

  &:focus {
    outline-offset: 2px;
    outline: 3px solid var(--primary-40);
  }

  &:active {
    border: 1px solid var(--primary-30);

    ${LeftSide} {
      background-color: var(--primary-20);
      border-right: 1px solid var(--primary-30);
    }

    ${Content} {
      background-color: var(--neutral-10);
    }
  }
`
