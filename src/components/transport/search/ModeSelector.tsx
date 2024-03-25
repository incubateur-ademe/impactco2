import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'
import { MEDIA } from 'utils/styles'
import useParamContext from 'components/providers/ParamProvider'

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

const Tab = styled.button<{ $large?: boolean }>`
  align-items: center;
  background-color: transparent;
  border: none;
  border-radius: 1rem 1rem 0 0;
  color: var(--primary-50);
  cursor: pointer;
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

export default function ModeSelector() {
  const router = useRouter()
  const {
    transport: { selected, setSelected },
  } = useParamContext()

  return (
    <Wrapper>
      {(selected === 'distance' || !router.query.tabs || router.query.tabs.includes('distance')) &&
        (selected === 'distance' ? (
          <CurrentTab data-testid='transport-tab-distance'>Distance</CurrentTab>
        ) : (
          <Tab onClick={() => setSelected('distance')} data-testid='transport-tab-distance' title='Distance'>
            Distance
          </Tab>
        ))}
      {(selected === 'itineraire' || !router.query.tabs || router.query.tabs.includes('itineraire')) &&
        (selected === 'itineraire' ? (
          <CurrentTab data-testid='transport-tab-itineraire'>Itinéraire</CurrentTab>
        ) : (
          <Tab onClick={() => setSelected('itineraire')} data-testid='transport-tab-itineraire' title='Itinéraire'>
            Itinéraire
          </Tab>
        ))}
      {(selected === 'teletravail' || !router.query.tabs || router.query.tabs.includes('teletravail')) &&
        (selected === 'teletravail' ? (
          <CurrentTab $large data-testid='transport-tab-teletravail'>
            Télétravail
          </CurrentTab>
        ) : (
          <Tab
            onClick={() => setSelected('teletravail')}
            data-testid='transport-tab-teletravail'
            title='Télétravail'
            $large>
            Télétravail
          </Tab>
        ))}
    </Wrapper>
  )
}
