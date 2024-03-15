import styled from 'styled-components'

export const ContentHeader = styled.div`
  margin-bottom: 1.5rem;
`

export const Container = styled.div<{ $iframe?: boolean; $noBorder?: boolean }>`
  border-radius: 16px;
  flex: 1;
  margin: auto;
  padding: ${({ $noBorder, $iframe }) => ($noBorder ? '0' : $iframe ? '1.5rem 1.5rem 1rem 1.5rem' : '1.5rem')};
  ${({ $noBorder }) => $noBorder && 'max-width: 800px;'}
  position: relative;
  ${({ $noBorder, $iframe }) =>
    $noBorder
      ? `border-bottom: 1px solid var(--neutral-20); 
      ${!$iframe && 'padding-bottom: 0;'}`
      : 'border: 1px solid var(--neutral-20);'}
`

// Padding is mandatory for screenshot
export const Logos = styled.div`
  margin-top: 1.5rem;
  padding-bottom: 2rem;
`

export const IFrameLogos = styled.div`
  border-bottom: solid 1px var(--neutral-20);
  border-top: solid 1px var(--neutral-20);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1.5rem 0 1rem 0;
  padding: 1.5rem;
  text-align: center;
`

export const Screenshotable = styled.div<{ $theme?: 'color'; $noBorder?: boolean }>`
  background-color: ${({ $theme }) => ($theme ? 'var(--secondary-10)' : 'var(--neutral-00)')};
  border-radius: 16px;
`

export const Content = styled.div`
  flex: 1;
`

export const Theme = styled.div<{ $theme?: 'color' }>`
  background-color: ${({ $theme }) => ($theme === 'color' ? 'var(--secondary-10)' : 'var(--neutral-00)')};
  border-radius: 16px;
  color: var(--neutral-70);
`

export const Separator = styled.div`
  height: 2.5rem;
`

export const Iframe = styled.div<{ $noBorder?: boolean }>`
  ${({ $noBorder }) =>
    $noBorder &&
    `border-left: solid 1px var(--neutral-20);
    border-right: solid 1px var(--neutral-20);
    margin: -1.5rem -1.5rem -1rem -1.5rem;
    padding: 1.5rem 1.5rem 1rem 1.5rem;
    border-radius: 0 0 16px 16px;
  `}
`

export const ContentActions = styled.div`
  margin-bottom: 1.5rem;
  min-width: min(calc(100vw - 2rem), 440px);
`
