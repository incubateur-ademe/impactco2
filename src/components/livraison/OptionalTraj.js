import { convertGramsToKilograms } from "./utils";
import styled from "styled-components";

export default function OptionalTraj(props) {
  return (
    <Wrapper show={props.show}>
      <GridContainer>
        <div className="item1">
          <FlexCenter>
            <Text>Pour cela, vous parcourez une distance de&nbsp;</Text>
            <Input
              type="number"
              value={props.km}
              onChange={(e) => props.changeKm(e.target.value)}
              min="0"
              step="1"
            ></Input>
            <Text>&nbsp;km</Text>
          </FlexCenter>
        </div>
        <div className="item2"></div>
        <div className="item3"></div>
        <div className="item4">
          <Addendum>
            <span className="plus">+</span> {convertGramsToKilograms(props.diffKm0)} kg de CO2e
          </Addendum>
        </div>
      </GridContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.textLight2};
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  display: ${(props) => (props.show ? "block" : "none")};
  margin-top: -10px;
  padding: 0.5rem 3rem;
  ${(props) => props.theme.mq.xlarge} {
    padding: 1rem 1rem 1.5rem 1rem;
  }
  z-index: -1;
`;

const GridContainer = styled.div`
  display: grid;
  ${(props) => props.theme.mq.xlarge} {
    grid-template-columns: repeat(1, 1fr);
  }
  grid-template-columns: auto auto 1fr auto;
  > .item1 {
    display: flex;
    ${(props) => props.theme.mq.medium} {
      flex-direction: column;
      align-items: flex-start;
    }
  }
  > .item2,
  .item4 {
    align-items: center;
  }
  .item2 {
    padding-left: 1rem;
    ${(props) => props.theme.mq.xlarge} {
      padding-left: 0;
      > div > select {
        padding-left: 0;
      }
    }
  }
  padding-top: 5px;
`;

const Text = styled.div`
  font-size: 16px;
  ${(props) => props.theme.mq.large} {
    font-size: 14px;
  }
  font-weight: 400;
  letter-spacing: 0em;
  line-height: 24px;
`;

const Addendum = styled.div`
  color: #235dd2;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0em;
  line-height: 16px;
  > .plus {
    font-size: 28px;
  }
`;

const Input = styled.input`
  border-color: ${(props) => props.theme.colors.text};
  border-radius: 5px;
  border-style: solid;
  border-width: 1px;
  text-align: right;
  width: 2rem;
`;

const FlexCenter = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;
