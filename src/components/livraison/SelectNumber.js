import styled from 'styled-components'
import Select from 'components/base/Select'

const StyledSelect = styled(Select)`
  margin: 0;
  > select {
    border: none;
    padding: 0 2rem 0 0.5rem;
  }
  > option {
    width: 300px;
  }
`

// Will create an array from 1 to 30 : [1, 2, 3, ..., 29, 30]
const numbers = Array.from({ length: 30 }, (_, i) => i + 1)

export default function SelectNumber(props) {
  return (
    <>
      <StyledSelect
        onChange={(e) => {
          props.changeNumber && props.changeNumber(e.value)
        }}
        value={props.value}
        name='numbers'
        data-testid='numbers'>
        {numbers.map((number) => (
          <option key={number} value={number}>
            {number}
          </option>
        ))}
      </StyledSelect>
    </>
  )
}
