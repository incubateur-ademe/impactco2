import Section2 from "components/base/Section2";
import WebBlue from "components/layout/WebBlue";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

export default function Documentation() {
  return (
    <WebBlue title={"Documentation"}>
      <Section2>
        <Section2.InnerMargin>
          <FormatText>
            <h1>Documentation</h1>
            <ul>
              <li>
                <Link href="/documentation/livraison-colis">Livraison de colis</Link>
              </li>
              <li>
                <Link href="/documentation/livraison-colis-par-avion">Livraison de colis par avion</Link>
              </li>
            </ul>
          </FormatText>
          <br></br>
          <br></br>
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
