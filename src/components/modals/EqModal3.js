import FruitSearch from "./FruitSearch";
import NumSearch from "./NumSearch";
import Button from "components/base/Button";
import Modal3 from "components/base/Modal3";
import { default_eqs } from "components/livraison/data.js";
import ModalContext from "components/providers/ModalProvider";
import React, { useContext } from "react";
import styled from "styled-components";
import useLocalStorage from "use-local-storage";

const getTitle = () => {
  return (
    <Title>
      Choisir <GreenText>d&apos;autres équivalences</GreenText>
    </Title>
  );
};

export default function EqModal3() {
  const { eqv: open, setEqv: setOpen } = useContext(ModalContext);
  const [whitelist, setWhitelist] = useLocalStorage("ico2_whitelist");

  // eslint-disable-next-line no-unused-vars
  const [eqv1L, setEqv1L] = useLocalStorage("ico2_eqv1L");
  const [eqv2L, setEqv2L] = useLocalStorage("ico2_eqv2L");
  const [eqv3L, setEqv3L] = useLocalStorage("ico2_eqv3L");

  const validateEqv = () => {
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
    <Modal3 open={open} setOpen={setOpen} getTitle={getTitle} dismiss={dismiss} width="45rem">
      <Intro>Sélectionnez (ou désélectionnez) des équivalents pour créer votre infographie personnalisée.</Intro>
      <H2Title>Fruits et légumes</H2Title>
      <FruitSearch open={open}></FruitSearch>
      <H2Title>Usages du numérique</H2Title>
      <NumSearch open={open}></NumSearch>
      <Flex>
        <ButtonValidation onClick={validateEqv}>Valider et fermer</ButtonValidation>
        <ButtonCancel onClick={dismiss}>Annuler</ButtonCancel>
      </Flex>
    </Modal3>
  );
}

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
`;

const H2Title = styled.div`
  color: #1c9b93;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0em;
  line-height: 24px;
  margin-top: 2rem;
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

const Flex = styled.div`
  display: flex;
`;
