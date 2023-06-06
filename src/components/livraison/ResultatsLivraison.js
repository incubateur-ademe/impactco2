import styled from 'styled-components'

import ResultatLivraison from './ResultatLivraison'

const Wrapper = styled.div``

export default function ResultatsLivraison(props) {
  console.log('sssssss---------', props.co2eq)
  return (
    <Wrapper>
      <ResultatLivraison co2eq={props.co2eq} />
    </Wrapper>
  )
}
