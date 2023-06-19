import Modal3 from "components/base/Modal3";
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

export default function EqModal3() {
  const { ecv: open, setEcv: setOpen } = useContext(ModalContext);

  return (
    <Modal3 open={open} setOpen={setOpen} getTitle={getTitle} width="50rem">
      <Text>
        Le dérèglement climatique actuel est une conséquence de nos émissions importantes de différents gaz à effet de
        serre. Nous pouvons mesurer ces émissions avec un indice simple : les kilogrammes d&apos;équivalent CO
        <sub>2</sub> (kgCO<sub>2</sub>e).
      </Text>
      <Text>
        <strong>
          Chaque gaz à effet est de serre est ramené à un équivalent en CO
          <sub>2</sub> selon son pouvoir de réchauffement.
        </strong>
      </Text>
    </Modal3>
  );
}

const GreenText = styled.span`
  color: #1c9b93;
`;

const Title = styled.h2`
  margin: 1rem 0;
`;

const Text = styled.p`
  margin-bottom: 2rem;
  margin-top: 0;
`;
