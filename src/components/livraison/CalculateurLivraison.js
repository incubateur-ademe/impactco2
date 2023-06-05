import React, { useContext, useState } from 'react'
import styled from 'styled-components'

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
const DropList = styled.div`
  border: 1px solid #e2dce0;
  border-radius: 16px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  > div > label {
    color: #746770;
    font-size: 14px;
    margin-bottom: 0;
  }
  > div > select {
    width: 320px;
    color: #1c9b93;
    padding-left: 0;
    ${(props) => props.theme.mq.xsmall} {
      width: auto;
      font-size: 12px;
    }
  }
  ${(props) => props.theme.mq.xlarge} {
    grid-template-columns: repeat(1, 1fr);
  }
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
      <DropList>
        <SelectProduits changeProduit={changeProduit} />
        <SelectRetraits changeRetrait={changeRetrait} />
        <SelectFrequences changeFrequence={changeFrequence} />
      </DropList>
      <Resultat co2eq={cO2eq} />
    </>
  )
}
