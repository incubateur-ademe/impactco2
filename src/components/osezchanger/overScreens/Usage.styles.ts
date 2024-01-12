import styled from 'styled-components'

export const Container = styled.div`
  border-top: 1px solid var(--secondary-20);
  color: var(--neutral-70);
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding-top: 2rem;

  a {
    color: var(--neutral-70);

    &:hover {
      color: var(--primary-60);
    }
  }

  p {
    margin-bottom: 0.5rem;
  }
`

export const Box = styled.div`
  border: 1px solid var(--secondary-20);
  border-radius: 4px;
  margin-top: 2rem;
  width: 100%;
`

export const Button = styled.button`
  align-items: center;
  background-color: transparent;
  border: none;
  color: var(--neutral-70);
  cursor: pointer;
  display: flex;
  font-size: 0.875rem;
  font-weight: 700;
  gap: 0.5rem;
  line-height: 1.25rem;
  padding: 0.75rem;
  width: 100%;

  svg {
    color: var(--secondary-60);
  }
`

export const BoxContent = styled.div`
  padding: 0 0.75rem 0.75rem 0.75rem;
`
