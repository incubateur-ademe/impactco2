import Section2 from "components/base/Section2";
import WebBlue from "components/layout/WebBlue";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

export default function PlanDuSite() {
  return (
    <WebBlue title={"Plan du site"}>
      <Section2>
        <Section2.InnerMargin>
          <FormatText>
            <h1>Plan du site</h1>
            <Link href="/" title="Page d'accueil" className="level1">
              Page d'accueil
            </Link>
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
