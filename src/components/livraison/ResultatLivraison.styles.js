import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: #457be7;
  border-radius: 16px;
  color: white;
  display: grid;
  grid-template-columns: 30px 1fr;
  max-width: 350px;
  > .item1 {
    align-items: center;
    display: flex;
    justify-content: end;
    margin-right: 4px;
    margin-top: 7px;
  }
  > .item4 {
    color: #aec8fc;
    margin-bottom: 1rem;
    margin-top: -5px;
  }
`;
export const ActualResult = styled.span`
  font-size: 36px;
  font-weight: 700;
  line-height: 56px;
`;

export const Units = styled.span`
  font-size: 18px;
  font-weight: 400;
  line-height: 40px;
`;

export const Subexplain = styled.span`
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
`;
