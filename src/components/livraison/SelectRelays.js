import styled from 'styled-components'
import Select from 'components/base/Select'
import { relays } from './data.js'

const StyledSelect = styled(Select)`
  margin: 0;
  > select {
    border: none;
    color: ${(props) => props.theme.colors.main2};
    font-size: 16px;
    ${(props) => props.theme.mq.small} {
      font-size: 12px;
    }
    ${(props) => props.theme.mq.xsmall} {
      margin-left: 0;
      padding-left: 0.2rem;
    }
    font-weight: 500;
    letter-spacing: 0em;
    line-height: 24px;
    margin-left: 0.5rem;
    ${(props) => props.theme.mq.medium} {
      margin-left: 0;
      padding-left: 0;
    }
  }
`

export default function SelectRelays(props) {
  return (
    <>
      <StyledSelect
        onChange={(e) => {
          props.changeRelay && props.changeRelay(relays.find((relay) => relay.uid === e.value))
        }}
        value={props.value}
        label=''
        name='relays'>
        {relays.map((relay) => (
          <option key={relay.uid} value={relay.uid}>
            {relay.displayed}
          </option>
        ))}
      </StyledSelect>
    </>
  )
}
