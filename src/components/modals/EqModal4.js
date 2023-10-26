import ActualChoices from "./ActualChoices";
import AllSearch from "./AllSearch";
import Button from "components/base/Button";
import Modal4 from "components/base/Modal4";
import { default_eqs } from "components/livraison/data.js";
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
  const [eqvArray, setEqvArray] = useLocalStorage("ico2_eqv_array", default_eqs);
  const [eqvChosen, setEqvChosen] = useLocalStorage("ico2_eqv_chosen", default_eqs);

  // eslint-disable-next-line no-unused-vars
  const [eqvError, setEqvError] = useLocalStorage("eqvError", "");

  const validateEqv = () => {
    if (eqvArray.length >= 2) {
      setEqvChosen(JSON.parse(JSON.stringify(eqvArray)));
      setEqvError("");
      setOpen(false);
    } else {
      setEqvError("Merci de sélectionner au moins deux objets pour effectuer une comparaison.");
    }
  };

  const dismiss = () => {
    setEqvArray(JSON.parse(JSON.stringify(eqvChosen)));
    setOpen(false);
  };

  console.log("------------open", open);
  return (
    <Modal4 open={open} setOpen={setOpen} getTitle={getTitle} dismiss={dismiss} width="55rem">
      <Intro data-testid="intro">
        {!eqvError ? (
          <>Sélectionnez plusieurs équivalences pour comparer votre impact et créer votre infographie personnalisée.</>
        ) : (
          <>
            <ShowDesktop>
              Sélectionnez plusieurs équivalences pour comparer votre impact et créer votre infographie personnalisée.
            </ShowDesktop>
            <div>
              <EqvError>⚠️ {eqvError}</EqvError>
            </div>
          </>
        )}
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
            <ValidationMsg>
              {eqvError ? (
                <>
                  <EqvError>⚠️ {eqvError}</EqvError>
                </>
              ) : (
                <></>
              )}
            </ValidationMsg>
            <ValidationButtons>
              <ButtonValidation onClick={validateEqv}>
                <ShowDesktop>Valider et fermer</ShowDesktop>
                <ShowMobile>Valider</ShowMobile>
              </ButtonValidation>
              <ButtonCancel onClick={dismiss}>
                <ShowDesktop>Annuler</ShowDesktop>
                <ShowMobile>X</ShowMobile>
              </ButtonCancel>
            </ValidationButtons>
          </ValidationZone>
        </GridSplitRight>
      </GridSplit>
    </Modal4>
  );
}
const Scroll = styled.div`
  height: 600px;
  overflow: auto;
  padding-bottom: 100px;
  &:after {
    content: "";
    display: block;
    height: 0px;
    ${(props) => props.theme.mq.medium} {
      height: 120px;
    }
    ${(props) => props.theme.mq.small} {
      height: 150px;
    }
    ${(props) => props.theme.mq.xsmall} {
      height: 190px;
    }
    width: 100%;
  }
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
  &:hover {
    color: ${(props) => props.theme.colors.persistentText};
  }
  width: 200px;
  ${(props) => props.theme.mq.medium} {
    padding: 2px 4px 2px 4px;
    width: 80px;
  }
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
  ${(props) => props.theme.mq.medium} {
    grid-template-columns: repeat(1, 1fr);
  }
  grid-template-rows: 1fr;
`;

const GridSplitLeft = styled.div``;

const GridSplitRight = styled.div``;

const ValidationMsg = styled.div`
  align-items: center;
  border-radius: 0.25rem;
  display: flex;
  padding: 1rem 1rem 1rem 2rem;
  ${(props) => props.theme.mq.small} {
    font-size: 0.75rem;
    padding-right: 0.25rem;
  }
  ${(props) => props.theme.mq.xsmall} {
    padding-left: 0.2rem;
  }
`;

const ShowMobile = styled.span`
  display: none;
  ${(props) => props.theme.mq.medium} {
    display: inline;
  }
`;
const ShowDesktop = styled.span`
  display: inline;
  ${(props) => props.theme.mq.medium} {
    display: none;
  }
`;

const EqvError = styled.div`
  color: red;
  font-weight: bold;
`;
