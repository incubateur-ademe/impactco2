import styled from 'styled-components'
import SelectRelays from './SelectRelays'

export default function OptionalRelay(props) {
  return (
    <Wrapper>
      <FlexContainer>
        <div className='emptySpace' />
        <div className='item2'>
          <Text>Vous effectuez généralement le trajet jusqu'au {props.point}</Text>
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
  ${(props) => props.theme.mq.medium} {
    flex-direction: column;
  }
  > .emptySpace {
    min-width: 6rem;
    ${(props) => props.theme.mq.large} {
      min-width: 0;
    }
  }
  > .item2 {
    align-items: center;
    display: flex;
    ${(props) => props.theme.mq.xlarge} {
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
  background-color: ${(props) => props.theme.colors.textLight2};
  padding: 0 0 0.5rem 2rem;
  ${(props) => props.theme.mq.small} {
    padding: 0 0 0.5rem 1rem;
  }
`

const Text = styled.div`
  font-size: 16px;
  ${(props) => props.theme.mq.small} {
    font-size: 14px;
  }
  font-weight: 400;
  letter-spacing: 0em;
  line-height: 24px;
  margin-right: 0.25rem;
`
