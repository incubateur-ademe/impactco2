import styled from 'styled-components'
import { track } from 'utils/matomo'
import Select from 'components/base/Select'
import { produits } from './data.js'

const StyledSelect = styled(Select)`
  margin: 1rem;
  > select {
    border: none;
  }
`

export default function SelectProduits(props) {
  return (
    <>
      <StyledSelect
        onChange={(e) => {
          track('Livraison', 'Produit', e.value)
          props.changeProduit(produits.find((produit) => produit.uid === e.value))
        }}
        value={props.value}
        label='Vous commandez'
        name='produits'
        data-testid='produits'>
        {produits.map((produit) => (
          <option key={produit.uid} value={produit.uid}>
            {produit.displayed}
          </option>
        ))}
      </StyledSelect>
    </>
  )
}
