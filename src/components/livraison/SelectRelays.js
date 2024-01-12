import styled from 'styled-components'
import { MEDIA } from 'utils/styles'
import Select from 'components/base/Select'
import { relays } from './data.js'

const StyledSelect = styled(Select)`
  margin-bottom: 0 !important;
  > select {
    border: none;
    color: var(--primary-50);
    font-size: 16px;
    ${MEDIA.LT.SMALL} {
      font-size: 12px;
    }
    ${MEDIA.LT.XSMALL} {
      margin-left: 0;
      padding-left: 0.2rem;
    }
    font-weight: 500;
    letter-spacing: 0em;
    line-height: 24px;
    margin-left: 0.5rem;
    ${MEDIA.LT.MEDIUM} {
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
        name='relays'
        data-testid='relays'>
        {relays.map((relay) => (
          <option key={relay.uid} value={relay.uid}>
            {relay.displayed}
          </option>
        ))}
      </StyledSelect>
    </>
  )
}
