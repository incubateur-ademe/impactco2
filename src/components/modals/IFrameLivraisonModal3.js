import Modal3 from "components/base/Modal3";
import IflConfigurator from "components/modals/iflModal/IflConfigurator";
import ModalContext from "components/providers/ModalProvider";
import React, { useContext, useState } from "react";
import styled from "styled-components";

const getTitle = () => {
  return (
    <Title>
      Intégrer <GreenText>le simulateur</GreenText>
    </Title>
  );
};

export default function IFrameLivraisonModal3() {
  const { ifl: open, setIfl: setOpen } = useContext(ModalContext);

  const dismiss = () => {
    setOpen(false);
  };

  const [theme, setTheme] = useState("default");
  console.log("theme", theme);

  return (
    <Modal3 open={open} setOpen={setOpen} getTitle={getTitle} dismiss={dismiss} width="45rem">
      <IflConfigurator theme={theme} setTheme={setTheme}></IflConfigurator>
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
