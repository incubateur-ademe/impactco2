import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  width: fit-content;
`

export const Input = styled.input`
  -moz-appearance: textfield;
  border: 1px solid var(--secondary-20);
  border-radius: 1px;
  font-weight: 700;
  padding-block: 0;
  padding-inline: 0;
  text-align: center;
  width: 36px;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  &:focus {
    border: 1px solid var(--secondary-40);
    outline: 3px solid var(--secondary-30);
  }
`

const Button = styled.button`
  background-color: transparent;
  border: 1px solid var(--secondary-20);
  color: var(--secondary-60);
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
  height: 36px;
  width: 36px;
  z-index: 1;

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

export const LeftButton = styled(Button)`
  border-radius: 4px 0 0 4px;
`

export const RightButton = styled(Button)`
  border-radius: 0 4px 4px 0;
`
