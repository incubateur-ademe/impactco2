import MagicLink from "components/base/MagicLink";
import Section2 from "components/base/Section2";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  font-size: 0.75rem;
  font-weight: 400;
  height: 3.05rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
  padding: 1rem;
`;
export default function BreadCrumb3() {
  return (
    <Section2>
      <Section2.InnerMargin>
        <nav aria-label="fil d'ariane">
          <Wrapper>
            <MagicLink to="/">Accueil</MagicLink>
            {" > "} <>Documentation</>
          </Wrapper>
        </nav>
      </Section2.InnerMargin>
    </Section2>
  );
}
