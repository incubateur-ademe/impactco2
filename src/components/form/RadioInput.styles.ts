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

  input[type='radio'] {
    -webkit-appearance: none;
    appearance: none;

    border: 1px solid var(--primary-50);
    border-radius: 50%;
    cursor: pointer;
    height: 1.75rem;
    width: 1.75rem;
  }

  input[type='radio']:checked {
    background-color: var(--primary-40);
  }

  &:hover {
    color: var(--neutral-70);

    input[type='radio'] {
      outline: 1px solid var(--primary-50);
      ${({ $checked }) => $checked && 'border: 1px solid var(--primary-60);'}
      ${({ $checked }) => $checked && 'outline: 1px solid var(--primary-60);'}
    }

    input[type='radio']:checked {
      background-color: var(--primary-50);
    }
  }

  input[type='radio']:focus {
    outline: 3px solid var(--primary-50);
    outline-offset: 2px;
  }
`
