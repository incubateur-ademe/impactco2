import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'
import { MEDIA } from 'utils/styles'
import Link from 'components/base/buttons/Link'

const Wrapper = styled.div`
  display: flex;
`
const Tab = styled(Link)<{ $current: boolean; $large?: boolean }>`
  align-items: center;
  background-color: ${(props) => (props.$current ? 'var(--secondary-10)' : 'transparent')};
  border-radius: 1rem 1rem 0 0;
  color: ${(props) => (props.$current ? 'var(--neutral-70)' : 'var(--primary-50)')};
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

  ${({ $current }) => $current && 'cursor: default;'}
`

export default function ModeSelector({
  type,
  iframe,
}: {
  type: 'distance' | 'itineraire' | 'teletravail'
  iframe?: boolean
}) {
  const router = useRouter()

  const queries = Object.entries(router.query)
  const params = queries.length > 0 ? `?${queries.map(([key, value]) => `${key}=${value}`).join('&')}` : ''

  return (
    <Wrapper>
      {(type === 'distance' || !router.query.tabs || router.query.tabs.includes('distance')) && (
        <Tab
          internal
          data-testid='transport-tab-distance'
          $current={type === 'distance'}
          href={`${iframe ? '/iframes' : ''}/transport${params}`}
          title={`Distance${type === 'distance' ? ' : page actuelle' : ''}`}>
          Distance
        </Tab>
      )}
      {(type === 'itineraire' || !router.query.tabs || router.query.tabs.includes('itineraire')) && (
        <Tab
          internal
          data-testid='transport-tab-itineraire'
          $current={type === 'itineraire'}
          href={`${iframe ? '/iframes' : ''}/transport/itineraire${params}`}
          title={`Itinéraire${type === 'itineraire' ? ' : page actuelle' : ''}`}>
          Itinéraire
        </Tab>
      )}
      {(type === 'teletravail' || !router.query.tabs || router.query.tabs.includes('teletravail')) && (
        <Tab
          internal
          data-testid='transport-tab-teletravail'
          $current={type === 'teletravail'}
          href={`${iframe ? '/iframes' : ''}/transport/teletravail${params}`}
          title={`Télétravail${type === 'teletravail' ? ' : page actuelle' : ''}`}
          $large>
          Télétravail
        </Tab>
      )}
    </Wrapper>
  )
}
