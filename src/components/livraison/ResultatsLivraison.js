import ResultatLivraison from "./ResultatLivraison";
import { default_eqs } from "components/livraison/data";
import LivraisonEq from "components/misc/tiles/LivraisonEq";
import DataContext from "components/providers/DataProvider";
import ModalContext from "components/providers/ModalProvider";
import React, { useContext } from "react";
import styled from "styled-components";
import useLocalStorage from "use-local-storage";

export default function ResultatsLivraison(props) {
  const [eqvChosen] = useLocalStorage("ico2_eqv_chosen", default_eqs);
  const { equivalents } = useContext(DataContext);

  const { setEqv } = useContext(ModalContext);

  const changeClicked = () => {
    window?.please?.track(["trackEvent", "Interaction", "Modal", "livraison_modifier_equivalent"]);
    setEqv("nonecheck");
  };

  const getEq = (indx) => {
    return equivalents.find((e) => e.slug === eqvChosen[indx]);
  };

  const buildLivraisonEq = (indx) => {
    let eq = getEq(indx);
    if (eq) {
      return <LivraisonEq position={indx} equivalent={eq} weight={props.co2eq / 1000} nbCol={eqvChosen.length} />;
    } else {
      return <></>;
    }
  };

  return (
    <Wrapper>
      <ResultatLivraison co2eq={props.co2eq} />
      <UpperEq nbCol={eqvChosen.length}>
        {buildLivraisonEq(0)}
        {buildLivraisonEq(1)}
        {buildLivraisonEq(2)}
        <ButtonContainer nbCol={eqvChosen.length}>
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
  min-width: 190px;
  padding: 4px 12px 4px 12px;
  ${(props) => props.theme.mq.large} {
    max-width: 6rem;
    padding: 0.1rem;
  }
  ${(props) => props.theme.mq.small} {
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
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
    grid-template-rows: 1fr;
  }
`;

const UpperEq = styled.div`
  display: grid;
  grid-template-columns: ${(props) => (props.nbCol === 3 ? "repeat(3, auto)" : "repeat(2, auto)")};
  grid-template-rows: 1.25fr 1fr;
  ${(props) => props.theme.mq.small} {
    grid-template-columns: ${(props) => (props.nbCol === 3 ? "1fr" : "1fr")};
    margin-top: 1.5rem;
  }
`;

const ButtonContainer = styled.div`
  align-items: center;
  border-top: 1px solid #eae5e8;
  display: flex;
  ${(props) => props.theme.mq.small} {
    grid-column: ${(props) => (props.nbCol === 3 ? "inherit" : "inherit")};
  }
  grid-column: ${(props) => (props.nbCol === 3 ? "span 3" : "span 2")};
  justify-content: flex-end;
  margin-left: 1rem;
  margin-right: 1rem;
  min-width: 220px;
`;
