import styled from "styled-components";

export default function OptionalTraj(props) {
  return (
    <Wrapper>
      <div className="item1"></div>
      <div className="item2">
        <FlexCenter>
          <Text>Pour cela, vous parcourez une distance de&nbsp;</Text>
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
      <div className="item3"></div>
      <div className="item4">
        <SmallExplanation>
          Exemple: si vous faites un détour de 2km sur votre trajet domicile-travail, indiquez ces 2km.
        </SmallExplanation>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.textLight2};
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  display: grid;
  grid-template-columns: 6rem auto;
  ${(props) => props.theme.mq.large} {
    grid-template-columns: 0 auto;
  }
  padding: 0 0 1.5rem 2rem;
  ${(props) => props.theme.mq.small} {
    padding: 0 0 1.5rem 1rem;
  }
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
  color: ${(props) => props.theme.colors.main2};
  text-align: right;
  width: 2rem;
`;

const FlexCenter = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  ${(props) => props.theme.mq.small} {
    align-items: flex-start;
    flex-direction: column;
  }
`;

const Flex = styled.div`
  display: flex;
`;

const SmallExplanation = styled.div`
  color: ${(props) => props.theme.colors.textGray};
  font-size: 14px;
  padding-right: 0.5rem;
`;
