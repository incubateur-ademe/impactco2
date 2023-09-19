import Section2 from "components/base/Section2";
import Iframe from "components/layout/Iframe";
import CalculateurLivraison from "components/livraison/CalculateurLivraison";
import IntroLivraison from "components/livraison/IntroLivraison";
import { RulesProviderLivraison } from "components/livraison/RulesProviderLivraison";
import React from "react";

export default function Default() {
  return (
    <Iframe>
      <Section2>
        <RulesProviderLivraison>
          <main id="contenu">
            <IntroLivraison />
            <CalculateurLivraison />
          </main>
        </RulesProviderLivraison>
      </Section2>
    </Iframe>
  );
}
