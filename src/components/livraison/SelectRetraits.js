import styled from 'styled-components'

import Select from 'components/base/Select'

import { retraits } from './data.js'

const StyledSelect = styled(Select)`
  margin: 1rem;
  > select {
    border: none;
  }
`

export default function SelectRetraits(props) {
  return (
    <>
      <StyledSelect
        onChange={(e) => {
          props.changeRetrait(
            retraits.find((retrait) => retrait.uid === e.value)
          )
        }}
        value={props.value}
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
