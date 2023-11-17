import styled from 'styled-components'

export const Button = styled.button`
  background-color: transparent;
  border: solid 1px transparent;
  border-radius: 50%;
  color: var(--primary-60);
  cursor: pointer;
  height: 18px;
  margin-left: 8px;
  padding: 0;
  vertical-align: middle;
  width: 18px;

  &:hover {
    background-color: var(--primary-20);
    color: var(--primary-70);
  }

  &:focus {
    svg {
      background-color: var(--primary-20);
      border-radius: 50%;
    }
    color: var(--primary-70);
    outline: 3px solid var(--primary-40);
  }

  &:active {
    background-color: var(--primary-30);
    color: var(--primary-80);
    outline: none;
  }
`
