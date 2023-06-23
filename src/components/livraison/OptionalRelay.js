import SelectRelays from "./SelectRelays";
import styled from "styled-components";

export default function OptionalRelay(props) {
  return (
    <Wrapper show={props.show}>
      <GridContainer>
        <div className="item1">
          <Text>Vous effectuez généralement le trajet jusqu'au point relais</Text>
        </div>
        <div className="item2">
          <SelectRelays changeRelay={props.changeRelay} value={props.value}></SelectRelays>
        </div>
        <div className="item3"></div>
        <div className="item4"></div>
      </GridContainer>
    </Wrapper>
  );
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  ${(props) => props.theme.mq.xlarge} {
    grid-template-columns: repeat(1, 1fr);
  }
  > .item1,
  .item2,
  .item4 {
    align-items: center;
    display: flex;
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

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.textLight2};
  display: ${(props) => (props.show ? "block" : "none")};
  padding: 1rem 0rem 0.5rem 2rem;
  ${(props) => props.theme.mq.xlarge} {
    padding: 1.75rem 1rem 0.5rem 1rem;
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
