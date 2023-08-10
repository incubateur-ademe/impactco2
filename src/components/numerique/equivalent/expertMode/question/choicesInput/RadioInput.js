import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  border-right: 0.125rem solid ${(props) => props.theme.colors.main};

  &:last-child {
    border-right: none;
  }

  input {
    cursor: pointer;
    height: 0;
    opacity: 0;
    position: absolute;
    width: 0;
  }
`;
const Label = styled.label`
  align-items: center;
  background-color: ${(props) => (props.checked ? props.theme.colors.main : "transparent")};
  color: ${(props) => props.theme.colors[props.checked ? "background" : "main"]};
  cursor: pointer;
  display: flex;
  font-size: 1rem;
  gap: 0.75rem;
  line-height: 1.2;
  padding: 0.5rem 0.75rem;
  position: relative;

  ${(props) => props.theme.mq.small} {
    font-size: 1rem;
  }
`;
export default function RadioInput(props) {
  return (
    <Wrapper>
      <input
        type="radio"
        id={props.id}
        name={props.name}
        value={props.value}
        checked={props.checked}
        onChange={props.onChange}
      />
      <Label htmlFor={props.id} checked={props.checked}>
        {props.label}
      </Label>
    </Wrapper>
  );
}
