import styled from 'styled-components'

import Select from 'components/base/Select'

const StyledSelect = styled(Select)`
  > select {
    border: none;
  }
`

const commandes = [
  { displayed: '<choisir>', uid: 'vide' },
  { displayed: 'produits de grande consommation', uid: 'consommation' },
  { displayed: 'habillement', uid: 'habillement' },
  { displayed: 'produits culturels physiques', uid: 'culturel' },
  { displayed: "biens d'équipements volumineux", uid: 'volumineux' },
]

export default function SelectCommandes(props) {
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
        {commandes.map((commande) => (
          <option key={commande.uid} value={commande.uid}>
            {commande.displayed}
          </option>
        ))}
      </StyledSelect>
    </>
  )
}
