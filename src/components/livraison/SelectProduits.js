import styled from 'styled-components'

import Select from 'components/base/Select'

const StyledSelect = styled(Select)`
  margin: 1rem;
  > select {
    border: none;
  }
`

const produits = [
  { displayed: '<choisir>', uid: 'vide' },
  { displayed: 'produits de grande consommation', uid: 'consommation' },
  { displayed: 'habillement', uid: 'habillement' },
  { displayed: 'produits culturels physiques', uid: 'culturel' },
  { displayed: "biens d'équipements volumineux", uid: 'volumineux' },
]

export default function SelectProduits(props) {
  return (
    <>
      <StyledSelect
        onChange={(e) => {
          console.log(e)
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
