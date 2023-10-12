import Section2 from "components/base/Section2";
import WebBlue from "components/layout/WebBlue";
import DataContext from "components/providers/DataProvider";
import categories from "data/categories.json";
import Link from "next/link";
import React, { useContext } from "react";
import styled from "styled-components";

export default function PlanDuSite() {
  const { equivalents } = useContext(DataContext);
  console.log("equivalents", equivalents);
  console.log("categories", categories);

  const buildLevel3For = (subcategories) => {
    return subcategories.map((subcategory) => (
      <Level3 key={subcategory.id}>
        <Link href={`/${subcategory.slug}`} title={subcategory.name}>
          {subcategory.name}
        </Link>
      </Level3>
    ));
  };

  const buildLevel2For = (catSlug) => {
    const category = categories.find((cat) => cat.slug === catSlug);
    console.log("category", category);
    const subcategories = equivalents.filter((eq) => eq.category === category.id);
    console.log("subcategories", subcategories);
    return (
      <Level2>
        <div>
          <Link href={`/${category.slug}`} title={category.name}>
            {category.name}
          </Link>
        </div>
        <div>{buildLevel3For(subcategories)}</div>
      </Level2>
    );
  };

  return (
    <WebBlue title={"Plan du site"}>
      <Section2>
        <Section2.InnerMargin>
          <FormatText>
            <h1>Plan du site</h1>
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
              {buildLevel2For("numerique")}
            </Level1>
            <Level1>
              <Link href="/" title="Calculateur carbone">
                Calculateur carbone
              </Link>
            </Level1>
            <Level1>
              <Link href="/" title="Diffuser les ressources">
                Diffuser les ressources
              </Link>
            </Level1>
            <Level1>
              <Link href="/" title="Intégrer les ressources">
                Intégrer les ressources
              </Link>
            </Level1>
            <Level1>
              <Link href="/" title="Qui sommes-nous ?">
                Qui sommes-nous ?
              </Link>
            </Level1>
            <Level1>
              <Link href="/" title="Statistiques">
                Statistiques
              </Link>
            </Level1>
            <Level1>
              <Link href="/" title="Nouveautés">
                Nouveautés
              </Link>
            </Level1>
            <Level1>
              <Link href="/" title="Accessibilité (non conforme)">
                Accessibilité (non conforme)
              </Link>
            </Level1>
            <Level1>
              <Link href="/" title="Diffuser">
                Diffuser
              </Link>
            </Level1>
            <Level1>
              <Link href="/" title="Mentions légales">
                Mentions légales
              </Link>
            </Level1>
            <Level1>
              <Link href="/" title="Gestion des cookies">
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
    margin-bottom: 2rem;
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

const Level2 = styled.div`
  margin-top: 2rem;
`;

const Level3 = styled.div`
  margin-top: 1rem;
`;
