import Modal3 from "components/base/Modal3";
import ModalContext from "components/providers/ModalProvider";
import React, { useContext } from "react";
import styled from "styled-components";

const getTitle = () => {
  return <Title>Comprendre...</Title>;
};

export default function EqModal3() {
  const { eqv: open, setEqv: setOpen } = useContext(ModalContext);

  return (
    <Modal3 open={open} setOpen={setOpen} getTitle={getTitle} width="50rem">
      Modal num 3
    </Modal3>
  );
}

const Title = styled.h2`
  margin: 1rem 0;
`;
