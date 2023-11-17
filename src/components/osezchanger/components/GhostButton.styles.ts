import styled from 'styled-components'

export const Button = styled.button`
  align-items: center;
  background-color: transparent;
  border: none;
  border-radius: 4px;
  color: var(--secondary-60);
  cursor: pointer;
  display: flex;
  font-size: 14px;
  gap: 8px;
  line-height: 20px;

  &:hover {
    background-color: var(--secondary-20);
    color: var(--secondary-70);
  }

  &:focus {
    background: var(--secondary-20);
    color: var(--secondary-70);
    outline: 3px solid var(--secondary-40);
  }

  &:active {
    background: var(--secondary-30);
    color: var(--secondary-80);
  }

  &:disabled {
    background-color: transparent;
    color: var(--secondary-30);
    cursor: not-allowed;
  }
`
