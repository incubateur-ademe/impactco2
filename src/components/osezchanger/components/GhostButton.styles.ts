import styled from 'styled-components'

export const Button = styled.button<{ $reverse: boolean }>`
  align-items: center;
  background-color: transparent;
  border: none;
  border-radius: 4px;
  color: var(--secondary-60);
  cursor: pointer;
  display: flex;
  flex-direction: ${({ $reverse }) => ($reverse ? 'row-reverse' : 'row')};
  font-size: 0.875rem;
  gap: 0.5rem;
  line-height: 1.25rem;

  &:hover {
    background-color: var(--secondary-20);
    color: var(--secondary-70);
  }

  &:focus {
    color: var(--secondary-70);
    outline: 3px solid var(--secondary-40);
    outline-offset: 2px;
  }

  &:active {
    background-color: var(--secondary-30);
    color: var(--secondary-80);
  }

  &:disabled {
    background-color: transparent;
    color: var(--secondary-30);
    cursor: not-allowed;
  }
`
