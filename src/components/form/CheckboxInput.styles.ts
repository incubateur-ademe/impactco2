import styled from 'styled-components'

export const Container = styled.label<{ $checked: boolean; $color?: 'secondary' }>`
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

    border: 1px solid var(--${({ $color }) => $color || 'primary'}-50);
    border-radius: 4px;
    cursor: pointer;
    height: 1.75rem;
    width: 1.75rem;
  }

  input:checked {
    background-color: var(--${({ $color }) => $color || 'primary'}-40);
  }

  &:hover {
    color: var(--neutral-70);

    input {
      outline: 1px solid var(--${({ $color }) => $color || 'primary'}-50);
      ${({ $checked, $color }) => $checked && `border: 1px solid var(--${$color || 'primary'}-60);`}
      ${({ $checked, $color }) => $checked && `outline: 1px solid var(--${$color || 'primary'}-60);`}
    }

    input:checked {
      background-color: var(--${({ $color }) => $color || 'primary'}-50);
    }
  }

  input:focus {
    outline: 3px solid var(--${({ $color }) => $color || 'primary'}-50);
    outline-offset: 2px;
  }

  input:focus:not(:focus-visible) {
    outline: none;
  }
`

export const Check = styled.div`
  color: var(--neutral-00);
  left: 0.5rem;
  padding: inherit;
  position: absolute;
`

export const Label = styled.div`
  flex: 1;
`
