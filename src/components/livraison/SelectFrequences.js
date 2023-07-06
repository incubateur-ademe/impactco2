import { frequences } from "./data.js";
import Select from "components/base/Select";
import styled from "styled-components";

const StyledSelect = styled(Select)`
  margin: 1rem;
  > select {
    border: none;
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
        label="A la fréquence de"
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
