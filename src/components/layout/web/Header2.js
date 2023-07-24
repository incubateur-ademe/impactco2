import Flex from "components/base/Flex";
import Logo from "components/base/Logo";
import MagicLink from "components/base/MagicLink";
import Marianne from "components/base/Marianne";
import Section2 from "components/base/Section2";
import Nav2 from "components/layout/web/Nav2.js";
import React from "react";
import styled from "styled-components";

const Header = styled.header`
  box-shadow: 0px 2px 6px #f3f6ff;
  position: relative; // or box-shadow will not appear
`;

const Logos = styled(MagicLink)``;

export default function Header2() {
  return (
    <Section2>
      <Section2.WideContent>
        <Header aria-label="En-tête">
          <Section2.InnerMargin>
            <Flex.Between>
              <Flex>
                <Logos to="/" aria-label="Accueil">
                  <Marianne />
                </Logos>
                <Logo />
              </Flex>
              <Nav2 />
            </Flex.Between>
          </Section2.InnerMargin>
        </Header>
      </Section2.WideContent>
    </Section2>
  );
}
