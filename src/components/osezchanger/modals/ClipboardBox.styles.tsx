import styled from 'styled-components'

export const Box = styled.button`
  background-color: white;
  border: 1px solid var(--secondary-20);
  border-radius: 4px;
  color: var(--neutral-50);
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1rem;
  padding: 0.75rem 3.25rem 0.75rem 1rem;
  position: relative;
  text-align: left;
  width: 100%;
`

export const Copy = styled.div`
  color: var(--secondary-60);
  position: absolute;
  right: 1rem;
  top: calc(50% - 0.75rem);
`

export const Copied = styled.div`
  background-color: var(--secondary-20);
  color: var(--secondary-60);
  padding: 8px;
  position: absolute;
  right: 1rem;
  top: calc(50% - 1rem);
`
