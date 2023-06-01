import styled from 'styled-components'

const Section2 = styled.div``

Section2.WideContent = styled.div`
  ${(props) => props.theme.mq.medium} {
    width: 100vw;
  }
`
Section2.InnerMargin = styled.div`
  margin-left: 11rem;
  margin-right: 11rem;
  ${(props) => props.theme.mq.large} {
    margin-left: 5rem;
    margin-right: 5rem;
  }
  ${(props) => props.theme.mq.medium} {
    margin-left: 1rem;
    margin-right: 1rem;
  }
`

export default Section2
