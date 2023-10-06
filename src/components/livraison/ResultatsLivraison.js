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
  // const [whitelist] = useLocalStorage("ico2_whitelist", default_eqs);

  // eslint-disable-next-line no-unused-vars
  // const [eqvArray, setEqvArray] = useLocalStorage("ico2_eqv_array", default_eqs_ticked);

  // eslint-disable-next-line no-unused-vars
  const [eqv1L, setEqv1L] = useLocalStorage("ico2_eqv1L");
  // eslint-disable-next-line no-unused-vars
  const [eqv2L, setEqv2L] = useLocalStorage("ico2_eqv2L");
  // eslint-disable-next-line no-unused-vars
  const [eqv3L, setEqv3L] = useLocalStorage("ico2_eqv3L");

  const GetEq = (indx) => {
    if (indx === 0) {
      return equivalents.find((e) => e.slug === (eqv1L || default_eqs[0]));
    } else if (indx === 1) {
      return equivalents.find((e) => e.slug === (eqv2L || default_eqs[1]));
    } else if (indx === 2) {
      return equivalents.find((e) => e.slug === (eqv3L || default_eqs[2]));
    }
  };

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
  grid-template-columns: repeat(3, auto);
  grid-template-rows: 1.25fr 1fr;
`;

const ButtonContainer = styled.div`
  align-items: center;
  display: flex;
  grid-column: span 3;
  justify-content: flex-end;
  min-width: 220px;
`;
