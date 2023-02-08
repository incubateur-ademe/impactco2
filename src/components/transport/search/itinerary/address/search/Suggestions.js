import React, { useEffect, useCallback } from 'react'
import styled from 'styled-components'

import Highlighter from 'react-highlight-words'

const displayAddress = (address) =>
  `${address.properties.name ? address.properties.name + ' ' : ''}${
    address.properties.housenumber ? address.properties.housenumber + ' ' : ''
  }${address.properties.street ? address.properties.street + ', ' : ''}${
    address.properties.city ? address.properties.city + ' ' : ''
  } ${address.properties.country}`

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  border-radius: 0 0 1.375rem 1.375rem;
  max-height: 20rem;
  overflow-y: auto;

  position: relative;
`
const Suggestion = styled.div`
  background-color: ${(props) =>
    props.theme.colors[props.current ? 'secondLight' : 'background']};
  cursor: pointer;
  font-size: 0.875rem;
  opacity: ${(props) => (props.isFetching ? 0.3 : 1)};
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  transition: background-color 200ms ease-out,
    opacity ${(props) => (props.isFetching ? 300 : 0)}ms ease-out;

  &:hover {
    background-color: ${(props) => props.theme.colors.mainLight};
  }

  mark {
    background-color: transparent;
    color: ${(props) => props.theme.colors.text};
    opacity: 0.8;
  }
`
const Name = styled.span``
export default function Suggestions(props) {
  const maxSuggestions = 7

  const onKeyDown = useCallback(
    (e) => {
      if (e.code === 'ArrowDown') {
        e.preventDefault()
        props.current < maxSuggestions - 1
          ? props.setCurrent((prevCurrent) => prevCurrent + 1)
          : props.setCurrent(0)
      }
      if (e.code === 'ArrowUp') {
        e.preventDefault()
        props.current > 0 && props.setCurrent((prevCurrent) => prevCurrent - 1)
      }
    },
    [props]
  )

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onKeyDown])

  return (
    <Wrapper>
      {props.results.map(
        (result, index) =>
          index < maxSuggestions && (
            <Suggestion
              current={index === props.current}
              key={result.place_id}
              isFetching={props.isFetching}
              onClick={() => props.handleSuggestionClick(result)}
              onMouseDown={(e) => e.preventDefault()}
            >
              <Name>
                <Highlighter
                  searchWords={props.search.split(' ')}
                  autoEscape={true}
                  textToHighlight={displayAddress(result)}
                />
              </Name>
            </Suggestion>
          )
      )}
    </Wrapper>
  )
}
