import { trajs } from "./data.js";
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

export default function SelectTrajs2(props) {
  return (
    <>
      <StyledSelect
        onChange={(e) => {
          props.changetraj && props.changetraj(trajs.find((traj) => traj.uid === e.value));
        }}
        value={props.value}
        label=""
        name="trajs"
      >
        {trajs.map((traj) => (
          <option key={traj.uid} value={traj.uid}>
            {traj.displayed}
          </option>
        ))}
      </StyledSelect>
    </>
  );
}
