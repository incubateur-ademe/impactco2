import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

export const Text = styled.div`
  font-size: 1rem;
  line-height: 1.5rem;
  a {
    color: var(--neutral-80);

    &:hover {
      color: var(--primary-60);
    }
  }
`

export const Cards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`
