import FruitSearch from "./FruitSearch";
import Modal3 from "components/base/Modal3";
import ModalContext from "components/providers/ModalProvider";
import React, { useContext } from "react";
import styled from "styled-components";

const getTitle = () => {
  return (
    <Title>
      Choisir <GreenText>d&apos;autres équivalences</GreenText>
    </Title>
  );
};

export default function EqModal3() {
  const { eqv: open, setEqv: setOpen } = useContext(ModalContext);

  return (
    <Modal3 open={open} setOpen={setOpen} getTitle={getTitle} width="45rem">
      <Intro>Sélectionnez (ou désélectionnez) des équivalents pour créer votre infographie personnalisée.</Intro>
      <H2Title>Fruits et légumes</H2Title>
      <FruitSearch open={open}></FruitSearch>
      <H2Title>Usages du numérique</H2Title>
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
`;
