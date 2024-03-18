import styled from 'styled-components'

export const Container = styled.div`
  text-align: center;
`

export const Content = styled.div`
  margin-bottom: 1.5rem;
  margin-top: 0.75rem;
  text-align: left;
`

export const Separator = styled.div`
  border-top: 1px solid var(--neutral-20);
  margin-bottom: 1.5rem;
`

export const ActionsContainer = styled.div`
  border: 1px solid var(--neutral-20);
  border-radius: 16px;
  margin: auto;
  max-width: 800px;
  padding: 0.75rem 1.5rem;
  width: 100%;
`

export const ActionsHeader = styled.div<{ $center?: boolean }>`
  align-items: center;
  display: flex;
  justify-content: ${({ $center }) => ($center ? 'center' : 'space-between')};
  width: 100%;

  @media screen and (max-width: 550px) {
    flex-direction: column;
    justify-content: center;
  }
`

export const ActionsName = styled.div`
  color: var(--neutral-50);
`
