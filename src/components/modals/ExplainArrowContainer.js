import ExplainArrow from "components/modals/ExplainArrow.js";
import styled from "styled-components";

const Wrapper = styled.div`
  border: 1px solid #457be7;
  border-radius: 16px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 1rem;
  ${(props) => props.theme.mq.xlarge} {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, 1fr);
  }
`;

export default function ExplainArrowContainer() {
  return (
    <Wrapper>
      <ExplainArrow></ExplainArrow>
      <div>blabla</div>
    </Wrapper>
  );
}
