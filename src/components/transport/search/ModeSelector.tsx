import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'
import { TransportSimulateur } from 'types/transport'
import { MEDIA } from 'utils/styles'
import Link from 'components/base/buttons/Link'

const Wrapper = styled.div`
  display: flex;
`

const CurrentTab = styled.div<{ $large?: boolean }>`
  align-items: center;
  background-color: var(--secondary-10);
  border-radius: 1rem 1rem 0 0;
  color: var(--neutral-70);
  display: flex;
  flex: 1;
  height: 3rem;
  justify-content: center;
  margin-bottom: -1rem;
  padding: 0.25rem 0 1rem;
  text-align: center;
  text-decoration: none;

  &:hover {
    background-color: var(--secondary-10);
  }

  ${MEDIA.LT.SMALL} {
    display: ${(props) => (props.$large ? 'none' : 'flex')};
    font-size: 0.875rem;
    margin-bottom: -1.25rem;
    padding: 0.25rem 0 1.25rem;
  }
`

const Tab = styled(Link)<{ $large?: boolean }>`
  align-items: center;
  background-color: transparent;
  border-radius: 1rem 1rem 0 0;
  color: var(--primary-50);
  display: flex;
  flex: 1;
  height: 3rem;
  justify-content: center;
  margin-bottom: -1rem;
  padding: 0.25rem 0 1rem;
  text-align: center;
  text-decoration: none;

  &:hover {
    background-color: var(--secondary-10);
  }

  ${MEDIA.LT.SMALL} {
    display: ${(props) => (props.$large ? 'none' : 'flex')};
    font-size: 0.875rem;
    margin-bottom: -1.25rem;
    padding: 0.25rem 0 1.25rem;
  }
`

export default function ModeSelector({ type, iframe }: { type: TransportSimulateur; iframe?: boolean }) {
  const router = useRouter()

  const queries = Object.entries(router.query)
  const params = queries.length > 0 ? `?${queries.map(([key, value]) => `${key}=${value}`).join('&')}` : ''

  return (
    <Wrapper>
      {(type === 'distance' || !router.query.tabs || router.query.tabs.includes('distance')) &&
        (type === 'distance' ? (
          <CurrentTab data-testid='transport-tab-distance'>Distance</CurrentTab>
        ) : (
          <Tab
            internal
            data-testid='transport-tab-distance'
            href={`${iframe ? '/iframes' : ''}/transport${params}`}
            title='Distance'>
            Distance
          </Tab>
        ))}
      {(type === 'itineraire' || !router.query.tabs || router.query.tabs.includes('itineraire')) &&
        (type === 'itineraire' ? (
          <CurrentTab data-testid='transport-tab-itineraire'>Itinéraire</CurrentTab>
        ) : (
          <Tab
            internal
            data-testid='transport-tab-itineraire'
            href={`${iframe ? '/iframes' : ''}/transport/itineraire${params}`}
            title='Itinéraire'>
            Itinéraire
          </Tab>
        ))}
      {(type === 'teletravail' || !router.query.tabs || router.query.tabs.includes('teletravail')) &&
        (type === 'teletravail' ? (
          <CurrentTab $large data-testid='transport-tab-teletravail'>
            Télétravail
          </CurrentTab>
        ) : (
          <Tab
            internal
            data-testid='transport-tab-teletravail'
            href={`${iframe ? '/iframes' : ''}/transport/teletravail${params}`}
            title='Télétravail'
            $large>
            Télétravail
          </Tab>
        ))}
    </Wrapper>
  )
}
