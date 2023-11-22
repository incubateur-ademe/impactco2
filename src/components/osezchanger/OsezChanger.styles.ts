import styled from 'styled-components'
import Button from 'components/base/Button'

export const Screenshot = styled.div<{ $isScreenshotting: boolean }>`
  background-color: var(--secondary-10);
  ${({ $isScreenshotting }) =>
    $isScreenshotting &&
    `
      margin-right: -16px;
      padding: 0 16px 16px 16px;
  `}
`

export const Container = styled.div<{ $defiMode?: boolean }>`
  background-color: var(--secondary-10);
  border-radius: 8px;
  color: var(--natural-80);
  flex: 1 0 0;
  font-family: Marianne;
  height: fit-content;
  max-width: 440px;
  min-width: 312px;
  padding: 24px;
  position: relative;
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

export const Logos = styled.div`
  margin-top: 24px;
`

export const BottomLogos = styled(Logos)`
  border-top: 1px solid var(--secondary-20);
  padding-top: 24px;
`
