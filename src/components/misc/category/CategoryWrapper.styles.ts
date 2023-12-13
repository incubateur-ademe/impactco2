import styled from 'styled-components'

export const Container = styled.div`
  border: 1px solid var(--neutral-20);
  border-radius: 16px;
  margin: auto;
  padding: 1.5rem;
  text-align: center;

  h3 {
    margin-bottom: 0;
  }
`

export const Screenshot = styled.div`
  background-color: white;
`

export const Sources = styled.div`
  margin-top: 0.5rem;
`

export const Content = styled.div`
  margin-top: 1.5rem;
`

// Padding is mandatory for screenshot
export const Logos = styled.div`
  margin-top: 1.5rem;
  padding-bottom: 2rem;
`

export const Cards = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
  > div {
    flex: 1;
  }
`
