import styled from 'styled-components'

export const Header = styled.div`
  text-align: center;
`

export const Sources = styled.div`
  margin-top: 0.5rem;
`

export const Content = styled.div`
  margin-top: 1.5rem;
`

export const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;

  > div {
    flex: 1;
    min-width: 350px;
    ${(props) => props.theme.mq.medium} {
      min-width: 100%;
    }
  }
`
