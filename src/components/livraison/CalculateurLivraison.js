import React, { useContext, useState } from 'react'
import styled from 'styled-components'

import Flex from 'components/base/Flex'
import RulesContextLivraison from 'components/livraison/RulesProviderLivraison'

import Resultat from './Resultat'
import SelectFrequences from './SelectFrequences'
import SelectProduits from './SelectProduits'
import SelectRetraits from './SelectRetraits'

const H2Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  margin-top: 0;
`

export default function CalculateurLivraison() {
  const { engine } = useContext(RulesContextLivraison)

  const [cO2eq, setCO2eq] = useState(0)

  const changeProduit = (produit) => {
    engine.setSituation({
      'livraison colis . informations . catégorie': `'${produit.publicode}'`,
    })
    setCO2eq(engine.evaluate('livraison colis').nodeValue)
  }

  const changeRetrait = (retrait) => {
    engine.setSituation({
      'livraison colis . scénario': `'${retrait.publicode}'`,
    })
    setCO2eq(engine.evaluate('livraison colis').nodeValue)
  }

  const changeFrequence = (frequence) => {
    console.log('changeFrequence', frequence)
    const multiplicators = {
      jour: 365,
      semaine: 52,
      mois: 12,
      annee: 1,
      vide: 1,
    }
    setCO2eq(
      engine.evaluate('livraison colis').nodeValue *
        multiplicators[frequence.uid]
    )
  }

  return (
    <>
      <H2Title>Estimez l'impact de vos livraisons</H2Title>
      <Flex>
        <SelectProduits changeProduit={changeProduit} />
        <SelectRetraits changeRetrait={changeRetrait} />
        <SelectFrequences changeFrequence={changeFrequence} />
      </Flex>
      <Resultat co2eq={cO2eq} />
    </>
  )
}
