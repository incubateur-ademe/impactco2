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

export const Description = styled.div`
  color: var(--secondary-70);
  flex: 1 0 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  min-width: 200px;
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
