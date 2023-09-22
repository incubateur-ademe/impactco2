import Section2 from "components/base/Section2";
import Web from "components/layout/Web";
import React from "react";
import styled from "styled-components";

export default function Cookies() {
  return (
    <Web title={"Mentions légales"}>
      <Section2>
        <Section2.InnerMargin>
          <FormatText>
            <h1>Gestion des cookies</h1>
            <p>Ce site n'utilise pas de cookie.</p>
            <p>
              Nous sommes ainsi en conformité avec la réglementation « Cookies » de la CNIL et exemptés d’autorisation
              préalable. C’est pour cela que vous n’avez pas eu besoin de cliquer sur un bloc pour accepter le dépôt de
              cookies !
            </p>
          </FormatText>
        </Section2.InnerMargin>
      </Section2>
    </Web>
  );
}

const FormatText = styled.div`
  h1 {
    font-size: 3rem;
  }
  > h2 {
    margin-top: 3rem;
  }
`;
