import styled from 'styled-components'

export const Container = styled.form`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  .input {
    flex-grow: 1;
    margin-bottom: 0;
    min-width: 250px;
    input {
      height: 36px;
    }
  }
`

export const SentMessage = styled.div`
  line-height: 1.15;
  padding: 10px 0;
`
