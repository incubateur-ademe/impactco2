import styled from 'styled-components'

export const Meta = styled.div`
  align-items: center;
  border: 1px solid var(--neutral-20);
  border-radius: 4px;
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem;
  text-align: left;

  img  {
    max-height: 128px;
    width: auto;
  }

  p {
    margin-bottom: 0;
  }
`

export const Buttons = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  margin: 2rem auto;

  button {
    background-color: transparent !important;
    border: 1px solid var(--secondary-20) !important;
    border-radius: 4px;
    color: var(--secondary-60) !important;
    cursor: pointer;
    line-height: 0 !important;
    padding: 0.875rem !important;

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

    &:focus:not(:focus-visible) {
      outline: none;
    }
  }
`
