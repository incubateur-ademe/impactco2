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

export const Content = styled.div<{ $color?: 'secondary' }>`
  background-color: ${({ $color }) => ($color === 'secondary' ? 'var(--secondary-10)' : 'white')};
  border-radius: 0 0 ${({ $color }) => ($color === 'secondary' ? '8px 8px' : '16px 16px')};
  max-height: 64%;
  text-align: left;
`

export const Scroll = styled.div<{ $color?: 'secondary' }>`
  height: calc(100% - ${({ $color }) => ($color === 'secondary' ? '6.5rem' : '8.5rem')});
  overflow: auto;
`

export const Children = styled.div`
  padding: 2rem 1.5rem;
`

export const Header = styled.div<{ $color?: 'secondary' }>`
  align-items: center;
  border-bottom: 1px solid var(--${({ $color }) => ($color === 'secondary' ? 'secondary' : 'neutral')}-20);
  border-radius: ${({ $color }) => ($color === 'secondary' ? '8px 8px' : '16px 16px')} 0 0;
  display: flex;
  justify-content: space-between;
  padding: 1rem 1.5rem;
`

export const Footer = styled.div<{ $color?: 'secondary' }>`
  border-top: 1px solid var(--${({ $color }) => ($color === 'secondary' ? 'secondary' : 'neutral')}-20);
  padding: ${({ $color }) => ($color === 'secondary' ? '0.75rem' : '1rem')} 1.5rem;
  button {
    margin: auto;
  }
`
