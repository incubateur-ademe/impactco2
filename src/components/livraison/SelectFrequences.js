import { frequences } from "./data.js";
import Select from "components/base/Select";
import styled from "styled-components";

const StyledSelect = styled(Select)`
  margin: 0;
  > select {
    border: none;
    padding: 0 2rem 0 0;
  }
  > option {
    width: 300px;
  }
`;

export default function SelectFrequences(props) {
  return (
    <>
      <StyledSelect
        onChange={(e) => {
          props.changeFrequence && props.changeFrequence(frequences.find((frequence) => frequence.uid === e.value));
        }}
        value={props.value}
        className="freq"
        label=""
        name="frequences"
      >
        {frequences.map((frequence) => (
          <option key={frequence.uid} value={frequence.uid}>
            {frequence.displayed}
          </option>
        ))}
      </StyledSelect>
    </>
  );
}
