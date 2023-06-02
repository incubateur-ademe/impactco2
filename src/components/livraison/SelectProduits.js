import styled from 'styled-components'

import Select from 'components/base/Select'

const StyledSelect = styled(Select)`
  margin: 1rem;
  > select {
    border: none;
  }
`

const produits = [
  { displayed: '<choisir>', uid: 'vide', publicode: '' },
  {
    displayed: 'produits de grande consommation',
    uid: 'consommation',
    publicode: 'grande consommation',
  },
  { displayed: 'habillement', uid: 'habillement', publicode: 'habillement' },
  {
    displayed: 'produits culturels physiques',
    uid: 'culturel',
    publicode: 'culturel',
  },
  {
    displayed: "biens d'équipements volumineux",
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
        value={props.uid}
        label='Vous commandez en majorité'
        name='type'
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
