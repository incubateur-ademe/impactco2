import styled from 'styled-components'

const Section3 = styled.div``

Section3.WideContent = styled.div`
  ${(props) => props.theme.mq.medium} {
    width: 100vw;
  }
`
Section3.InnerMargin = styled.div`
  margin-left: ${(props) => (props.embedded ? 2 : 4)}rem;
  margin-right: ${(props) => (props.embedded ? 2 : 4)}rem;
  ${(props) => props.theme.mq.xlarge} {
    margin-left: ${(props) => (props.embedded ? 1.75 : 2.5)}rem;
    margin-right: ${(props) => (props.embedded ? 1.75 : 2.5)}rem;
  }
  ${(props) => props.theme.mq.large} {
    margin-left: ${(props) => (props.embedded ? 1.5 : 2)}rem;
    margin-right: ${(props) => (props.embedded ? 1.5 : 2)}rem;
  }
  ${(props) => props.theme.mq.medium} {
    margin-left: ${(props) => (props.embedded ? 1 : 1.5)}rem;
    margin-right: ${(props) => (props.embedded ? 1 : 1.5)}rem;
  }
  ${(props) => props.theme.mq.small} {
    margin-left: ${(props) => (props.embedded ? 0.5 : 0.75)}rem;
    margin-right: ${(props) => (props.embedded ? 0.5 : 0.75)}rem;
  }
`

export default Section3
