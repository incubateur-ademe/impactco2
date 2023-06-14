import { relays } from "./data.js";
import Select from "components/base/Select";
import styled from "styled-components";

const StyledSelect = styled(Select)`
  margin: 1rem;
  > select {
    border: none;
  }
`;

export default function SelectRelays(props) {
  return (
    <>
      <StyledSelect
        onChange={(e) => {
          props.changeRelay && props.changeRelay(relays.find((relay) => relay.uid === e.value));
        }}
        value={props.value}
        label=""
        name="relays"
      >
        {relays.map((relay) => (
          <option key={relay.uid} value={relay.uid}>
            {relay.displayed}
          </option>
        ))}
      </StyledSelect>
    </>
  );
}
