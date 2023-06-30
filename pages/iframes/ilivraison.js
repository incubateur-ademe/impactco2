import Iframe from "components/layout/Iframe";
import CalculateurLivraison from "components/livraison/CalculateurLivraison";
import IntroLivraison from "components/livraison/IntroLivraison";
import { RulesProviderLivraison } from "components/livraison/RulesProviderLivraison";
import React from "react";

export default function Livraison() {
  return (
    <Iframe url="livraison">
      <RulesProviderLivraison>
        <IntroLivraison />
        <CalculateurLivraison />
      </RulesProviderLivraison>
    </Iframe>
  );
}
