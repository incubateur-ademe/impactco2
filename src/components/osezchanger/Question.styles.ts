import styled from 'styled-components'

export const QuestionCard = styled.div<{ $customBorderRadius?: boolean }>`
  align-items: center;
  border-bottom: 1px solid var(--secondary-20);
  padding: 1.5rem 0 1rem 0;
  position: relative;
`

export const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 0.5rem;
  justify-content: space-between;
  margin-bottom: 0.25rem;

  button {
    margin-top: -0.25rem;
  }
`

export const Content = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`

export const Title = styled.div`
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.25rem;
  width: 200px;
`

export const Description = styled.label`
  color: var(--secondary-70);
  flex: 1 0 0;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.25rem;
  min-width: 200px;
`

export const Tag = styled.div`
  align-items: center;
  background-color: var(--primary-60);
  border-radius: 2px;
  color: var(--primary-10);
  display: flex;
  font-size: 0.75rem;
  font-weight: 400;
  height: 20px;
  padding: 0.125rem 0.5rem;
`
