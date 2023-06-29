import Modal3 from "components/base/Modal3";
import ModalContext from "components/providers/ModalProvider";
import React, { useContext } from "react";
import styled from "styled-components";

const getTitle = () => {
  return (
    <Title>
      Choisir <GreenText>une autre équivalence</GreenText>
    </Title>
  );
};

export default function IFrameLivraisonModal3() {
  const { eqv: open, setEqv: setOpen } = useContext(ModalContext);

  const dismiss = () => {
    setOpen(false);
  };

  return (
    <Modal3 open={open} setOpen={setOpen} getTitle={getTitle} dismiss={dismiss} width="45rem">
      <Intro>Texte d'intro.</Intro>
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
