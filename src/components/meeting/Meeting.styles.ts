import styled from 'styled-components'

export const Container = styled.form`
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  div {
    flex: 1;
    min-width: 250px;
  }
`

export const SentMessage = styled.div`
  line-height: 1.15;
  padding: 10px 0;
`
