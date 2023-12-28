import styled from 'styled-components'

export const Label = styled.label`
  color: var(--neutral-80);
  display: inline-block;
  font-weight: 500;
  margin-bottom: 0.5rem;
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

export const StyledTextArea = styled.textarea<{ $maxWidth?: string; $color?: 'secondary' }>`
  ${({ $color }) => input($color)}
  ${({ $maxWidth }) => `max-width:${$maxWidth || '100%'};`}
`

export const StyledInput = styled.input<{ $maxWidth?: string; $color?: 'secondary' }>`
  ${({ $color }) => input($color)}
  ${({ $maxWidth }) => `max-width:${$maxWidth || '560px'};`}
`
export const StyledSelect = styled.select<{ $maxWidth?: string; $color?: 'secondary' }>`
  ${({ $color }) => input($color)}
  ${({ $maxWidth }) => `max-width:${$maxWidth || '560px'};`}
`
