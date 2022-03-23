import React, { useContext } from 'react'
import styled from 'styled-components'

import DataContext from 'utils/DataContext'
import Tile from './tiles/Tile'

const Wrapper = styled.div`
  margin-top: 1.5rem;
`
const Title = styled.h3`
  margin: 0;
  text-align: center;
  color: ${(props) => props.theme.colors.text};
`
const TilesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -1rem;
`
export default function Tiles(props) {
  const { equivalents } = useContext(DataContext)
  return props.weight && equivalents ? (
    <Wrapper>
      {props.equivalent && (
        <Title>
          1 {props.equivalent.name.fr.replaceAll('[s]', '').toLowerCase()}
          <br />
          émet autant de CO2e que...
        </Title>
      )}
      <TilesWrapper>
        {equivalents
          .filter((equivalent) => equivalent.tile)
          .filter(
            (equivalent) =>
              !props.equivalent || equivalent.id !== props.equivalent.id
          )
          .map((equivalent) => (
            <Tile equivalent={equivalent} weight={props.weight} />
          ))}
      </TilesWrapper>
    </Wrapper>
  ) : null
}
