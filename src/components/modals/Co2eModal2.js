import Modal2 from "components/base/Modal2";
import ModalContext from "components/providers/ModalProvider";
import React, { useContext } from "react";
import styled from "styled-components";

const getTitle = () => {
  return (
    <Title>
      Comprendre{" "}
      <GreenText>
        l&apos;équivalent CO<sub>2</sub> (CO<sub>2</sub>e)
      </GreenText>
    </Title>
  );
};

export default function Co2eModal2() {
  const { Co2e: open, setCo2e: setOpen } = useContext(ModalContext);
  return (
    <Modal2 open={open} setOpen={setOpen} getTitle={getTitle} width="50rem">
      <h2>Les hypothèses retenues pour la livraison de colis </h2>
      <p>L'ensemble des calculs sont issus de ...</p>
      <h3>Pour les colis : </h3>
      <p>On considère que...</p>
      <h3>Pour les modes de transports :</h3>
      <p>On considère que ...</p>
    </Modal2>
  );
}

const GreenText = styled.span`
  color: #1c9b93;
`;

const Title = styled.h2`
  margin: 1rem 0;
`;
