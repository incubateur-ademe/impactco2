import styled from 'styled-components'

export const Container = styled.label<{ $checked: boolean }>`
  align-items: center;
  color: var(--neutral-${({ $checked }) => ($checked ? '80' : '50')});
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
