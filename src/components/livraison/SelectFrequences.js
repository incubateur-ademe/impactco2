import React, { useMemo, useState } from 'react'
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
  { displayed: ' ', uid: 'vide' },
  { displayed: 'Jour', uid: 'jour' },
  { displayed: 'Semaine', uid: 'semaine' },
  { displayed: 'Mois', uid: 'mois' },
  { displayed: 'Année', uid: 'annee' },
]

export default function SelectFrequences(props) {
  let currentVal = ''

  const [count, setCount] = useState(0)
  const [val, setVal] = useState('mois')

  // First render only
  useMemo(() => setVal('mois'), [])

  const valChanged = (e) => {
    console.log('count', count)
    console.log('val', val)
    setCount(count + 1)
    currentVal = e.value
    console.log('e.value', e.value)
    setVal(e.value)
    props.changeFrequence(
      frequences.find((frequence) => frequence.uid === e.value)
    )
  }

  console.log('')
  console.log('llllloooooggggssss')
  console.log(currentVal)
  return (
    <>
      <StyledSelect
        onChange={(e) => {
          valChanged(e)
        }}
        value={val}
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
