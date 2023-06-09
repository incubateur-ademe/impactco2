import Modal2 from "components/base/Modal2";
import ModalContext from "components/providers/ModalProvider";
import React, { useContext } from "react";
import styled from "styled-components";

export default function Co2eModal2() {
  const { Co2e: open, setCo2e: setOpen } = useContext(ModalContext);
  return (
    <Modal2 open={open} setOpen={setOpen}>
      <Title>
        Comprendre{" "}
        <GreenText>
          L&apos;équivalent CO<sub>2</sub> (CO<sub>2</sub>e)
        </GreenText>
      </Title>
      <Text>
        Le dérèglement climatique actuel est une conséquence de nos émissions importantes de différents gaz à effet de
        serre. Nous pouvons mesurer ces émissions avec un indice simple : les kilogrammes d&apos;équivalent CO
        <sub>2</sub> (kgCO<sub>2</sub>e).
      </Text>
      <Text>
        Chaque gaz à effet est de serre est ramené à un équivalent en CO
        <sub>2</sub> selon son pouvoir de réchauffement. Par exemple, 1 kg de méthane équivaut à 28 kg de CO<sub>2</sub>{" "}
        car il est 28 fois plus réchauffant. Si la fabrication d&apos;un produit a émis 1 kg de méthane et 1 kg de CO
        <sub>2</sub>, alors l&apos;impact total de ce produit est de 29 kg d&apos;équivalent CO<sub>2</sub>.
      </Text>
    </Modal2>
  );
}

const GreenText = styled.span`
  color: #1c9b93;
`;

const Title = styled.h2``;

const Text = styled.p``;
