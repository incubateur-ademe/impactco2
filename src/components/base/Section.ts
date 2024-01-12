import styled, { css } from 'styled-components'
import { MEDIA } from 'utils/styles'

export const Section = styled.section<{ $theme?: 'color' | 'main'; $withoutPadding?: boolean }>`
  ${({ $theme }) =>
    $theme === 'color'
      ? 'background-color: var(--secondary-10);'
      : $theme === 'main'
        ? 'background-color: var(--primary-50);'
        : ''}
  ${({ $withoutPadding }) =>
    !$withoutPadding &&
    css`
      padding: 4rem 0;
      ${MEDIA.LT.LARGE} {
        padding: 2rem 0;
      }
    `}
`

const sizes = {
  sm: '1000px',
  xs: '800px',
}

export const SectionWideContent = styled.div<{ $size?: 'xs' | 'sm'; $noGutter?: boolean; $flex?: boolean }>`
  margin: auto;
  max-width: ${({ $size }) => ($size ? sizes[$size] : '1400px')};
  ${({ $flex }) =>
    $flex &&
    css`
      align-items: center;
      display: flex;
      justify-content: space-between;
    `}
  ${({ $noGutter }) =>
    !$noGutter &&
    css`
      padding: 0 2rem;
      ${MEDIA.LT.LARGE} {
        padding: 0 1rem;
      }
      ${MEDIA.LT.MEDIUM} {
        padding: 0 0.5rem;
      }
    `}
`
