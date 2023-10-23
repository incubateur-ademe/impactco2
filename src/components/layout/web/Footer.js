import About from "./footer/About";
import Contact from "./footer/Contact";
import Ademe from "components/base/Ademe";
import Logo from "components/base/Logo";
import Marianne from "components/base/Marianne";
import Link from "next/link";
import { useRouter } from "next/router";
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
const FooterLink = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  font-size: 0.75rem;
  font-weight: 300;
  padding-bottom: ${(props) => props.pb || "1rem"};
  text-align: center;
`;

const Wrapper = styled.div`
  margin-top: ${(props) => props.mt || "0"};
`;

export default function Footer(props) {
  const router = useRouter();
  const pathesWithSimpleFooter = ["/mentions-legales", "/politique-de-confidentialite"];
  const isSimpleFooter = pathesWithSimpleFooter.includes(router.pathname) || props.simple;
  return (
    <Wrapper mt={props.mt}>
      {isSimpleFooter ? (
        <></>
      ) : (
        <>
          <Contact />
          <About />
        </>
      )}
      <Logos>
        <Marianne />
        <Ademe />
        <Logo />
      </Logos>
      <FooterLink pb={"0"}>
        <Link href="/plan-du-site">Plan du site</Link>
      </FooterLink>
      <FooterLink pb={"0"}>
        <Link href="/accessibilite">Accessibilité : non-conforme</Link>
      </FooterLink>
      <FooterLink pb={"0"}>
        <Link href="/mentions-legales">Mentions légales</Link>
      </FooterLink>
      <FooterLink>
        <Link href="/politique-de-confidentialite">Politique de confidentialité</Link>
      </FooterLink>
      <FooterLink>Version : {process.env.thebuildid}</FooterLink>
    </Wrapper>
  );
}
