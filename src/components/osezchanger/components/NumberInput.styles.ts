import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  width: fit-content;
`

export const Input = styled.input`
  -moz-appearance: textfield;
  border: 1px solid var(--secondary-20);
  font-weight: 700;
  margin: 0 -1px;
  padding-block: 0;
  padding-inline: 0;
  text-align: center;
  width: 36px;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  &:hover {
    border: 1px solid var(--secondary-30);
  }

  &:focus {
    outline: 3px solid var(--secondary-40);
    outline-offset: 2px;
    z-index: 3;
  }
`

const Button = styled.button`
  align-items: center;
  background-color: transparent;
  border: 1px solid var(--secondary-20);
  color: var(--secondary-60);
  cursor: pointer;
  display: flex;
  font-size: 0.75rem;
  font-weight: 700;
  height: 36px;
  justify-content: center;
  width: 36px;
  z-index: 1;

  &:hover {
    background-color: var(--secondary-20);
    border: 1px solid var(--secondary-30);
    color: var(--secondary-70);
  }

  &:focus {
    color: var(--secondary-70);
    outline: 3px solid var(--secondary-40);
    outline-offset: 2px;
  }

  &:active {
    background: var(--secondary-30);
    border: 1px solid var(--secondary-40);
  }

  &:disabled {
    background-color: transparent;
    border: 1px solid var(--secondary-20);
    color: var(--secondary-30);
    cursor: not-allowed;
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }
`

export const LeftButton = styled(Button)`
  border-radius: 4px 0 0 4px;
`

export const RightButton = styled(Button)`
  border-radius: 0 4px 4px 0;
`
