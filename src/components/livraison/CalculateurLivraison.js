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
    console.log('changeProduit', produit)
    engine.setSituation({
      'livraison colis . informations . catégorie': `'${produit.publicode}'`,
    })
    setCO2eq(engine.evaluate('livraison colis').nodeValue)
  }

  const changeRetrait = (retrait) => {
    console.log('changeRetrait', retrait)
    engine.setSituation({
      'livraison colis . scénario': `'${retrait.publicode}'`,
    })
    setCO2eq(engine.evaluate('livraison colis').nodeValue)
  }

  return (
    <>
      <H2Title>Estimez l'impact de vos livraisons</H2Title>
      <Flex>
        <SelectProduits changeProduit={changeProduit} />
        <SelectRetraits changeRetrait={changeRetrait} />
        <SelectFrequences />
      </Flex>
      <Resultat co2eq={cO2eq} />
    </>
  )
}
