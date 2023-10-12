import Ademe from "components/base/Ademe";
import Logo from "components/base/Logo";
import Marianne from "components/base/Marianne";
import Section3 from "components/base/Section3";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

export default function FooterBlue(props) {
  return (
    <Wrapper mt={props.mt}>
      <Section3>
        <Section3.WideContent>
          <Section3.InnerMargin>
            <Grid>
              <GridItem>
                <Logos>
                  <Marianne />
                  <Ademe />
                  <Logo />
                </Logos>
              </GridItem>
              <GridItem>
                <FooterExplain>
                  <strong>Impact CO2</strong>
                  <p>Le site de ressources qui vulgarise et valorise les données environnementales de l'ADEME</p>
                </FooterExplain>
              </GridItem>
              <GridItem>
                <FooterLinks>
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
                </FooterLinks>
              </GridItem>
              <GridItem>
                <FooterLink>Version : {process.env.thebuildid}</FooterLink>
              </GridItem>
            </Grid>
          </Section3.InnerMargin>
        </Section3.WideContent>
      </Section3>
    </Wrapper>
  );
}

const Logos = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const GridItem = styled.div``;

const FooterExplain = styled.div``;

const FooterLinks = styled.div`
  display: flex;
`;
