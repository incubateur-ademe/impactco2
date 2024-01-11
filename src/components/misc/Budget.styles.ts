import styled from 'styled-components'

export const Box = styled.div`
  background-color: var(--secondary-10);
  border-radius: 8px;
  margin-top: 0.25rem;
  padding: 1rem;
  width: fit-content;
`

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;

  th,
  td {
    border: none;
    padding: 0.25rem 0.5rem;
    text-align: left;
  }

  tbody {
    background-color: var(--secondary-10);
  }

  .total {
    background-color: var(--secondary-20);
  }
`

export const List = styled.ul`
  margin-bottom: 0;
`
