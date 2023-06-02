import styled from 'styled-components'

import Select from 'components/base/Select'

const StyledSelect = styled(Select)`
  margin: 1rem;
  > select {
    border: none;
  }
`

const frequences = [
  { displayed: '<choisir>', uid: 'vide' },
  { displayed: 'jour', uid: 'jour' },
  { displayed: 'semaine', uid: 'semaine' },
  { displayed: 'mois', uid: 'mois' },
  { displayed: 'annee', uid: 'annee' },
]

export default function SelectFrequences(props) {
  return (
    <>
      <StyledSelect
        onChange={(e) => {
          props.changeFrequence(
            frequences.find((frequence) => frequence.uid === e.value)
          )
        }}
        value={props.uid}
        label='A la fréquence de'
        name='type'
      >
        {frequences.map((frequence) => (
          <option key={frequence.uid} value={frequence.uid}>
            {frequence.displayed}
          </option>
        ))}
      </StyledSelect>
    </>
  )
}
