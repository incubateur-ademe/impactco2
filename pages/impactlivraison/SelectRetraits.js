import styled from 'styled-components'

import Select from 'components/base/Select'

const StyledSelect = styled(Select)`
  margin: 1rem;
  > select {
    border: none;
  }
`

const retraits = [
  { displayed: '<choisir>', uid: 'vide' },
  { displayed: 'livraison à domicile', uid: 'domicile' },
  { displayed: 'point relais', uid: 'relais' },
  { displayed: 'click & collect', uid: 'click' },
  { displayed: 'drive', uid: 'drive' },
  { displayed: 'achat direct en magasin', uid: 'magasin' },
]

export default function SelectRetraits(props) {
  return (
    <>
      <StyledSelect
        onChange={(e) => {
          console.log(e)
        }}
        value={props.uid}
        label='Que vous faites livrer en'
        name='type'
      >
        {retraits.map((retrait) => (
          <option key={retrait.uid} value={retrait.uid}>
            {retrait.displayed}
          </option>
        ))}
      </StyledSelect>
    </>
  )
}
