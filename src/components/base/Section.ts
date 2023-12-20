import styled, { css } from 'styled-components'

export const Section = styled.section<{ $theme?: 'color' | 'main'; $withoutPadding?: boolean }>`
  ${({ $theme, theme }) =>
    $theme === 'color'
      ? `background-color: #ebf2ff;`
      : $theme === 'main'
        ? `background-color: ${theme.colors.main};`
        : ''}
  ${({ $withoutPadding, theme }) =>
    !$withoutPadding &&
    css`
      padding: 4rem 0;
      ${theme.mq.large} {
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
      ${(props) => props.theme.mq.large} {
        padding: 0 1rem;
      }
      ${(props) => props.theme.mq.medium} {
        padding: 0 0.5rem;
      }
    `}
`
