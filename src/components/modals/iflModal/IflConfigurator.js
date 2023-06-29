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
        <GoFurther>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1z" />
            </svg>
          </div>
          <div>Aller plus loin</div>
        </GoFurther>
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
  position: relative;
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

const GoFurther = styled.div`
  align-items: center;
  background-color: white;
  border: 2px solid #ebf2ff;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 2px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  display: flex;
  font-weight: 500;
  justify-content: center;
  padding: 8px;
  position: absolute;
  top: -21px;
`;
