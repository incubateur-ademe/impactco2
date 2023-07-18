import CalculateurLivraison from "components/livraison/CalculateurLivraison";
import ConclusionLivraison from "components/livraison/ConclusionLivraison";
import IntroLivraison from "components/livraison/IntroLivraison";
import { RulesProviderLivraison } from "components/livraison/RulesProviderLivraison";
import categories from "data/categories.json";

export default function Impactlivraison() {
  return (
    <RulesProviderLivraison>
      <main>
        <IntroLivraison />
        <CalculateurLivraison />
        <ConclusionLivraison />
      </main>
    </RulesProviderLivraison>
  );
}
export async function getStaticProps() {
  return {
    props: {
      category: categories.find((item) => item.slug === "livraison"),
    },
  };
}
