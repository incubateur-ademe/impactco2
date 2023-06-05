import styled from 'styled-components'

import Select from 'components/base/Select'

const StyledSelect = styled(Select)`
  margin: 1rem;
  > select {
    border: none;
  }
  > option {
    width: 300px;
  }
`

const frequences = [
  { displayed: 'Jour', uid: 'jour' },
  { displayed: 'Semaine', uid: 'semaine' },
  { displayed: 'Mois', uid: 'mois' },
  { displayed: 'Année', uid: 'annee' },
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
        value={props.value}
        label='A la fréquence de'
        name='frequences'
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
