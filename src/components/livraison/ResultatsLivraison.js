import React, { useContext, useMemo } from 'react'
import styled from 'styled-components'

import DataContext from 'components/providers/DataProvider'

import Tile from 'components/misc/tiles/Tile'

import ResultatLivraison from './ResultatLivraison'

const Tiles = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2.5rem;

  ${(props) => props.theme.mq.medium} {
    gap: 0.75rem;
  }
`

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
  const { equivalents } = useContext(DataContext)
  const equivalentsToShow = useMemo(
    () =>
      equivalents.filter((equivalent) =>
        ['voiturethermique', 'repasavecduboeuf', 'tshirtencoton'].includes(
          equivalent.slug
        )
      ),
    [equivalents]
  )
  return (
    <Wrapper>
      <div className='item item1'>
        <ResultatLivraison co2eq={props.co2eq} />
      </div>
      <div className='item item2'>
        <Tiles>
          {equivalentsToShow.map((equivalent) => (
            <Tile
              key={equivalent.slug}
              equivalent={equivalent}
              weight={(2100 / 1000) * 52}
              equivalentPage
              reference
              noAnimation
            />
          ))}
        </Tiles>
      </div>
      <div className='item item3'></div>
      <div className='item4'></div>
    </Wrapper>
  )
}
