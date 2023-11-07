import styled from 'styled-components'

export const UpperSide = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  ${(props) => props.theme.mq.large} {
    align-items: flex-start;
    flex-direction: column;
    gap: 24px;
  }
`

export const Separator = styled.div`
  margin: 1.5rem 0;
`

export const CtaContainer = styled.div`
  ${(props) => props.theme.mq.xlarge} {
    font-size: 0.875rem;
  }
`

export const H2Title = styled.h2`
  font-size: 1.75rem;
  ${(props) => props.theme.mq.large} {
    font-size: 1.25rem;
  }
  margin-bottom: 0;
  > span {
    display: block;
    ${(props) => props.theme.mq.small} {
      display: inline;
    }
  }

  b {
    color: ${(props) => props.theme.colors.main};
  }
`
