import styled from 'styled-components'

import Flex from 'components/base/Flex'

import SelectProduits from './SelectProduits'
import SelectRetraits from './SelectRetraits'

const H2Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  margin-top: 0;
`

export default function EntreesLivraison() {
  return (
    <>
      <H2Title>Estimez l'impact de vos livraisons</H2Title>
      <Flex.Between>
        <SelectProduits />
        <SelectRetraits />
      </Flex.Between>
    </>
  )
}
