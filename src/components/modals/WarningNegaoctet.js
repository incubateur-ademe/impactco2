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
        Les données et les calculs sont issues du projet&nbsp;
        <OutboundLink
          href="https://base-empreinte.ademe.fr/documentation/base-impact"
          title="Base impact, étude réalisée par Negaoctet"
        >
          NégaOctet (lauréat de l'appel à projet PERFECTO 2018)
        </OutboundLink>
        .
      </p>
      <p>
        ⚠️ <strong>Attention</strong> : aujourd’hui pour calculer l’impact carbone de Stocker un Go de données, nous ne
        prenons pas en compte dans nos calculs <strong>l’impact carbone de la transmission</strong>.
      </p>
      <p>
        Ces calculs expliquent la différence de résultat entre l'impact carbone que l'on a sur le site&nbsp;
        <OutboundLink href="https://impactco2.fr" title="site Internet impactCO2">
          impactco2.fr
        </OutboundLink>{" "}
        et les données NO partagées sur la base Empreinte de l'ADEME.
      </p>
      <p>Nous mettrons prochainement à jour ces calculs pour intégrer la transmission.</p>
    </Modal2>
  );
}

const Title = styled.h1`
  margin: 0;
`;
