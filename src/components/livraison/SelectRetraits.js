import styled from 'styled-components'

import Select from 'components/base/Select'

const StyledSelect = styled(Select)`
  margin: 1rem;
  > select {
    border: none;
  }
`

const retraits = [
  { displayed: '<choisir>', uid: 'vide', publicode: '' },
  { displayed: 'livraison à domicile', uid: 'domicile', publicode: 'domicile' },
  { displayed: 'point relais', uid: 'relais', publicode: 'point de retrait' },
  {
    displayed: 'click & collect',
    uid: 'click',
    publicode: 'click and collect',
  },
  {
    displayed: 'achat direct en magasin',
    uid: 'magasin',
    publicode: 'magasin traditionnel',
  },
]

export default function SelectRetraits(props) {
  return (
    <>
      <StyledSelect
        onChange={(e) => {
          props.changeRetrait(
            retraits.find((retrait) => retrait.uid === e.value)
          )
        }}
        value={props.uid}
        label='Que vous faites livrer en'
        name='retraits'
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
