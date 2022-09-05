import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'

import { usePosition } from 'hooks/useAddress'
import MagicLink from 'components/base/MagicLink'

const fetching = keyframes`
  from {
   opacity: 1;
  }
  
  50% {
   opacity: 0;
  }
  to {
   opacity: 1;
  }
`
const Wrapper = styled.button`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  padding-right: 0.75rem;
  background: ${(props) => props.theme.colors.background};
  border: none;
  border-radius: 1.375rem;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  pointer-events: ${(props) => (props.visible ? 'inherit' : 'none')};
  transition: opacity ${(props) => (props.visible ? 600 : 0)}ms;
  cursor: ${(props) => (props.fetching ? 'wait' : 'pointer')};

  svg {
    display: block;
    width: 1.375rem;
    height: auto;
    animation: ${(props) => (props.fetching ? fetching : '')} 1000ms infinite;

    path {
      fill: ${(props) => props.theme.colors.main};
    }
  }
`
const Error = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 1rem);
  width: calc(100% - 2rem);
  max-width: 25rem;
  padding: 1rem 2.5rem;
  background: ${(props) => props.theme.colors.error};
  border-radius: 1.5rem;

  p {
    margin: 0;
    text-align: center;
  }
`
export default function Geoloc(props) {
  const [position, setPosition] = useState(null)

  const [isGeolocating, setIsGeolocating] = useState(null)

  const { isFetching, isError } = usePosition(position)

  /*useEffect(() => {
    data && data.features && props.navigateToPlace(data.features[0])
  }, [data])*/

  const [error, setError] = useState(false)

  return typeof window != 'undefined' &&
    false &&
    window.document &&
    'geolocation' in navigator ? (
    <>
      <Wrapper
        visible={props.visible && !error && !isError}
        fetching={isFetching || isGeolocating}
        type='button'
        onClick={() => {
          if (!isFetching && !isGeolocating) setIsGeolocating(true)
          navigator.geolocation.getCurrentPosition((position) => {
            setIsGeolocating(false)
            setPosition(position)
          }, setError)
        }}
      >
        <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
          <path d='M12 8.5C10.0705 8.5 8.5 10.07 8.5 12C8.5 13.93 10.0705 15.5 12 15.5C13.9295 15.5 15.5 13.93 15.5 12C15.5 10.07 13.9295 8.5 12 8.5ZM12 13.5C11.173 13.5 10.5 12.827 10.5 12C10.5 11.173 11.173 10.5 12 10.5C12.827 10.5 13.5 11.173 13.5 12C13.5 12.827 12.827 13.5 12 13.5Z' />
          <path d='M23 11H20.941C20.478 6.8355 17.1645 3.522 13 3.059V1C13 0.448 12.552 0 12 0C11.448 0 11 0.448 11 1V3.059C6.8355 3.522 3.522 6.8355 3.059 11H1C0.448 11 0 11.448 0 12C0 12.552 0.448 13 1 13H3.059C3.522 17.1645 6.8355 20.478 11 20.941V23C11 23.552 11.448 24 12 24C12.552 24 13 23.552 13 23V20.941C17.1645 20.478 20.478 17.1645 20.941 13H23C23.552 13 24 12.552 24 12C24 11.448 23.552 11 23 11ZM12 19C8.14 19 5 15.86 5 12C5 8.14 8.14 5 12 5C15.86 5 19 8.14 19 12C19 15.86 15.86 19 12 19Z' />
        </svg>
      </Wrapper>
      {(isError || error) && (
        <Error>
          {error.code === 1 ? (
            <p>
              Il semblerait que vous n&apos;avez pas activé la géolocalisation
              sur votre appareil :(
              <br />
              <MagicLink to='https://support.leadformance.com/hc/fr/articles/229309748-G%C3%A9olocalisation-acc%C3%A9der-aux-param%C3%A8tres-de-votre-navigateur-internet.html'>
                Comment faire ?
              </MagicLink>
            </p>
          ) : (
            <p>Nous ne parvenons pas à vous localiser :(</p>
          )}
        </Error>
      )}
    </>
  ) : null
}
