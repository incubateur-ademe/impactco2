import Section2 from "components/base/Section2";
import WebBlue from "components/layout/WebBlue";
import React from "react";
import styled from "styled-components";

export default function Statistiques() {
  return (
    <WebBlue title={"Statistiques"}>
      <Section2>
        <Section2.InnerMargin>
          <FormatText>
            <h1>Statistiques</h1>
            <h2>Information</h2>
            <p>Cette page est en cours de développement, merci pour votre patience!</p>
          </FormatText>
        </Section2.InnerMargin>
      </Section2>
    </WebBlue>
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
