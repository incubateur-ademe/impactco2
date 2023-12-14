import styled from 'styled-components'

export const Container = styled.div<{ $iframe?: boolean }>`
  border: 1px solid var(--neutral-20);
  border-radius: 16px;
  margin: auto;
  padding: ${({ $iframe }) => ($iframe ? '1.5rem 1.5rem 1rem 1.5rem' : '1.5rem')};
  position: relative;
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

export const IFrameLogos = styled.div`
  border-bottom: solid 1px var(--neutral-20);
  border-top: solid 1px var(--neutral-20);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1.5rem 0 1rem 0;
  padding: 1.5rem;
`
