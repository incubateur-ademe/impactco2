import Link from 'next/link'
import styled from 'styled-components'

export const Card = styled(Link)`
  background-color: white;
  border: 1px solid var(--secondary-20);
  border-radius: 4px;
  color: var(--neutral-70);
  display: flex;
  font-size: 16px;
  font-weight: 700;
  gap: 12px;
  line-height: 20px;
  padding: 12px;
  text-decoration: none;
`

export const Bar = styled.div<{ $width: number }>`
  background-color: var(--primary-50);
  border-radius: 40px;
  height: 20px;
  width: ${({ $width }) => $width}px;
`
export const Values = styled.span`
  align-items: center;
  color: var(--primary-60);
  display: flex;
  font-size: 16px;
  font-weight: 700;
  gap: 16px;
  line-height: 20px;
  margin-top: 8px;
  max-height: 20px;
`

export const Value = styled.span`
  font-size: 20px;
`
