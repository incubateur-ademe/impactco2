import React, { useContext, useMemo } from 'react'
import styled from 'styled-components'

import DataContext from 'components/providers/DataProvider'

import Tile2 from 'components/misc/tiles/Tile2'

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
  const { equivalents } = useContext(DataContext)
  const equivalentsToShow = useMemo(
    () =>
      equivalents.filter((equivalent) =>
        ['voiturethermique', 'repasavecduboeuf', 'streamingvideo'].includes(
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
      {equivalentsToShow.map((equivalent) => (
        <Tile2
          key={equivalent.slug}
          equivalent={equivalent}
          weight={(props.co2eq / 1000) * props.freqMultBy}
          equivalentPage
          reference
          noAnimation
        />
      ))}
    </Wrapper>
  )
}
