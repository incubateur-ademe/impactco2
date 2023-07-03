import styled from "styled-components";

export default function OptionalTraj(props) {
  return (
    <Wrapper>
      <GridContainer>
        <div className="item1"></div>
        <div className="item2">
          <Text>Pour cela, vous parcourez une distance de&nbsp;</Text>
        </div>
        <div className="item3">
          <FlexCenter>
            <Flex>
              <Input
                type="number"
                value={props.km}
                onChange={(e) => props.changeKm(e.target.value)}
                min="0"
                step="1"
              ></Input>
              <Text>&nbsp;km</Text>
            </Flex>
          </FlexCenter>
        </div>
        <div className="item4"></div>
      </GridContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.textLight2};
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  padding: 0.25rem 0rem 1rem 2rem;
  ${(props) => props.theme.mq.xlarge} {
    padding: 0 1rem 1.5rem 1rem;
  }
`;

const GridContainer = styled.div`
  /* display: grid; */
  ${(props) => props.theme.mq.xlarge} {
    /* grid-template-columns: repeat(1, 1fr); */
  }
  /* grid-template-columns: auto auto 1fr auto; */
  > .item1 {
    display: flex;
    ${(props) => props.theme.mq.medium} {
      align-items: flex-start;
      flex-direction: column;
    }
  }
  /* > .item2,
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
  padding-top: 5px; */
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

const Input = styled.input`
  background-color: inherit;
  border-color: lightgray;
  border-radius: 5px;
  border-style: solid;
  border-width: 1px;
  color: #39a69e;
  text-align: right;
  width: 2rem;
`;

const FlexCenter = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  ${(props) => props.theme.mq.small} {
    align-items: flex-start;
    flex-direction: column;
  }
`;
const Flex = styled.div`
  display: flex;
`;
