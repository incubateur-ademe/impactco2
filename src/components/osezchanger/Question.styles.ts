import styled from 'styled-components'

export const QuestionCard = styled.div<{ $customBorderRadius?: boolean }>`
  align-items: center;
  background-color: white;
  border-radius: ${({ $customBorderRadius }) => ($customBorderRadius ? '8px 8px 0 0' : '8px')};
  display: flex;
  gap: 32px;
  margin-top: 16px;
  padding: 8px;
  position: relative;
`

export const Title = styled.h2`
  margin-top: 0;
`

export const QuestionInput = styled.div`
  display: flex;

  input {
    -moz-appearance: textfield;
    width: 25px;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`

export const Tag = styled.div`
  background-color: green;
  border-radius: 4px;
  color: white;
  padding: 4px;
  position: absolute;
  right: 8px;
  top: 8px;
`
