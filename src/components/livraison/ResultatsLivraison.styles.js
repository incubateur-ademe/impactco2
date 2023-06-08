import styled from "styled-components";

export const Wrapper = styled.div`
  border: 1px solid #457be7;
  border-radius: 16px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 1rem;
  ${(props) => props.theme.mq.xlarge} {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1fr);
  }
`;
