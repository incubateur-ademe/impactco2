import styled from 'styled-components'

export const ContentHeader = styled.div`
  margin-bottom: 1.5rem;
`

export const Container = styled.div<{ $iframe?: boolean }>`
  border: 1px solid var(--neutral-20);
  border-radius: 16px;
  flex: 1;
  margin: auto;
  padding: ${({ $iframe }) => ($iframe ? '1.5rem 1.5rem 1rem 1.5rem' : '1.5rem')};
  position: relative;
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

export const Screenshotable = styled.div<{ $darkMode?: boolean }>`
  background-color: ${({ $darkMode }) => ($darkMode ? 'black' : 'white')};
`

export const Content = styled.div`
  flex: 1;
`
