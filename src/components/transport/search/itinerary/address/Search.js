import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import { useSuggestions } from 'hooks/useAddress'
import useDebounce from 'hooks/useDebounce'
import TextInput from './search/TextInput'
import Suggestions from './search/Suggestions'

const Wrapper = styled.form`
  background-color: ${(props) => props.theme.colors.background};
  border: 0.125rem solid ${(props) => props.theme.colors.second};
  border-radius: 1.5rem;
  left: 50%;
  max-width: 22rem;
  overflow: hidden;
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  transition: border 200ms ease-out, top 300ms ease-out;
  transition: box-shadow 200ms ease-out;
  width: 100%;
  z-index: ${(props) => (props.focus ? 100 : 1)};
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
