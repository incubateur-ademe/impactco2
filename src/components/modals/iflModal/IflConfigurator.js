import IflCode from "./IflCode";
import Select from "components/base/Select";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-right: 2rem;
  padding: 1.5rem;

  ${(props) => props.theme.mq.medium} {
    margin-bottom: 1.5rem;
    width: 100%;
  }
`;

const getLabel = () => {
  return (
    <span>
      1) Choisissez le <strong>thème</strong> de votre iframe.
    </span>
  );
};

export default function IflConfigurator(props) {
  return (
    <Wrapper>
      <Select onChange={({ value }) => props.setTheme(value)} getLabel={getLabel} name="theme">
        <option value="default">Clair</option>
        <option value="night">Sombre</option>
      </Select>
      <IflCode type={props.path} theme={props.theme}></IflCode>
    </Wrapper>
  );
}
