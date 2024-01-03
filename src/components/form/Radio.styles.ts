import styled from 'styled-components'

export const Legend = styled.legend<{ $error?: boolean }>`
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

export const Inputs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 2.5rem;
`
