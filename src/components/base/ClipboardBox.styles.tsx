import styled from 'styled-components'

export const Box = styled.button<{ $colored?: boolean }>`
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: space-between;
  padding: 0.625rem 0.75rem 0.625rem 1rem;
  position: relative;
  text-align: left;
  width: 100%;

  ${({ $colored }) =>
    $colored
      ? `
          border: 1px solid var(--secondary-20);
          background-color: var(--neutral-00);
          color: var(--neutral-60);

          .clipboard-right-item {
            color: var(--secondary-60);
          }

          &:hover {
            outline: 1px solid var(--secondary-20);

            .clipboard-right-item {
              color: var(--secondary-80);
            }
          }

          &:focus {
            outline-offset: 2px;
            outline: 3px solid var(--secondary-50);
          }
        `
      : `
          border: 1px solid var(--neutral-10);
          background-color: var(--neutral-10);
          color: var(--neutral-60);

          .clipboard-right-item {
            color: var(--secondary-50);
          }

          &:hover {
            background-color: var(--neutral-00);
            outline: 1px solid var(--neutral-10);

            .clipboard-right-item {
              color: var(--secondary-70);
            }
          }

          &:focus {
            outline-offset: 2px;
            outline: 3px solid var(--secondary-40);
          }
        `}

  &:focus:not(:focus-visible) {
    outline: none;
  }
`

export const Content = styled.div`
  display: inline-block;
  width: fit-content;
  word-break: break-word;
`

export const Copy = styled.div<{ $copied: boolean }>`
  align-items: center;
  display: flex;
  flex-grow: 1;
  font-size: 0.875rem;
  font-weight: 500;
  justify-content: flex-end;
  line-height: 1.25rem;
  right: 1rem;
  top: calc(50% - 0.5rem);

  svg {
    margin-left: 0.25rem;
  }

  ${({ $copied }) => $copied && 'color: var(--success-60) !important'}
`
