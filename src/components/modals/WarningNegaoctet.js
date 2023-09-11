import Modal2 from "components/base/Modal2";
import OutboundLink from "components/base/OutboundLink";
import ModalContext from "components/providers/ModalProvider";
import React, { useContext } from "react";
import styled from "styled-components";

export default function WarningNegaoctet() {
  const { warningNegaoctet: open, setWarningNegaoctet: setOpen } = useContext(ModalContext);

  const getTitle = () => {
    return <Title>Source des données</Title>;
  };

  return (
    <Modal2 open={open} setOpen={setOpen} getTitle={getTitle}>
      <p>
        Les données et les calculs sont issues de&nbsp;
        <OutboundLink
          href="https://base-empreinte.ademe.fr/documentation/base-impact"
          title="Base impact, étude réalisée par Negaoctet"
        >
          l'étude NégaOctet 2022
        </OutboundLink>
        .
      </p>
      <p>
        ⚠️ Attention : aujourd’hui pour calculer l’impact carbone de Stocker un Go de données, nous ne prenons pas en
        compte dans nos calculs l’impact carbone de la transmission.
      </p>
      <p>
        Ces calculs, expliquent la différence d’impact carbone que l’on a entre le site&nbsp;
        <OutboundLink href="https://impactco2.fr" title="site Internet impactCO2">
          impactco2.fr
        </OutboundLink>{" "}
        et les données NO.{" "}
      </p>
      <p>Nous travaillons à affiner ce calcul et le mettre à jour.</p>
    </Modal2>
  );
}

const Title = styled.h1`
  margin: 0;
`;
