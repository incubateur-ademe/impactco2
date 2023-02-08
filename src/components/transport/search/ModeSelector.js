import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'

import MagicLink from 'components/base/MagicLink'

const Wrapper = styled.nav`
  display: flex;
`
const Tab = styled(MagicLink)`
  align-items: center;
  background-color: ${(props) =>
    props.current ? props.theme.colors.second : 'transparent'};
  border-radius: 1rem 1rem 0 0;
  color: ${(props) => props.theme.colors[props.current ? 'text' : 'main']};
  display: flex;
  flex: 1;
  height: 3rem;
  justify-content: center;
  margin-bottom: -1rem;
  padding: 0.25rem 0 1rem;
  text-align: center;
  text-decoration: none;
  transition: background-color 200ms ease-out;

  &:hover {
    background-color: ${(props) => props.theme.colors.second};
  }

  ${(props) => props.theme.mq.small} {
    display: ${(props) => (props.large ? 'none' : 'flex')};
    font-size: 0.875rem;
    margin-bottom: -1.25rem;
    padding: 0.25rem 0 1.25rem;
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
