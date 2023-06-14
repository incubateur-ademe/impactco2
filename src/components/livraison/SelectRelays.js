import { relays } from "./data.js";
import Select from "components/base/Select";
import styled from "styled-components";

const StyledSelect = styled(Select)`
  margin: 0;
  > select {
    border: none;
    color: ${(props) => props.theme.colors.main};
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0em;
    line-height: 24px;
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
