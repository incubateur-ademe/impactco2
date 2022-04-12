import React, { useContext } from 'react'
import styled from 'styled-components'

import DataContext from 'utils/DataContext'
import Visualization from './visualizations/Visualization'

const Wrapper = styled.div`
  margin-top: 0.5rem;
`
const Title = styled.div`
  margin-bottom: 1rem;
  text-align: center;
`
export default function Visualizations(props) {
  const { visualizedEquivalent } = useContext(DataContext)

  return props.equivalent && visualizedEquivalent ? (
    <Wrapper>
      <Title>émet autant de CO2e que</Title>
      <Visualization equivalent={visualizedEquivalent} weight={props.weight} />
    </Wrapper>
  ) : null
}
