import ActualChoices from "./ActualChoices";
import AllSearch from "./AllSearch";
import Button from "components/base/Button";
import Modal4 from "components/base/Modal4";
import { default_eqs, default_eqs_ticked } from "components/livraison/data.js";
import ModalContext from "components/providers/ModalProvider";
import React, { useContext } from "react";
import styled from "styled-components";
import useLocalStorage from "use-local-storage";

const getTitle = () => {
  return (
    <Title>
      Choisir <GreenText>d'autres équivalences</GreenText>
    </Title>
  );
};

export default function EqModal4() {
  const { eqv: open, setEqv: setOpen } = useContext(ModalContext);
  const [whitelist, setWhitelist] = useLocalStorage("ico2_whitelist");
  // eslint-disable-next-line no-unused-vars
  const [eqvArray, setEqvArray] = useLocalStorage("ico2_eqv_array", []);

  const [eqv1L, setEqv1L] = useLocalStorage("ico2_eqv1L");
  const [eqv2L, setEqv2L] = useLocalStorage("ico2_eqv2L");
  const [eqv3L, setEqv3L] = useLocalStorage("ico2_eqv3L");

  const validateEqv = () => {
    setEqvArray([default_eqs_ticked[0], default_eqs_ticked[1], default_eqs_ticked[2]]);
    setWhitelist([eqv1L || default_eqs[0], eqv2L || default_eqs[1], eqv3L || default_eqs[2]]);
    setOpen(false);
  };

  const dismiss = () => {
    setEqv1L(whitelist[0] || default_eqs[0]);
    setEqv2L(whitelist[1] || default_eqs[1]);
    setEqv3L(whitelist[2] || default_eqs[2]);
    setOpen(false);
  };

  return (
    <Modal4 open={open} setOpen={setOpen} getTitle={getTitle} dismiss={dismiss} width="55rem">
      <Intro>
        Sélectionnez plusieurs équivalences pour comparer votre impact et créer votre infographie personnalisée.
      </Intro>
      <GridSplit>
        <GridSplitLeft>
          <ActualChoices></ActualChoices>
        </GridSplitLeft>
        <GridSplitRight>
          <Scroll>
            <AllSearch open={open}></AllSearch>
          </Scroll>
          <ValidationZone>
            <ValidationButtons>
              <ButtonValidation onClick={validateEqv}>Valider et fermer</ButtonValidation>
              <ButtonCancel onClick={dismiss}>Annuler</ButtonCancel>
            </ValidationButtons>
          </ValidationZone>
        </GridSplitRight>
      </GridSplit>
    </Modal4>
  );
}
const Scroll = styled.div`
  height: 35rem;
  overflow-x: hidden;
  overflow-y: auto;
`;

const Title = styled.h2`
  font-size: 22px;
  margin: 1rem 0;
`;

const GreenText = styled.span`
  color: #1c9b93;
`;

const Intro = styled.div`
  font-size: 16px;
  font-weight: 300;
  letter-spacing: 0em;
  line-height: 24px;
  margin: 1rem 0;
  padding-left: 1.5rem;
`;

const ButtonValidation = styled(Button)`
  border-radius: 8px;
`;

const ButtonCancel = styled.button`
  background-color: white;
  border-color: #b5abb2;
  border-radius: 8px;
  border-style: solid;
  border-width: 1px;
  color: #564d53;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0em;
  line-height: 24px;
  margin-left: 0.5rem;
  padding: 8px 16px 8px 16px;
  text-align: center;
`;

const ValidationZone = styled.div`
  background-color: white;
  bottom: 0;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  left: 0;
  position: fixed;
  width: 100%;
`;

const ValidationButtons = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: 1rem;
  padding: 1rem 0;
`;

const GridSplit = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
`;

const GridSplitLeft = styled.div``;

const GridSplitRight = styled.div``;
