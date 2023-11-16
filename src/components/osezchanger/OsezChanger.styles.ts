import styled from 'styled-components'
import Button from 'components/base/Button'

export const Container = styled.div<{ $defiMode?: boolean }>`
  background-color: var(--secondary-10);
  border-radius: 8px;
  color: var(--natural-80);
  flex: 1 0 0;
  height: fit-content;
  max-width: 440px;
  min-width: 312px;
  padding: 24px;
  ${({ $defiMode }) => $defiMode && 'padding-bottom: 12px;'}
`

export const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
`

export const Description = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  margin-bottom: 8px;
`

export const DefiButton = styled(Button)`
  margin: auto;
`
