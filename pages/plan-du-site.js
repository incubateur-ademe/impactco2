import Section2 from "components/base/Section2";
import WebBlue from "components/layout/WebBlue";
import DataContext from "components/providers/DataProvider";
import categories from "data/categories.json";
import Link from "next/link";
import React, { useContext } from "react";
import styled from "styled-components";
import { formatName } from "utils/formatters";

export default function PlanDuSite() {
  const { equivalents } = useContext(DataContext);

  const buildLevel3For = (catSlug, subcategories) => {
    return subcategories.map((subcategory) => (
      <Level3 key={subcategory.id}>
        <Link href={`/${catSlug}/${subcategory.slug}`} title={subcategory.name}>
          {formatName(subcategory.name, 1, true)}{" "}
          {subcategory.subtitle && <Subtitle>({formatName(subcategory.subtitle, 1)})</Subtitle>}
        </Link>
      </Level3>
    ));
  };

  const buildLevel2For = (catSlug) => {
    const category = categories.find((cat) => cat.slug === catSlug);
    const subcategories = equivalents.filter((eq) => eq.category === category.id);
    return (
      <Level2>
        <Link href={`/${category.slug}`} title={category.name}>
          {category.name}
        </Link>
        {subcategories?.length > 0 ? (
          <>
            <div>{buildLevel3For(category.slug, subcategories)}</div>
          </>
        ) : (
          <></>
        )}
      </Level2>
    );
  };

  return (
    <WebBlue title={"Plan du site"}>
      <Section2>
        <Section2.InnerMargin>
          <FormatText>
            <H1Title>Plan du site</H1Title>
            <Level1>
              <Link href="/" title="Page d'accueil">
                Page d'accueil
              </Link>
            </Level1>
            <Level1>
              <Link href="/" title="Par thématique">
                Par thématique
              </Link>
              {buildLevel2For("usagenumerique")}
              {buildLevel2For("livraison")}
              {buildLevel2For("chauffage")}
              {buildLevel2For("transport")}
              {buildLevel2For("fruitsetlegumes")}
              {buildLevel2For("numerique")}
              {buildLevel2For("repas")}
              {buildLevel2For("habillement")}
              {buildLevel2For("mobilier")}
              {buildLevel2For("electromenager")}
              {buildLevel2For("boisson")}
            </Level1>
            <Level1>
              <Link href="/convertisseur" title="Comparateur carbone">
                Comparateur carbone
              </Link>
            </Level1>
            <Level1>
              <Link
                href="https://accelerateur-transition-ecologique-ademe.notion.site/Kit-de-diffusion-b9d08930a49a4346830b7a12fd7cb733?pvs=4"
                title="Diffuser les ressources"
                target="_blank"
                rel="noreferrer noopener"
              >
                Diffuser les ressources
              </Link>
            </Level1>
            <Level1>
              <Link href="/integration" title="Intégrer les ressources">
                Intégrer les ressources
              </Link>
            </Level1>
            <Level1>
              <Link href="/stats" title="Statistiques">
                Statistiques
              </Link>
            </Level1>
            <Level1>
              <Link href="/accessibilite" title="Accessibilité (non conforme)">
                Accessibilité (non conforme)
              </Link>
            </Level1>
            <Level1>
              <Link href="/mentions-legales" title="Mentions légales">
                Mentions légales
              </Link>
            </Level1>
            <Level1>
              <Link href="/politique-de-confidentialite" title="Politique de confidentialité">
                Politique de confidentialité
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
    margin-bottom: 2rem;
  }
  > h2 {
    margin-top: 3rem;
  }
`;

const Level1 = styled.div`
  margin-top: 1.75rem;
  > a {
    color: ${(props) => props.theme.colors.text};
    font-size: 1.125rem;
    font-weight: 700;
    letter-spacing: 0em;
    line-height: 2rem;
    text-decoration-color: ${(props) => props.theme.colors.main4};
    text-decoration-thickness: 1px;
    text-underline-offset: 0.75rem;
  }
`;

const Level2 = styled.div`
  margin-left: 1.5rem;
  margin-top: 1.25rem;
  > a {
    color: ${(props) => props.theme.colors.main4};
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0em;
    line-height: 2rem;
    text-decoration-thickness: 1px;
    text-underline-offset: 0.5rem;
  }
`;

const Level3 = styled.div`
  margin-left: 1.5rem;
  margin-top: 0.75rem;
  > a {
    color: ${(props) => props.theme.colors.linkGray};
    font-size: 1rem;
    font-weight: 400;
    letter-spacing: 0em;
    line-height: 2rem;
    text-decoration-color: ${(props) => props.theme.colors.firstBlue};
    text-decoration-thickness: 1px;
    text-underline-offset: 0.5rem;
  }
`;

const Subtitle = styled.span`
  font-weight: 300;
`;

const H1Title = styled.h1`
  margin-top: 3rem;
`;
