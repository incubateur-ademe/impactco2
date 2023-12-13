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

export const SectionWideContent = styled.div<{ $small?: boolean; $noGutter?: boolean; $flex?: boolean }>`
  margin: auto;
  max-width: ${({ $small }) => ($small ? '1000px' : '1400px')};
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
