import Ademe from "components/base/Ademe";
import Logo from "components/base/Logo";
import Marianne from "components/base/Marianne";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

const Logos = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: 0 0.75rem;
  text-decoration: none;

  ${(props) => props.theme.mq.small} {
    font-size: ${(props) => (props.iframe ? 0.75 : 1)}rem;
    padding: 0 0.25rem;
  }
`;
const Accessibility = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  font-size: 0.75rem;
  font-weight: 300;
  padding-bottom: ${(props) => (props.breath ? "1rem" : "0")};

  text-align: center;
`;

const Wrapper = styled.div`
  margin-top: 1rem;
`;

export default function Footer2() {
  return (
    <>
      <Wrapper>
        <footer aria-label="footer" id="footer">
          <Logos>
            <Marianne />
            <Ademe />
            <Logo />
          </Logos>
          <Accessibility>
            <Link href="/accessibilite">Accessibilité : non-conforme</Link>
          </Accessibility>
          <Accessibility>
            <Link href="/mentions-legales">Mentions légales</Link>
          </Accessibility>
          <Accessibility breath>Version : {process.env.thebuildid}</Accessibility>
        </footer>
      </Wrapper>
    </>
  );
}
