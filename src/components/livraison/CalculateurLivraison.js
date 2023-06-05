import React, { useContext, useMemo, useState } from 'react'
import styled from 'styled-components'

import RulesContextLivraison from 'components/livraison/RulesProviderLivraison'

import Resultat from './Resultat'
import SelectFrequences from './SelectFrequences'
import SelectProduits from './SelectProduits'
import SelectRetraits from './SelectRetraits'
import { frequences, produits, retraits } from './data.js'

const H2Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0.5rem;
  margin-top: 0;
`

const Subtitle = styled.p`
  color: #564d53;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  margin-bottom: 2rem;
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

  const [values, setValues] = useState({
    produit: 'culturel',
    retrait: 'domicile',
    frequence: 'mois',
  })

  const calculateResult = (valuesArg) => {
    let freqMultBy = frequences.find(
      (freq) => freq.uid === valuesArg.frequence
    ).mult
    let produitPublicode = produits.find(
      (produit) => produit.uid === valuesArg.produit
    ).publicode
    let retraitPublicode = retraits.find(
      (retrait) => retrait.uid === valuesArg.retrait
    ).publicode

    let newSituation = {
      'livraison colis . informations . catégorie': `'${produitPublicode}'`,
      'livraison colis . scénario': `'${retraitPublicode}'`,
    }

    engine.setSituation(newSituation)
    setCO2eq(engine.evaluate('livraison colis').nodeValue * freqMultBy)
  }

  useMemo(() => {
    calculateResult(values)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values])

  const changeProduit = (produit) => {
    let localValues = clonedValues()
    localValues.produit = produit.uid
    setValues(localValues)
    console.log('localValues', localValues)
  }

  const changeRetrait = (retrait) => {
    let localValues = clonedValues()
    localValues.retrait = retrait.uid
    setValues(localValues)
  }

  const changeFrequence = (frequence) => {
    let localValues = clonedValues()
    localValues.frequence = frequence.uid
    setValues(localValues)
  }

  const clonedValues = () => {
    return JSON.parse(JSON.stringify(values))
  }

  return (
    <>
      <H2Title>Estimez l'impact de vos livraisons</H2Title>
      <Subtitle>
        En vous basant sur les commandes que vous effectuez le plus...
      </Subtitle>
      <DropList>
        <SelectProduits changeProduit={changeProduit} value={values.produit} />
        <SelectRetraits changeRetrait={changeRetrait} value={values.retrait} />
        <SelectFrequences
          changeFrequence={changeFrequence}
          value={values.frequence}
        />
      </DropList>
      <Resultat co2eq={cO2eq} />
    </>
  )
}
