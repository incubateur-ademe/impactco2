import styled from 'styled-components'

export const Text = styled.div`
  color: var(--secondary-30);
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  margin: 16px 0;
  text-align: center;
`

export const Buttons = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 32px;
`

export const Button = styled.div`
  background-color: transparent;
  border: 1px solid var(--secondary-20);
  border-radius: 4px;
  color: var(--secondary-60);
  cursor: pointer;
  height: 50px;
  padding: 14px;

  &:hover {
    background-color: var(--secondary-20);
    border: 1px solid var(--secondary-30);
    color: var(--secondary-70);
  }

  &:focus {
    background-color: var(--secondary-20);
    border: 1px solid var(--secondary-10);
    color: var(--secondary-70);
    outline: 3px solid var(--secondary-40);
  }

  &:active {
    background-color: var(--secondary-30);
    border: 1px solid var(--secondary-40);
    color: var(--secondary-80);
    outline: none;
  }

  &:disabled {
    background-color: transparent;
    border: 1px solid var(--secondary-20);
    color: var(--secondary-30);
    cursor: not-allowed;
  }
`
