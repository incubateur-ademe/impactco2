import styled, { css } from 'styled-components'
import { MEDIA } from 'utils/styles'

const sizes = {
  lg: '1400px',
  sm: '1000px',
  xs: '800px',
}
export const Section = styled.section<{
  $theme?: 'color' | 'main'
  $withoutPadding?: boolean
  $size?: 'xs' | 'sm' | 'lg'
}>`
  max-width: ${({ $size }) => $size && sizes[$size]};
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

export const SectionWideContent = styled.div<{
  $size?: 'xs' | 'sm' | 'lg'
  $noGutter?: boolean
  $flex?: boolean
}>`
  margin: auto;
  max-width: ${({ $size }) => sizes[$size || 'lg']};
  ${({ $flex }) =>
    $flex &&
    css`
      display: flex;
      flex-wrap: wrap;
      gap: 2rem;
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
