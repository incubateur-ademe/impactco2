import styled from 'styled-components'

export const Card = styled.div<{ $withShadow: boolean }>`
  align-items: center;
  background: var(--neutral-00);
  border: 1px solid var(--secondary-20);
  border-radius: 4px;
  ${({ $withShadow }) => $withShadow && 'box-shadow: 4px 4px 0px 0px var(--secondary-20);'}
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1.25rem 0.5rem 0.75rem 0.5rem;
`
export const Value = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  line-height: 2rem;
`

export const Name = styled.div`
  color: var(--neutral-50);
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1rem;
  max-width: 75px;
  text-align: center;
`
