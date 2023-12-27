import styled from 'styled-components'

export const Container = styled.div<{ $iframe?: boolean }>`
  border: 1px solid var(--neutral-20);
  border-radius: 16px;
  margin: auto;
  padding: ${({ $iframe }) => ($iframe ? '1.5rem 1.5rem 1rem 1.5rem' : '1.5rem')};
  position: relative;
`

export const Screenshot = styled.div`
  background-color: white;
`
