import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme.colors.background};
  border: 0.125rem solid ${(props) => props.theme.colors.text};
  border-radius: 2rem;
  display: flex;
  height: 1.75rem;
  justify-content: center;
  position: relative;
  transition: border 200ms ease-out, background-color 300ms ease-out;
  width: 1.75rem;

  ${(props) => props.theme.mq.small} {
    height: 1.5rem;
    width: 1.5rem;
  }
`;
const RadioButton = styled.svg`
  height: 1rem;
  width: auto;

  ${(props) => props.theme.mq.small} {
    height: 0.75rem;
  }

  circle {
    fill: ${(props) => (props.checked ? props.theme.colors.main : "none")};
  }
`;
export default function Radio(props) {
  return (
    <Wrapper checkbox={props.checkbox}>
      <RadioButton checked={props.checked} width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50" id="check" />
      </RadioButton>
    </Wrapper>
  );
}
