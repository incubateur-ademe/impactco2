import styled from 'styled-components'

const Section2 = styled.div``

Section2.WideContent = styled.div`
  ${(props) => props.theme.mq.medium} {
    width: 100vw;
  }
`
Section2.InnerMargin = styled.div`
  margin-left: 8rem;
  margin-right: 8rem;
  ${(props) => props.theme.mq.medium} {
    margin-left: 4rem;
    margin-right: 4rem;
  }
  ${(props) => props.theme.mq.small} {
    margin-left: 1rem;
    margin-right: 1rem;
  }
`

export default Section2
