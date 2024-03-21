import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { MEDIA } from 'utils/styles'
import { useSearchEquivalent } from 'components/providers/useSearchEquivalent'
import Suggestions from './searchBar/Suggestions'
import TextInput from './searchBar/TextInput'

const Wrapper = styled.form`
  background-color: ${(props) => (props.focus ? 'var(--neutral-00)' : 'transparent')};
  border: 0.125rem solid var(--primary-50);
  border-radius: 0.625em;
  box-shadow: ${(props) => (props.focus ? '-0.25rem 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.05)' : 'none')};
  left: 0;
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 100;

  ${MEDIA.LT.SMALL} {
    border-radius: ${(props) => (props.home || props.focus ? ' 0.625em' : '4rem')};
    left: ${(props) => (props.home ? 0 : 'auto')};
    width: ${(props) => (props.home ? 'auto' : props.focus ? 'calc(100vw - 1.5rem)' : '2.375rem')};
  }
`

export default function SearchBar(props) {
  const [search, setSearch] = useState('')

  const results = useSearchEquivalent(search)

  const [focus, setFocus] = useState(false)
  const input = useRef(null)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    setCurrent(0)
    if (!focus) {
      input.current && input.current.blur()
    }
  }, [focus])

  const router = useRouter()

  const navigateToItem = (item) => {
    router.push(item.link)
  }

  return (
    <Wrapper
      focus={focus}
      home={props.home}
      onSubmit={(e) => {
        e.preventDefault()
        if (search.length > 1) {
          if (results[current]) {
            navigateToItem(results[current])
          }
        }
      }}
      className={props.className}>
      <TextInput
        placeholder={props.placeholder}
        ref={input}
        search={search}
        focus={focus}
        suggestion={results[current]}
        suggestionVisible={focus}
        setSearch={setSearch}
        setFocus={setFocus}
      />
      {focus && (
        <Suggestions
          enabled={search.length > 1}
          results={results}
          focus={focus}
          current={current}
          setCurrent={setCurrent}
          handleSuggestionClick={navigateToItem}
        />
      )}
    </Wrapper>
  )
}
