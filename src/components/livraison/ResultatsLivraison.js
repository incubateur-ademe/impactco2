import ResultatLivraison from "./ResultatLivraison";
import { default_eqs } from "components/livraison/data.js";
import LivraisonEq from "components/misc/tiles/LivraisonEq";
import DataContext from "components/providers/DataProvider";
import ModalContext from "components/providers/ModalProvider";
import React, { useContext } from "react";
import styled from "styled-components";
import useLocalStorage from "use-local-storage";

export default function ResultatsLivraison(props) {
  const { equivalents } = useContext(DataContext);
  const [whitelist] = useLocalStorage("ico2_whitelist", default_eqs);

  const GetEq = (indx) => equivalents.find((e) => e.slug === whitelist[indx]);

  const { setEqv } = useContext(ModalContext);

  const changeClicked = () => {
    window?.please?.track(["trackEvent", "Interaction", "Modal", "livraison_modifier_equivalent"]);
    setEqv("nonecheck");
  };

  return (
    <Wrapper>
      <ResultatLivraison co2eq={props.co2eq} />
      <UpperEq>
        <LivraisonEq slug={1} equivalent={GetEq(0)} weight={props.co2eq / 1000} />
        <LivraisonEq slug={2} equivalent={GetEq(1)} weight={props.co2eq / 1000} />
        <LivraisonEq slug={3} equivalent={GetEq(2)} weight={props.co2eq / 1000} />
        <div></div>
        <div></div>
        <ButtonContainer>
          <ButtonChange onClick={changeClicked} id={`button_change_eq_${props.slug}`}>
            Modifier les équivalences
          </ButtonChange>
        </ButtonContainer>
      </UpperEq>
    </Wrapper>
  );
}

const ButtonChange = styled.button`
  background-color: white;
  border-color: #b5abb2;
  border-radius: 8px;
  border-style: solid;
  border-width: 1px;
  color: #564d53;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0em;
  line-height: 24px;
  margin-right: 0.5rem;
  padding: 4px 12px 4px 12px;
  ${(props) => props.theme.mq.large} {
    max-width: 6rem;
    padding: 0.1rem;
  }
  text-align: center;
`;

const Wrapper = styled.div`
  border: 1px solid #457be7;
  border-radius: 16px;
  display: grid;
  grid-template-columns: auto repeat(1, 1fr);
  margin-top: 1rem;
  ${(props) => props.theme.mq.small} {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1fr);
  }
`;

const UpperEq = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1.25fr 1fr;
`;

const ButtonContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
`;
