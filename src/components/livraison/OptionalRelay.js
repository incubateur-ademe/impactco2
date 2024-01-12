import styled from 'styled-components'
import { MEDIA } from 'utils/styles'
import SelectRelays from './SelectRelays'

export default function OptionalRelay(props) {
  return (
    <Wrapper>
      <FlexContainer>
        <div className='emptySpace' />
        <div className='item2'>
          <Text htmlFor='relays'>Vous effectuez généralement le trajet jusqu'au {props.point}</Text>
        </div>
        <div className='item3'>
          <SelectRelays changeRelay={props.changeRelay} value={props.value} />
        </div>
        <div className='item4' />
      </FlexContainer>
    </Wrapper>
  )
}

const FlexContainer = styled.div`
  display: flex;
  ${MEDIA.LT.MEDIUM} {
    flex-direction: column;
  }
  > .emptySpace {
    min-width: 6rem;
    ${MEDIA.LT.LARGE} {
      min-width: 0;
    }
  }
  > .item2 {
    align-items: center;
    display: flex;
    ${MEDIA.LT.XLARGE} {
      flex-basis: 40%;
    }
  }
  > .item3 {
    align-items: center;
    display: flex;
    min-width: 6rem;
  }
`

const Wrapper = styled.div`
  background-color: var(--neutral-10);
  padding: 0 0 0.5rem 2rem;
  ${MEDIA.LT.SMALL} {
    padding: 0 0 0.5rem 1rem;
  }
`

const Text = styled.label`
  font-size: 16px;
  ${MEDIA.LT.SMALL} {
    font-size: 14px;
  }
  font-weight: 400;
  letter-spacing: 0em;
  line-height: 24px;
  margin-right: 0.25rem;
`
