import styled from 'styled-components'

import Select from 'components/base/Select'

const StyledSelect = styled(Select)`
  margin: 1rem;
  > select {
    border: none;
  }
`

const produits = [
  {
    displayed: 'Produits de grande consommation',
    uid: 'consommation',
    publicode: 'grande consommation',
  },
  { displayed: 'Habillement', uid: 'habillement', publicode: 'habillement' },
  {
    displayed: 'Produit culturel physique',
    uid: 'culturel',
    publicode: 'culturel',
  },
  {
    displayed: "Bien d'équipement volumineux",
    uid: 'volumineux',
    publicode: 'équipements volumineux',
  },
  { displayed: 'autre', uid: 'autre', publicode: 'autre' },
]

export default function SelectProduits(props) {
  return (
    <>
      <StyledSelect
        onChange={(e) => {
          props.changeProduit(
            produits.find((produit) => produit.uid === e.value)
          )
        }}
        value={props.value}
        label='Vous commandez en majorité'
        name='produits'
      >
        {produits.map((produit) => (
          <option key={produit.uid} value={produit.uid}>
            {produit.displayed}
          </option>
        ))}
      </StyledSelect>
    </>
  )
}
