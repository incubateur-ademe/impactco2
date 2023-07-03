import SelectRelays from "./SelectRelays";
import styled from "styled-components";

export default function OptionalRelay(props) {
  return (
    <Wrapper>
      <FlexContainer>
        <div className="emptySpace"></div>
        <div className="item2">
          <Text>Vous effectuez généralement le trajet jusqu'au point relais</Text>
        </div>
        <div className="item3">
          <SelectRelays changeRelay={props.changeRelay} value={props.value}></SelectRelays>
        </div>
        <div className="item4"></div>
      </FlexContainer>
    </Wrapper>
  );
}

const FlexContainer = styled.div`
  display: flex;
  > .emptySpace {
    min-width: 6rem;
    ${(props) => props.theme.mq.medium} {
      min-width: 0;
    }
  }
  > .item2 {
    align-items: center;
    display: flex;
  }
  > .item3 {
    align-items: center;
    display: flex;
  }
`;

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.textLight2};
  padding: 1rem 0rem 0.5rem 2rem;
  ${(props) => props.theme.mq.small} {
    padding: 1rem 0rem 0.5rem 1rem;
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
