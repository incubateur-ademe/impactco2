import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useSuggestions } from 'hooks/useAddress'
import useDebounce from 'hooks/useDebounce'
import { displayAddress } from '../Address'
import Suggestions from './search/Suggestions'
import TextInput from './search/TextInput'

const Wrapper = styled.form`
  background-color: var(--neutral-00);
  border: 0.125rem solid var(--secondary-10);
  border-radius: 1.5rem;
  left: 50%;
  max-width: 22rem;
  overflow: hidden;
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  width: 100%;
  z-index: ${(props) => (props.$focus ? 100 : 1)};
`

export default function Search(props) {
  const [search, setSearch] = useState('')
  useEffect(() => {
    setSearch(props.address || '')
  }, [props.address])
  const debouncedSearch = useDebounce(search)

  const [focus, setFocus] = useState(false)

  const { data, isFetching } = useSuggestions(debouncedSearch, focus)

  const input = useRef(null)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!focus) {
      setCurrent(0)
      input.current && input.current.blur()
    }
  }, [focus])

  const navigateToPlace = (place) => {
    if (place) {
      props.setAddress(place)
      setFocus(false)
    }
  }

  return (
    <Wrapper
      $focus={focus}
      onSubmit={(e) => {
        e.preventDefault()
        if (data && data[current]) {
          const place = data[current]
          navigateToPlace({
            latitude: place.geometry.coordinates[1],
            longitude: place.geometry.coordinates[0],
            city: place.properties.city || place.properties.name || '',
            address: displayAddress(place),
          })
        }
      }}>
      <TextInput
        ref={input}
        search={search}
        placeholder={props.placeholder}
        suggestion={data && data[current]}
        suggestionVisible={data && focus}
        focus={focus}
        isFetching={isFetching}
        setSearch={setSearch}
        setFocus={setFocus}
        navigateToPlace={navigateToPlace}
      />
      {data && focus && (
        <Suggestions
          search={debouncedSearch}
          results={data}
          current={current}
          setCurrent={setCurrent}
          handleSuggestionClick={navigateToPlace}
        />
      )}
    </Wrapper>
  )
}
