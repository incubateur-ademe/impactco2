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
        <Section2.InnerMargin>
          <RulesProviderLivraison>
            <IntroLivraison />
            <CalculateurLivraison />
          </RulesProviderLivraison>
        </Section2.InnerMargin>
      </Section2>
    </Iframe>
  );
}
