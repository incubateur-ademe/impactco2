import styled from "styled-components";

const Section2 = styled.section``;

Section2.WideContent = styled.div`
  ${(props) => props.theme.mq.medium} {
    width: 100vw;
  }
`;
Section2.InnerMargin = styled.div`
  margin-left: ${(props) => (props.embedded ? 2 : 8)}rem;
  margin-right: ${(props) => (props.embedded ? 2 : 8)}rem;
  ${(props) => props.theme.mq.xlarge} {
    margin-left: ${(props) => (props.embedded ? 1.75 : 4)}rem;
    margin-right: ${(props) => (props.embedded ? 1.75 : 4)}rem;
  }
  ${(props) => props.theme.mq.large} {
    margin-left: ${(props) => (props.embedded ? 1.5 : 3)}rem;
    margin-right: ${(props) => (props.embedded ? 1.5 : 3)}rem;
  }
  ${(props) => props.theme.mq.medium} {
    margin-left: ${(props) => (props.embedded ? 1 : 2)}rem;
    margin-right: ${(props) => (props.embedded ? 1 : 2)}rem;
  }
  ${(props) => props.theme.mq.small} {
    margin-left: ${(props) => (props.embedded ? 0.5 : 1)}rem;
    margin-right: ${(props) => (props.embedded ? 0.5 : 1)}rem;
  }
`;

export default Section2;
