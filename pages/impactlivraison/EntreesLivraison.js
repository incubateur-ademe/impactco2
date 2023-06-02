import styled from 'styled-components'

import SelectCommandes from './SelectCommandes'

const H2Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  margin-top: 0;
`

export default function EntreesLivraison() {
  return (
    <>
      <H2Title>Estimez l'impact de vos livraisons</H2Title>
      <SelectCommandes />
    </>
  )
}
