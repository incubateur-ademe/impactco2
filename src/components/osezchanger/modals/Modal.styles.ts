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

export const Content = styled.div`
  background-color: var(--secondary-10);
  border-radius: 0 0 8px 8px;
  padding: 0 24px;
`

export const Children = styled.div`
  margin: 32px 0;
`

export const Header = styled.div`
  align-items: center;
  border-bottom: 1px solid var(--secondary-20);
  display: flex;
  font-size: 16px;
  font-weight: 700;
  justify-content: space-between;
  line-height: 20px;
  padding: 16px 0;
`

export const Footer = styled.div`
  border-top: 1px solid var(--secondary-20);
  margin: 0 -24px;
  padding: 12px 0;
  button {
    margin: auto;
  }
`
