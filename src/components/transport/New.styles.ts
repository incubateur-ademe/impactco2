import styled from 'styled-components'

export const Container = styled.button`
  align-items: center;
  background-color: var(--primary-10);
  border: 1px solid var(--primary-20);
  border-radius: 8px;
  color: var(--primary-60);
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  font-size: 0.875rem;
  gap: 0.5rem;
  margin: auto;
  margin-bottom: 1rem;
  max-width: calc(100% - 1rem);
  padding: 0.75rem 1rem;
  text-decoration: none;
  width: fit-content;

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
  &:focus:not(:focus-visible) {
    outline: none;
  }

  > div {
    margin: auto;
  }
`

export const Text = styled.div`
  min-width: 240px;
`
