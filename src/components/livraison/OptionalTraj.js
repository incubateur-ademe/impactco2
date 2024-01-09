import styled from 'styled-components'
import { MEDIA } from 'utils/styles'

export default function OptionalTraj(props) {
  return (
    <Wrapper>
      <div className='item1' />
      <div className='item2'>
        <FlexCenter>
          <Text htmlFor='km-input'>Pour cela, vous parcourez une distance de&nbsp;</Text>
          <Flex>
            <Input
              id='km-input'
              type='number'
              data-testid='kms'
              value={props.km}
              onChange={(e) => props.changeKm(e.target.value)}
              min='0'
              step='1'
            />
            <Text>&nbsp;km</Text>
          </Flex>
        </FlexCenter>
      </div>
      <div className='item3' />
      <div className='item4'>
        <SmallExplanation>
          Exemple: si vous faites un détour de 2km sur votre trajet domicile-travail, indiquez ces 2km.
        </SmallExplanation>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.label`
  background-color: var(--neutral-10);
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  display: grid;
  grid-template-columns: 6rem auto;
  ${MEDIA.LT.LARGE} {
    grid-template-columns: 0 auto;
  }
  padding: 0 0 1.5rem 2rem;
  ${MEDIA.LT.SMALL} {
    padding: 0 0 1.5rem 1rem;
  }
`

const Text = styled.div`
  font-size: 16px;
  ${MEDIA.LT.LARGE} {
    font-size: 14px;
  }
  font-weight: 400;
  letter-spacing: 0em;
  line-height: 24px;
`

const Input = styled.input`
  background-color: inherit;
  border-color: lightgray;
  border-radius: 5px;
  border-style: solid;
  border-width: 1px;
  color: var(--primary-60);
  text-align: right;
  width: 2rem;
`

const FlexCenter = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  ${MEDIA.LT.SMALL} {
    align-items: flex-start;
    flex-direction: column;
  }
`

const Flex = styled.div`
  display: flex;
`

const SmallExplanation = styled.div`
  color: var(--neutral-50);
  font-size: 14px;
  padding-right: 0.5rem;
`
