import styled from 'styled-components'
import Select from 'components/base/Select'
import { retraits } from './data.js'

const StyledSelect = styled(Select)`
  border-left: 1px solid #e2dce0;
  margin: 1rem;
  padding-left: 2rem;
  ${(props) => props.theme.mq.xlarge} {
    border: none;
    padding: 0;
  }
  > select {
    border: none;
  }
`

export default function SelectRetraits(props) {
  return (
    <>
      <StyledSelect
        onChange={(e) => {
          props.changeRetrait(retraits.find((retrait) => retrait.uid === e.value))
        }}
        value={props.value}
        label='Que vous faites livrer en'
        name='retraits'
        data-testid='retraits'>
        {retraits.map((retrait) => (
          <option key={retrait.uid} value={retrait.uid}>
            {retrait.displayed}
          </option>
        ))}
      </StyledSelect>
    </>
  )
}
