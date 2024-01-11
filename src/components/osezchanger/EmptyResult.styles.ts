import styled, { css } from 'styled-components'

export const Container = styled.div<{ $hidden: boolean }>`
  background: var(--secondary-20);
  border: 1px solid var(--secondary-20);
  border-radius: 4px;
  box-shadow: 4px 4px 0px 0px transparent;
  color: var(--secondary-50);
  font-size: 0.875rem;
  font-weight: 500;
  height: 100%;
  left: 0;
  line-height: 1.25rem;
  opacity: 1;
  padding: 1rem;
  position: absolute;
  text-align: center;
  top: 0;

  ${({ $hidden }) =>
    $hidden &&
    css`
      opacity: 0;
      transition:
        visibility 0s 0.5s,
        opacity 0.5s ease;
      visibility: hidden;
    `}

  svg {
    height: 64px;
    width: 64px;
  }

  div {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 100%;
    justify-content: center;
    opacity: 0.5;
  }
`
