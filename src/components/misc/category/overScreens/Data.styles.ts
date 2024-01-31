import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`

export const StyledEmoji = styled.div`
  background-color: var(--primary-10);
  border-radius: 50%;
  display: inline-block;
  font-size: 1.5rem;
  line-height: 1;
  margin-right: 0.5rem;
  padding: 0.5rem;
`

export const Text = styled.div`
  padding: 0.75rem 0;
`

export const Values = styled.div<{ $withBorder: boolean }>`
  align-items: center;
  ${({ $withBorder }) => $withBorder && 'border-bottom: 1px solid var(--neutral-20);'}
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  padding: 1.25rem 0;
`

export const Value = styled.div`
  background: var(--neutral-10);
  border: 1px solid var(--neutral-20);
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
`

export const Hypothesis = styled.div`
  color: var(--neutral-50);
  padding: 0.5rem 0 0.75rem 0;
`
