import Iframe from "components/layout/Iframe";
import CalculateurLivraison from "components/livraison/CalculateurLivraison";
import IntroLivraison from "components/livraison/IntroLivraison";
import { RulesProviderLivraison } from "components/livraison/RulesProviderLivraison";
import React from "react";

export default function Default() {
  return (
    <Iframe>
      <RulesProviderLivraison>
        <main id="contenu">
          <IntroLivraison />
          <CalculateurLivraison />
        </main>
      </RulesProviderLivraison>
    </Iframe>
  );
}
