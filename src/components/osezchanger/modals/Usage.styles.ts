import styled from 'styled-components'

export const Container = styled.div`
  border-top: 1px solid var(--secondary-20);
  color: var(--neutral-70);
  font-size: 14px;
  line-height: 20px;
  padding-top: 32px;

  a {
    color: var(--neutral-20);
  }

  p {
    margin-bottom: 8px;
  }
`

export const Box = styled.div`
  border: 1px solid var(--secondary-20);
  border-radius: 4px;
  margin-top: 32px;
  width: 100%;
`

export const Button = styled.button`
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  font-size: 14px;
  font-weight: 700;
  gap: 8px;
  line-height: 20px;
  padding: 12px;
  width: 100%;

  svg {
    color: var(--secondary-60);
  }
`

export const BoxContent = styled.div`
  padding: 0 12px 12px 12px;
`
