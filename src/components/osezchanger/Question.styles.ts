import styled from 'styled-components'

export const QuestionCard = styled.div<{ $customBorderRadius?: boolean }>`
  align-items: center;
  border-bottom: 1px solid var(--secondary-20);
  padding: 24px 0 16px 0;
  position: relative;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

export const Content = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`

export const Title = styled.div`
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  margin-bottom: 4px;
`

export const SourceButton = styled.button`
  background-color: transparent;
  border: none;
  color: var(--primary-60);
  cursor: pointer;
  margin-left: 8px;
  padding: 0;
  vertical-align: middle;
`

export const Description = styled.div`
  color: var(--secondary-70);
  flex: 1 0 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  min-width: 200px;
`

export const QuestionInput = styled.div`
  border: 1px solid var(--secondary-20);
  border-radius: 4px;
  display: flex;
`

export const Input = styled.input`
  -moz-appearance: textfield;
  border: none;
  border-left: 1px solid var(--secondary-20);
  border-right: 1px solid var(--secondary-20);
  font-weight: 700;
  padding-block: 0;
  padding-inline: 0;
  text-align: center;
  width: 36px;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`

export const Button = styled.button`
  background-color: transparent;
  border: none;
  color: var(--secondary-60);
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
  height: 36px;
  width: 36px;
`

export const Tag = styled.div`
  align-items: center;
  background-color: var(--primary-60);
  border-radius: 2px;
  color: var(--primary-10);
  display: flex;
  font-size: 12px;
  font-weight: 700;
  height: 16px;
  padding: 2px 8px;
`
