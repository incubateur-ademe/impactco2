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
            <Level1>
              <Link href="/" title="Page d'accueil" className="level1">
                Page d'accueil
              </Link>
            </Level1>
            <Level1>
              <Link href="/" title="Calculateur carbone" className="level1">
                Calculateur carbone
              </Link>
            </Level1>
            <Level1>
              <Link href="/" title="Diffuser les ressources" className="level1">
                Diffuser les ressources
              </Link>
            </Level1>
            <Level1>
              <Link href="/" title="Intégrer les ressources" className="level1">
                Intégrer les ressources
              </Link>
            </Level1>
            <Level1>
              <Link href="/" title="Qui sommes-nous ?" className="level1">
                Qui sommes-nous ?
              </Link>
            </Level1>
            <Level1>
              <Link href="/" title="Statistiques" className="level1">
                Statistiques
              </Link>
            </Level1>
            <Level1>
              <Link href="/" title="Nouveautés" className="level1">
                Nouveautés
              </Link>
            </Level1>
            <Level1>
              <Link href="/" title="Accessibilité (non conforme)" className="level1">
                Accessibilité (non conforme)
              </Link>
            </Level1>
            <Level1>
              <Link href="/" title="Diffuser" className="level1">
                Diffuser
              </Link>
            </Level1>
            <Level1>
              <Link href="/" title="Mentions légales" className="level1">
                Mentions légales
              </Link>
            </Level1>
            <Level1>
              <Link href="/" title="Gestion des cookies" className="level1">
                Gestion des cookies
              </Link>
            </Level1>
          </FormatText>
        </Section2.InnerMargin>
      </Section2>
    </WebBlue>
  );
}

const FormatText = styled.div`
  h1 {
    font-size: 2.25rem;
    font-weight: 800;
    line-height: 44px;
    letter-spacing: -0.01em;
  }
  > h2 {
    margin-top: 3rem;
  }
`;

const Level1 = styled.div`
  margin-top: 1.75rem;
  a {
    color: ${(props) => props.theme.colors.text};
    font-size: 1.125rem;
    font-weight: 500;
    letter-spacing: 0em;
    line-height: 2rem;
    text-decoration-color: ${(props) => props.theme.colors.main4};
    text-underline-offset: 8px;
  }
`;
