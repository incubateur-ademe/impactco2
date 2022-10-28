import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'

import MagicLink from 'components/base/MagicLink'

const Wrapper = styled.nav`
  display: flex;
`
const Tab = styled(MagicLink)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  margin-bottom: -1rem;
  padding: 0.25rem 0 1rem;
  color: ${(props) => props.theme.colors[props.current ? 'text' : 'main']};
  text-align: center;
  text-decoration: none;
  background-color: ${(props) =>
    props.current ? props.theme.colors.second : 'transparent'};
  border-radius: 1rem 1rem 0 0;
  transition: background-color 200ms ease-out;

  &:hover {
    background-color: ${(props) => props.theme.colors.second};
  }

  ${(props) => props.theme.mq.small} {
    display: ${(props) => (props.large ? 'none' : 'flex')};
    margin-bottom: -1.25rem;
    padding: 0.25rem 0 1.25rem;
    font-size: 0.875rem;
  }
`
export default function ModeSelector(props) {
  const router = useRouter()

  return (
    <Wrapper>
      <Tab
        current={props.distance}
        to={(props.iframe ? '/iframes' : '') + '/transport'}
        title={`Distance${
          router.asPath.split() === '/' ? ' : page actuelle' : ''
        }`}
      >
        Distance
      </Tab>
      <Tab
        current={props.itineraire}
        to={(props.iframe ? '/iframes' : '') + '/transport/itineraire'}
        title={`Itinéraire${
          router.asPath.split() === '/itineraire' ? ' : page actuelle' : ''
        }`}
      >
        Itinéraire
      </Tab>
      <Tab
        current={props.teletravail}
        to={(props.iframe ? '/iframes' : '') + '/transport/teletravail'}
        title={`Télétravail${
          router.asPath.split() === '/teletravail' ? ' : page actuelle' : ''
        }`}
        large
      >
        Télétravail
      </Tab>
    </Wrapper>
  )
}
