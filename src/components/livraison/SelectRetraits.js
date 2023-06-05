import React, { useState } from 'react'
import styled from 'styled-components'

import Select from 'components/base/Select'

const StyledSelect = styled(Select)`
  margin: 1rem;
  > select {
    border: none;
  }
`

const retraits = [
  { displayed: 'Livraison à domicile', uid: 'domicile', publicode: 'domicile' },
  { displayed: 'Point relais', uid: 'relais', publicode: 'point de retrait' },
  {
    displayed: 'Click & collect',
    uid: 'click',
    publicode: 'click and collect',
  },
  {
    displayed: 'Achat direct en magasin',
    uid: 'magasin',
    publicode: 'magasin traditionnel',
  },
]

export default function SelectRetraits(props) {
  const [value, setValue] = useState('domicile')

  return (
    <>
      <StyledSelect
        onChange={(e) => {
          setValue(e.value)
          props.changeRetrait(
            retraits.find((retrait) => retrait.uid === e.value)
          )
        }}
        value={value}
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
