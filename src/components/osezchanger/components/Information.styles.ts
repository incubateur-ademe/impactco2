import styled from 'styled-components'

export const Button = styled.button`
  background-color: transparent;
  border: solid 2px transparent;
  border-radius: 50%;
  color: var(--primary-60);
  cursor: pointer;
  height: 1.25rem;
  margin-left: 0.5rem;
  padding: 0;
  vertical-align: middle;
  width: 1.25rem;

  &:hover {
    background-color: var(--primary-20);
    color: var(--primary-70);
  }

  &:focus {
    outline: 3px solid var(--primary-40);
  }

  &:active {
    svg {
      background-color: var(--primary-30);
      border-radius: 50%;
    }
    color: var(--primary-80);
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }
`
