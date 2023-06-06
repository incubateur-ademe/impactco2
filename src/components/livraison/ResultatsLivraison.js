import styled from 'styled-components'

import ResultatLivraison from './ResultatLivraison'

const Wrapper = styled.div`
  background-color: whitesmoke;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  > div {
    background-color: grey;
    padding: 0.5rem;
  }
  ${(props) => props.theme.mq.xlarge} {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1fr);
  }
`

export default function ResultatsLivraison(props) {
  return (
    <Wrapper>
      <div className='item item1'>
        <ResultatLivraison co2eq={props.co2eq} />
      </div>
      <div className='item item2'></div>
      <div className='item item3'></div>
      <div className='item4'></div>
    </Wrapper>
  )
}
