import SelectRelays from "./SelectRelays";
import styled from "styled-components";

export default function OptionalRelay(props) {
  console.log("props", props);
  return (
    <Wrapper show={props.displayOption}>
      <GridContainer>
        <div className="item1">
          <Text>Vous effectuez généralement le trajet jusqu'au point relais</Text>
        </div>
        <div className="item2">
          <SelectRelays changeRelay={props.changeRelay}></SelectRelays>
        </div>
        <div className="item3"></div>
        <div className="item4">
          <Addendum>
            <span className="plus">+</span> 0 kg de CO2e
          </Addendum>
        </div>
      </GridContainer>
    </Wrapper>
  );
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  > .item1,
  .item2,
  .item4 {
    align-items: center;
    display: flex;
  }
  .item2 {
    padding-left: 1rem;
  }
  padding-top: 5px;
`;

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.textLight};
  display: ${(props) => (props.show ? "block" : "none")};
  margin-top: -10px;
  padding: 0.5rem 1rem;
  z-index: -1;
`;

const Text = styled.div`
  font-size: 16px;
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
