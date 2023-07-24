import Section2 from "components/base/Section2";
import AdviceLivraison from "components/livraison/AdviceLivraison";
import CalculateurLivraison from "components/livraison/CalculateurLivraison";
import ConclusionLivraison from "components/livraison/ConclusionLivraison";
import IntroLivraison from "components/livraison/IntroLivraison";
import { RulesProviderLivraison } from "components/livraison/RulesProviderLivraison";
import categories from "data/categories.json";

export default function Impactlivraison() {
  return (
    <main>
      <IntroLivraison />
      <RulesProviderLivraison>
        <CalculateurLivraison />
      </RulesProviderLivraison>
      <Section2>
        <Section2.InnerMargin>
          <AdviceLivraison />
        </Section2.InnerMargin>
      </Section2>
      <ConclusionLivraison />
    </main>
  );
}
export async function getStaticProps() {
  return {
    props: {
      category: categories.find((item) => item.slug === "livraison"),
    },
  };
}
