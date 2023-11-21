import styled from 'styled-components'

export const Box = styled.button`
  background-color: white;
  border: 1px solid var(--secondary-20);
  border-radius: 4px;
  color: var(--neutral-50);
  cursor: pointer;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  padding: 12px 52px 12px 16px;
  position: relative;
  text-align: left;
  width: 100%;
`

export const Copy = styled.div`
  color: var(--secondary-60);
  position: absolute;
  right: 16px;
  top: calc(50% - 14px);
`

export const Copied = styled.div`
  background-color: var(--secondary-20);
  color: var(--secondary-60);
  padding: 8px;
  position: absolute;
  right: 16px;
  top: calc(50% - 16px);
`
