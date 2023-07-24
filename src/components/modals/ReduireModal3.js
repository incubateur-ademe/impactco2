import CopyUrl from "./shareModal/CopyUrl";
import Facebook2 from "./shareModal/Facebook2";
import Linkedin2 from "./shareModal/Linkedin2";
import Twitter2 from "./shareModal/Twitter2";
import Whatsapp2 from "./shareModal/Whatsapp2";
import Modal3 from "components/base/Modal3";
import { removeAdvicesFromOgTags } from "components/livraison/utils.js";
import ModalContext from "components/providers/ModalProvider";
import React, { useContext, useState } from "react";
import styled from "styled-components";

const href = `${process?.env?.NEXT_PUBLIC_SITE_URL?.includes("localhost") ? "http" : "https"}://${
  process?.env?.NEXT_PUBLIC_SITE_URL
}/livraison#ressource`;

const getTitle = () => {
  return (
    <Title>
      Partager <GreenText>la ressource</GreenText>
    </Title>
  );
};

export default function ReduireModal3() {
  const { reduire: open, setReduire: setOpen } = useContext(ModalContext);
  const [copied, setCopied] = useState(false);

  const dismiss = () => {
    removeAdvicesFromOgTags();
    setCopied(false);
    setOpen(false);
  };

  return (
    <Modal3 open={open} setOpen={setOpen} getTitle={getTitle} dismiss={dismiss} width="45rem">
      <br />
      <CopyUrl url={href} copied={copied} setCopied={setCopied} />
      <Alternative>- ou -</Alternative>
      <WrapperSocial>
        <Facebook2
          className="item1"
          quote={"Découvrez l’impact carbone de la livraison d’un colis grâce au simulateur d’#impactCO2"}
          url={href}
        />
        <Twitter2
          title={"Découvrez l’impact carbone de la livraison d’un colis grâce au simulateur d’#impactCO2"}
          url={href}
        />
        <Whatsapp2
          title={"Découvrez l’impact carbone de la livraison d’un colis grâce au simulateur d’#impactCO2"}
          url={href}
        />
        <Linkedin2 url={href} />
      </WrapperSocial>
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

const WrapperSocial = styled.div`
  align-items: center;
  display: flex;
  ${(props) => props.theme.mq.small} {
    flex-direction: column;
  }
  flex-wrap: wrap;
  justify-content: center;
  button + button {
    margin-left: 1rem;
    ${(props) => props.theme.mq.small} {
      margin-left: 0rem;
    }
  }
`;

const Alternative = styled.div`
  color: #746770;
  margin-bottom: 1rem;
  text-align: center;
  text-transform: uppercase;
`;
