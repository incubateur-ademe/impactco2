import styled from 'styled-components'

export const Container = styled.div`
  border-radius: 8px;
  bottom: 0;
  color: var(--neutral-80);
  display: flex;
  flex-direction: column;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 2;
`

export const Shadow = styled.div`
  background-color: #001133;
  border-radius: 8px 8px 0 0;
  flex: 1;
  opacity: 0.15;
`

export const Content = styled.div<{ $theme?: 'blue' }>`
  background-color: ${({ $theme }) => ($theme === 'blue' ? 'var(--secondary-10)' : 'white')};
  border-radius: 0 0 ${({ $theme }) => ($theme === 'blue' ? '8px 8px' : '16px 16px')};
  max-height: 64%;
  padding: 0 1.5rem;
  text-align: left;
`
export const Scroll = styled.div<{ $theme?: 'blue' }>`
  height: calc(100% - ${({ $theme }) => ($theme === 'blue' ? '55px - 47px' : '68px - 68px')});
  overflow: scroll;
`
export const Children = styled.div`
  margin: 2rem 0;
`

export const Header = styled.div<{ $theme?: 'blue' }>`
  align-items: center;
  border-bottom: 1px solid var(--${({ $theme }) => ($theme === 'blue' ? 'secondary' : 'neutral')}-20);
  border-radius: ${({ $theme }) => ($theme === 'blue' ? '8px 8px' : '16px 16px')} 0 0;
  display: flex;
  font-size: 1rem;
  font-weight: 700;
  justify-content: space-between;
  line-height: 1.25rem;
  ${({ $theme }) =>
    $theme === 'blue'
      ? `
          padding: 1rem 0;
        `
      : `
          padding: 1rem 1.5rem;
          margin: 0 -1.5rem;
        `}
`

export const Footer = styled.div<{ $theme?: 'blue' }>`
  border-top: 1px solid var(--${({ $theme }) => ($theme === 'blue' ? 'secondary' : 'neutral')}-20);
  margin: 0 -1.5rem;
  padding: ${({ $theme }) => ($theme === 'blue' ? '0.75rem' : '1rem')} 0;
  button {
    margin: auto;
  }
`
