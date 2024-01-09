import React from 'react'
import Iframe from 'components/layout/Iframe'
import CalculateurLivraison from 'components/livraison/CalculateurLivraison'
import IntroLivraison from 'components/livraison/IntroLivraison'
import { RulesProviderLivraison } from 'components/livraison/RulesProviderLivraison'

export default function Default() {
  return (
    <Iframe>
      <RulesProviderLivraison>
        <IntroLivraison />
        <CalculateurLivraison />
      </RulesProviderLivraison>
    </Iframe>
  )
}
