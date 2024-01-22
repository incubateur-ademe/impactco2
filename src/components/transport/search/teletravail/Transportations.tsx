import React, { useMemo } from 'react'
import styled from 'styled-components'
import { DeplacementEquivalent } from 'types/equivalent'
import useDataContext from 'components/providers/DataProvider'
import useParamContext from 'components/providers/ParamProvider'
import Transportation from './transportations/Transportation'

const Wrapper = styled.div`
  margin: 2rem auto;
`
const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 -0.375rem 0.125rem;
`
const Result = styled.div`
  font-weight: 300;
  text-align: center;
`
export default function Transportations() {
  const { equivalents } = useDataContext()
  const transportations = useMemo(
    () =>
      equivalents
        .filter((equivalent) => equivalent.category === 4)
        .filter((equivalent) => equivalent.default)
        .filter(
          (equivalent) => equivalent.slug !== 'velo' && !equivalent.slug.startsWith('avion')
        ) as DeplacementEquivalent[],
    [equivalents]
  )
  const {
    teletravail: { start, end, transport },
  } = useParamContext()

  return start && start.address && end && end.address ? (
    <Wrapper>
      <List>
        {transportations
          .filter((transportation) => transportation.default)
          .sort((a, b) => ((a.id as number) > (b.id as number) ? 1 : -1))
          .map((transportation) => (
            <Transportation key={transportation.id} transportation={transportation} />
          ))}
      </List>
      <Result>
        {transportations.find((transportation) => transportation.slug === transport)?.name ||
          'Choisissez votre mode de transport'}
      </Result>
    </Wrapper>
  ) : null
}
