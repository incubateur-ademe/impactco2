import styled from 'styled-components'

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 2rem;
  justify-content: space-between;
  margin-bottom: 2rem;
`

export const Checkbox = styled.label<{ $checked: boolean }>`
  align-items: center;
  color: var(--neutral-50);
  cursor: pointer;
  display: flex;
  font-weight: 500;
  gap: 0.5rem;
  position: relative;
  text-align: left;

  input {
    -webkit-appearance: none;
    appearance: none;

    border: 1px solid var(--secondary-50);
    border-radius: 4px;
    cursor: pointer;
    height: 1.75rem;
    width: 1.75rem;
  }

  input:checked {
    background-color: var(--secondary-40);
  }

  &:hover {
    color: var(--neutral-70);

    input {
      outline: 1px solid var(--secondary-50);
      ${({ $checked }) => $checked && 'border: 1px solid var(--secondary-60);'}
      ${({ $checked }) => $checked && 'outline: 1px solid var(--secondary-60);'}
    }

    input:checked {
      background-color: var(--secondary-50);
    }
  }

  input:focus {
    outline: 3px solid var(--secondary-50);
    outline-offset: 2px;
  }
`

export const Check = styled.div`
  color: white;
  left: 0.5rem;
  position: absolute;
`

export const InputContainer = styled.div`
  position: relative;
`

export const Input = styled.input`
  align-items: center;
  background: var(--neutral-10);
  border: unset;
  border-bottom: 2px solid var(--neutral-60);
  border-radius: 0.5rem 0.5rem 0rem 0rem;
  color: var(--neutral-70);
  display: flex;
  gap: 0.5rem;
  max-width: 100px;
  min-width: 7.5rem;
  padding: 0.5rem 3rem 0.5rem 1rem;
  position: relative;
  text-align: right;

  &:hover {
    border-bottom: 2px solid var(--secondary-50);
  }

  &:focus {
    outline: 3px solid var(--secondary-40);
    outline-offset: 2px;
  }

  &:disabled {
    background: var(--neutral-10);
    border-bottom: 2px solid var(--neutral-20);
    color: var(--neutral-30);
  }
`

export const InputSuffix = styled.span<{ $disabled: boolean }>`
  color: var(--neutral-50);
  position: absolute;
  right: 1rem;
  top: 0.5rem;
  ${({ $disabled }) => $disabled && 'color: var(--neutral-30);'}
`
