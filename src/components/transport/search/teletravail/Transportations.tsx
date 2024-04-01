import { useTranslations } from 'next-intl'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import { DeplacementEquivalent } from 'types/equivalent'
import formatName from 'utils/formatName'
import useParamContext from 'components/providers/ParamProvider'
import { computedEquivalents } from 'components/providers/equivalents'
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
  const transportations = useMemo(
    () =>
      computedEquivalents
        .filter((equivalent) => equivalent.category === 4)
        .filter((equivalent) => equivalent.default)
        .filter(
          (equivalent) => equivalent.slug !== 'velo' && !equivalent.slug.startsWith('avion')
        ) as DeplacementEquivalent[],
    []
  )
  const {
    teletravail: { start, end, transport },
  } = useParamContext()
  const t = useTranslations('transport.teletravail')
  const tEquivalent = useTranslations('equivalent')
  const transportation = transportations.find((transportation) => transportation.slug === transport)
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
      <Result>{transportation ? formatName(tEquivalent(`name-${transportation.slug}`), 1, true) : t('choose')}</Result>
    </Wrapper>
  ) : null
}
