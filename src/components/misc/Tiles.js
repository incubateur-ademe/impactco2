import React, { useContext } from 'react'
import styled from 'styled-components'

import { formatName } from 'utils/formatters'
import DataContext from 'utils/DataContext'
import Tile from './tiles/Tile'

const Wrapper = styled.div`
  margin-top: 1.5rem;
`
const Title = styled.h3`
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
      {props.title && (
        <Title>
          {props.equivalent && (
            <>
              1 {formatName(props.equivalent.name.fr, 1)}
              <br />
            </>
          )}
          c’est autant d’émissions que pour
          <br />
          fabriquer, consommer ou parcourir :
        </Title>
      )}
      <TilesWrapper>
        {equivalents
          .filter((equivalent) => !equivalent.visualization)
          .filter(
            (equivalent) =>
              !props.equivalent || equivalent.id !== props.equivalent.id
          )
          .map((equivalent) => (
            <Tile
              equivalent={equivalent}
              weight={props.weight}
              key={equivalent.id}
            />
          ))}
      </TilesWrapper>
    </Wrapper>
  ) : null
}
