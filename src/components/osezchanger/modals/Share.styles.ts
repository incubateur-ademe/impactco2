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

  button {
    background-color: transparent !important;
    border: 1px solid var(--secondary-20) !important;
    border-radius: 4px;
    color: var(--secondary-60) !important;
    cursor: pointer;
    line-height: 0 !important;
    padding: 14px !important;

    &:hover {
      background-color: var(--secondary-20) !important;
      border: 1px solid var(--secondary-30) !important;
      color: var(--secondary-70) !important;
    }

    &:focus {
      outline: 3px solid var(--secondary-40) !important;
      outline-offset: 2px !important;
    }

    &:active {
      background-color: var(--secondary-30) !important;
      color: var(--secondary-80) !important;
    }

    &:disabled {
      background-color: transparent !important;
      border: 1px solid var(--secondary-20) !important;
      color: var(--secondary-30) !important;
      cursor: not-allowed !important;
    }
  }
`
