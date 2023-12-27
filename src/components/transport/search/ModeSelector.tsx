import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'
import MagicLink from 'components/base/MagicLink'

const Wrapper = styled.nav`
  display: flex;
`
const Tab = styled(MagicLink)<{ $current: boolean; $large?: boolean }>`
  align-items: center;
  background-color: ${(props) => (props.$current ? props.theme.colors.second : 'transparent')};
  border-radius: 1rem 1rem 0 0;
  color: ${(props) => props.theme.colors[props.$current ? 'text' : 'main']};
  display: flex;
  flex: 1;
  height: 3rem;
  justify-content: center;
  margin-bottom: -1rem;
  padding: 0.25rem 0 1rem;
  text-align: center;
  text-decoration: none;

  &:hover {
    background-color: ${(props) => props.theme.colors.second};
  }

  ${(props) => props.theme.mq.small} {
    display: ${(props) => (props.$large ? 'none' : 'flex')};
    font-size: 0.875rem;
    margin-bottom: -1.25rem;
    padding: 0.25rem 0 1.25rem;
  }
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
          data-testid='transport-tab-distance'
          $current={type === 'distance'}
          to={`${iframe ? '/iframes' : ''}/transport${params}`}
          title={`Distance${type === 'distance' ? ' : page actuelle' : ''}`}>
          Distance
        </Tab>
      )}
      {(type === 'itineraire' || !router.query.tabs || router.query.tabs.includes('itineraire')) && (
        <Tab
          data-testid='transport-tab-itineraire'
          $current={type === 'itineraire'}
          to={`${iframe ? '/iframes' : ''}/transport/itineraire${params}`}
          title={`Itinéraire${type === 'itineraire' ? ' : page actuelle' : ''}`}>
          Itinéraire
        </Tab>
      )}
      {(type === 'teletravail' || !router.query.tabs || router.query.tabs.includes('teletravail')) && (
        <Tab
          data-testid='transport-tab-teletravail'
          $current={type === 'teletravail'}
          to={`${iframe ? '/iframes' : ''}/transport/teletravail${params}`}
          title={`Télétravail${type === 'teletravail' ? ' : page actuelle' : ''}`}
          $large>
          Télétravail
        </Tab>
      )}
    </Wrapper>
  )
}
