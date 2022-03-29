import React, { useContext } from 'react'
import styled from 'styled-components'

import { formatName } from 'utils/formatters'
import DataContext from 'utils/DataContext'
import Visualization from './visualizations/Visualization'

const Wrapper = styled.div``
const Title = styled.h3`
  text-align: center;
  color: ${(props) => props.theme.colors.text};
`
export default function Visualizations(props) {
  const { equivalents } = useContext(DataContext)

  return (
    <Wrapper>
      {props.equivalent && (
        <Title>
          1 {formatName(props.equivalent.name.fr, 1).toLowerCase()}
          <br />
          émet autant de CO2e que...
        </Title>
      )}
      {equivalents
        .filter((equivalent) => equivalent.visualization)
        .sort((a, b) => (a.total > b.total ? -1 : 1))
        .map((equivalent) => (
          <Visualization equivalent={equivalent} weight={props.weight} />
        ))}
    </Wrapper>
  )
}
