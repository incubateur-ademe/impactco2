import styled from 'styled-components'

import Flex from 'components/base/Flex'

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
  return (
    <>
      <H2Title>Estimez l'impact de vos livraisons</H2Title>
      <Flex>
        <SelectProduits />
        <SelectRetraits />
        <SelectFrequences />
      </Flex>
      <Resultat />
    </>
  )
}
