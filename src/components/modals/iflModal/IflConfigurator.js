import IflCode from "./IflCode";
import Select from "components/base/Select";
import React from "react";
import styled from "styled-components";

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
      <BottomAdvice>
        <p>
          Pour réutiliser les données brutes ou obtenir de l'aide pour intégrer ce simulateur, contactez l’équipe à
          impactco2@ademe.fr.
        </p>
        <p>
          Pour réutiliser le code du simulateur, consultez le code du site Impact CO2, développé de manière ouverte
          (open source).
        </p>
      </BottomAdvice>
    </Wrapper>
  );
}

const BottomAdvice = styled.div`
  background-color: #ebf2ff;
  border-radius: 8px;
  margin-top: auto;
  padding: 24px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-right: 2rem;
  padding: 1.5rem;
  padding-bottom: 0;
  ${(props) => props.theme.mq.medium} {
    margin-bottom: 1.5rem;
    width: 100%;
  }
`;
