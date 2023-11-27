import styled from 'styled-components'
import Select from 'components/base/Select'
import { trajs } from './data.js'

const StyledSelect = styled(Select)`
  margin: 0;
  > select {
    border: none;
    color: ${(props) => props.theme.colors.main};
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0em;
    line-height: 24px;
  }
`

export default function SelectTrajs2(props) {
  return (
    <>
      <StyledSelect
        onChange={(evt) => {
          console.log('evt', evt)
          props.changeTraj && props.changeTraj(trajs.find((traj) => traj.uid === evt.value))
        }}
        value={props.value}
        name='trajs'>
        {trajs.map((traj) => (
          <option key={traj.uid} value={traj.uid}>
            {traj.displayed}
          </option>
        ))}
      </StyledSelect>
    </>
  )
}
