import styled from 'styled-components'

export const Container = styled.div<{ $inline?: boolean }>`
  align-items: center;
  display: flex;
  flex-direction: ${({ $inline }) => ($inline ? 'row' : 'column')};
  justify-content: space-between;
`

export const Label = styled.label<{ $error?: boolean; $inline?: boolean }>`
  color: var(--neutral-80);
  display: inline-block;
  font-weight: 500;
  margin-bottom: ${({ $inline }) => ($inline ? '0' : '0.5rem')};

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

const input = (color?: 'secondary', background?: 'white') => `
  align-items: center;
  background: ${background === 'white' ? 'var(--neutral-00)' : 'var(--neutral-10)'};
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

export const StyledInput = styled.input<{
  $maxWidth?: string
  $color?: 'secondary'
  $background?: 'white'
  $error?: boolean
}>`
  ${({ $color, $background }) => input($color, $background)}
  ${({ $maxWidth }) => `max-width:${$maxWidth || '560px'};`}
  
  ${({ $error }) => $error && 'border-bottom: 2px solid var(--critical-50) !important;'}
`

export const StyledSelect = styled.select<{ $maxWidth?: string; $color?: 'secondary' }>`
  ${({ $color }) => input($color)}
  ${({ $maxWidth }) => `max-width:${$maxWidth || 'fit-content'};`}

  appearance: none;
  background-image: var(--dropdown-arrow-black);
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 1em;
  padding-right: 2.5rem;
`

export const StarsButtons = styled.div`
  align-items: center;
  display: flex;
  margin: 0 -0.25rem;

  button {
    background-color: transparent;
    border: none;
    border-radius: 2px;
    color: var(--primary-50);
    cursor: pointer;
    padding: 0;
    padding: 0.25rem;

    &:focus {
      outline: 3px solid var(--primary-50);
      outline-offset: -2px;
    }

    &:focus:not(:focus-visible) {
      outline: none;
    }
  }
`

export const Error = styled.div`
  align-items: center;
  color: var(--critical-50);
  display: flex;
  gap: 0.25rem;
  margin-top: 0.5rem;
`
