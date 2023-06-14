import SelectRelays from "./SelectRelays";
import styled from "styled-components";

export default function OptionalRelay(props) {
  return (
    <Wrapper>
      <Text>Vous effectuez généralement le trajet jusqu'au point relais</Text>
      <SelectRelays changeRelay={props.changeRelay}></SelectRelays>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  align-items: center;
  background-color: #f9f7f8;
  display: flex;
  justify-content: left;
`;

const Text = styled.div`
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0em;
  line-height: 24px;
`;
