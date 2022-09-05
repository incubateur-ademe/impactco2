import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import { useSuggestions } from 'hooks/useAddress'
import useDebounce from 'hooks/useDebounce'
import TextInput from './search/TextInput'
import Suggestions from './search/Suggestions'

const Wrapper = styled.form`
  position: absolute;
  z-index: ${(props) => (props.focus ? 100 : 1)};
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 22rem;
  background-color: ${(props) => props.theme.colors.background};
  border: 0.125rem solid ${(props) => props.theme.colors.second};
  border-radius: 1.5rem;
  transition: box-shadow 200ms ease-out;
  transition: border 200ms ease-out, top 300ms ease-out;
  overflow: hidden;
`

export default function Search(props) {
  const [search, setSearch] = useState('')
  useEffect(() => {
    setSearch(props.address)
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
      focus={focus}
      addressSet={props.address}
      onSubmit={(e) => {
        e.preventDefault()
        if (current > -1) {
          navigateToPlace(data[current])
        }
      }}
    >
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
          focus={focus}
          current={current}
          isFetching={isFetching}
          setCurrent={setCurrent}
          handleSuggestionClick={navigateToPlace}
        />
      )}
    </Wrapper>
  )
}
