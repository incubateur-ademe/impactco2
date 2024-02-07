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
  $margin?: string
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
  ${({ $margin }) => $margin && `margin: ${$margin}`}
`

export const SectionWideContent = styled.div<{
  $size?: 'xs' | 'sm' | 'lg'
  $noGutter?: boolean
  $flex?: boolean
  $reverse?: boolean
  $center?: boolean
}>`
  margin: auto;
  max-width: ${({ $size }) => sizes[$size || 'lg']};
  width: 100%;
  ${({ $flex, $center }) =>
    $flex &&
    css`
      display: flex;
      flex-wrap: wrap;
      gap: 1rem 2rem;
      justify-content: space-between;
      ${$center && 'align-items: center;'}
    `}
  ${({ $reverse }) =>
    $reverse &&
    css`
      display: flex;
      flex-direction: column-reverse;
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
