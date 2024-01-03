import styled from 'styled-components'

export const Label = styled.label<{ $error?: boolean }>`
  color: var(--neutral-80);
  display: inline-block;
  font-weight: 500;
  margin-bottom: 0.5rem;

  ${({ $error }) => $error && 'color: var(--critical-50);'}
`

export const Hint = styled.div`
  color: var(--neutral-60);
  font-weight: 400;
`

export const NotRequired = styled.span`
  color: var(--neutral-50);
  font-weight: 400;
`

const input = (color?: 'secondary') => `
  align-items: center;
  background: var(--neutral-10);
  border: unset;
  border-bottom: 2px solid var(--neutral-60);
  border-radius: 0.5rem 0.5rem 0rem 0rem;
  color: var(--neutral-70);
  display: flex;
  gap: 0.5rem;
  min-width: 7.5rem;
  padding: 0.5rem 1rem;
  position: relative;
  width: 100%;

  &:hover {
    border-bottom: 2px solid var(--${color === 'secondary' ? 'secondary' : 'primary'}-50);
  }

  &:focus {
    outline: 3px solid var(--${color === 'secondary' ? 'secondary' : 'primary'}-40);
    outline-offset: 2px;
  }

  &:disabled {
    background: var(--neutral-10);
    border-bottom: 2px solid var(--neutral-20);
    color: var(--neutral-30);
  }
`

export const StyledTextArea = styled.textarea<{ $maxWidth?: string; $color?: 'secondary'; $error?: boolean }>`
  ${({ $color }) => input($color)}
  ${({ $maxWidth }) => `max-width:${$maxWidth || '100%'};`}

  ${({ $error }) => $error && 'border-bottom: 2px solid var(--critical-50) !important;'}
`

export const StyledInput = styled.input<{ $maxWidth?: string; $color?: 'secondary'; $error?: boolean }>`
  ${({ $color }) => input($color)}
  ${({ $maxWidth }) => `max-width:${$maxWidth || '560px'};`}
  
  ${({ $error }) => $error && 'border-bottom: 2px solid var(--critical-50) !important;'}
`

export const StyledSelect = styled.select<{ $maxWidth?: string; $color?: 'secondary' }>`
  ${({ $color }) => input($color)}
  ${({ $maxWidth }) => `max-width:${$maxWidth || '560px'};`}

  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 1em;
  padding-right: 2.5rem;
`

export const Error = styled.div`
  align-items: center;
  color: var(--critical-50);
  display: flex;
  gap: 0.25rem;
  margin-top: 0.5rem;
`
