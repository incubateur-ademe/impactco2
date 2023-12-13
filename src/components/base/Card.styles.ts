import styled from 'styled-components'

export const LeftSide = styled.div<{ $small?: boolean; $color?: 'blue' }>`
  align-items: center;
  background-color: var(--${({ $color }) => ($color === 'blue' ? 'secondary' : 'primary')}-10);
  border: 1px solid var(--${({ $color }) => ($color === 'blue' ? 'secondary' : 'primary')}-20);
  border-radius: 16px 0 0 16px;
  display: flex;
  padding: ${({ $small }) => ($small ? '0.5rem' : '1.5rem')};
`

export const ImageContainer = styled.div<{ $small?: boolean }>`
  align-items: center;
  background-color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  ${({ $small }) =>
    $small
      ? `
          height: 40px;
          padding: 8px;
          width: 40px;
        `
      : `
          height: 72px;
          padding: 12px;
          width: 72px;
        `}
`

export const Content = styled.div<{ $small?: boolean }>`
  border: 1px solid var(--neutral-20);
  border-left: 0;
  border-radius: 0 16px 16px 0;
  color: var(--neutral-60);
  flex: 1;
  padding: ${({ $small }) => ($small ? '1.25rem' : '1.5rem')};
  ${({ $small }) =>
    $small &&
    `
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;

      b {
        font-weight: 500;
      }

      svg {
        color: var(--neutral-40);
      }
    `}

  b {
    color: var(--neutral-70);
  }

  p {
    margin: 0;
  }
`

export const LinkText = styled.div`
  color: var(--primary-50);
  font-weight: 500;
  margin-top: 0.5rem;

  svg {
    margin-left: 0.5rem;
  }
`

export const Arrow = styled.div`
  display: inline-block;
`

export const Container = styled.div<{ $small?: boolean; $color?: 'blue' }>`
  width: 100%;
  a,
  button {
    background-color: transparent;
    border: none;
    border-radius: 16px;
    display: flex;
    padding: 0;
    text-align: left;
    text-decoration: none;
    width: 100%;

    &:hover {
      ${LeftSide} {
        background-color: var(--${({ $color }) => ($color === 'blue' ? 'secondary' : 'primary')}-20);
        border: 1px solid var(--${({ $color }) => ($color === 'blue' ? 'secondary' : 'primary')}-30);
      }

      ${Content} {
        border: 1px solid var(--neutral-30);
        border-left: 0;
        color: var(--neutral-70);

        b {
          color: var(--neutral-80);
        }

        svg {
          ${({ $small, $color }) => $small && `color: var(--${$color === 'blue' ? 'secondary' : 'primary'}-50);`}
        }
      ${LinkText} {
        color: var(--${({ $color }) => ($color === 'blue' ? 'secondary' : 'primary')}-60);
      }
    }

    &:focus {
      outline: 3px solid var(--${({ $color }) => ($color === 'blue' ? 'secondary' : 'primary')}-40);
      outline-offset: 2px;
    }

    &:active {
      ${LeftSide} {
        background-color: var(--${({ $color }) => ($color === 'blue' ? 'secondary' : 'primary')}-20);
        border: 1px solid var(--${({ $color }) => ($color === 'blue' ? 'secondary' : 'primary')}-30);
      }

      ${Content} {
        background-color: var(--neutral-10);
        border: 1px solid var(--neutral-30);
        border-left: 0;
      }
    }
  }
`
