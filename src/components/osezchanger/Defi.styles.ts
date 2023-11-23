import styled, { css } from 'styled-components'

export const Result = styled.div`
  margin-top: 2rem;
  position: relative;
`

export const NonEmptyResult = styled.div<{ $visible: boolean }>`
  opacity: 0;
  ${({ $visible }) =>
    $visible &&
    css`
      opacity: 1;
      transition: opacity 0.5s ease;
    `}
`

export const ResultDescription = styled.div`
  color: var(--neutral-70);
  font-size: 0.75rem;
  line-height: 1rem;
  margin-top: 0.5rem;
`

export const ResultValue = styled.div`
  color: var(--primary-60);
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1.25rem;
`

export const Equivalents = styled.div`
  display: flex;
  gap: 0.75rem;
  margin: 0.75rem 0 0.5rem 0;
`
