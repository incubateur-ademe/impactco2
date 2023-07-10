import Modal3 from "components/base/Modal3";
import ModalContext from "components/providers/ModalProvider";
import React, { useContext } from "react";
import styled from "styled-components";

const getTitle = () => {
  return (
    <Title>
      Partager <GreenText>le simulateur</GreenText>
    </Title>
  );
};

export default function SocialModal3() {
  const { social: open, setSocial: setOpen } = useContext(ModalContext);

  const dismiss = () => {
    setOpen(false);
  };

  return <Modal3 open={open} setOpen={setOpen} getTitle={getTitle} dismiss={dismiss} width="45rem"></Modal3>;
}

const Title = styled.h2`
  font-size: 22px;
  margin: 1rem 0;
`;

const GreenText = styled.span`
  color: #1c9b93;
`;
