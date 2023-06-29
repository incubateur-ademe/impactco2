import Select from "components/base/Select";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.second};
  border-radius: 1rem;
  margin-right: 2rem;
  padding: 1.5rem;
  width: 24rem;

  ${(props) => props.theme.mq.medium} {
    margin-bottom: 1.5rem;
    width: 100%;
  }
`;

export default function IflConfigurator(props) {
  return (
    <Wrapper>
      <Select
        onChange={({ value }) => props.setTheme(value)}
        label={`<span>1) Choisissez le thème de votre iframe.</span>`}
        name="theme"
      >
        <option value="default">Clair</option>
        <option value="night">Sombre</option>
      </Select>
    </Wrapper>
  );
}
