import Facebook2 from "./shareModal/Facebook2";
import Linkedin2 from "./shareModal/Linkedin2";
import Twitter2 from "./shareModal/Twitter2";
import Whatsapp2 from "./shareModal/Whatsapp2";
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

  return (
    <Modal3 open={open} setOpen={setOpen} getTitle={getTitle} dismiss={dismiss} width="45rem">
      <Wrapper>
        <Facebook2 quote={"Découvrez l’impact sur le climat des objets et gestes de votre quotidien"} url={"href"} />
        <Twitter2
          title={"Découvrez l’impact sur le climat des objets et gestes de votre quotidien #impactco2"}
          url={"href"}
        />
        <Linkedin2
          title={"Découvrez l’impact sur le climat des objets et gestes de votre quotidien"}
          summary={"Impact CO2"}
          url={"href"}
        />
        <Whatsapp2 title={"Découvrez l’impact sur le climat des objets et gestes de votre quotidien"} url={"href"} />
      </Wrapper>
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

const Wrapper = styled.div``;
