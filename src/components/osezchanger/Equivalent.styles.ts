import styled from 'styled-components'

export const Card = styled.div`
  align-items: center;
  background: white;
  border: 1px solid var(--secondary-20);
  border-radius: 4px;
  box-shadow: 4px 4px 0px 0px var(--secondary-20);
  display: flex;
  flex: 1 1 0px;
  flex-direction: column;
  gap: 4px;
  padding: 20px 8px 12px 8px;
`
export const Value = styled.div`
  font-size: 24px;
  font-weight: 800;
  line-height: 32px;
`

export const Name = styled.div`
  color: var(--neutral-50);
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  max-width: 50px;
  text-align: center;
`
