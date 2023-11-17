import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`

export const Text = styled.div`
  font-size: 16px;
  line-height: 24px;
  a {
    color: var(--neutral-80);
  }
`

export const Cards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`
