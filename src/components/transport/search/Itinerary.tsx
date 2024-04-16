import { useTranslations } from 'next-intl'
import React from 'react'
import styled from 'styled-components'
import useParamContext from 'components/providers/ParamProvider'
import Address from './itinerary/Address'

const Wrapper = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`

export default function ItinerarySearch() {
  const {
    itineraire: { start, setStart, end, setEnd },
  } = useParamContext()
  const t = useTranslations('transport.itineraire')
  return (
    <Wrapper>
      <Address placeholder={t('start')} address={start?.address} setPlace={setStart} />
      <Address placeholder={t('end')} address={end?.address} setPlace={setEnd} />
    </Wrapper>
  )
}
