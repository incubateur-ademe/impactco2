import React, { useState, useEffect, useContext, useRef } from 'react'
import styled from 'styled-components'
import { navigate } from 'gatsby'
import Fuse from '../../../../../../node_modules/fuse.js/dist/fuse.basic.esm.min.js'

import DataContext from 'utils/DataContext'
import TextInput from './searchBar/TextInput'
import Suggestions from './searchBar/Suggestions'

const Wrapper = styled.form`
  position: absolute;
  z-index: 100;
  top: 0.5rem;
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.colors.background};
  border-bottom: 0.0625rem solid ${(props) => props.theme.colors.main};
  border-radius: 0.25rem 0.25rem 0 0;
  box-shadow: ${(props) =>
    props.focus ? '-0.25rem 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.05)' : 'none'};
  overflow: hidden;
  transition: box-shadow 300ms ease-out;
`

export default function SearchBar(props) {
  const { equivalents, categories } = useContext(DataContext)
  const [search, setSearch] = useState('')

  const [results, setResults] = useState([])
  const [fuse, setFuse] = useState(null)
  useEffect(() => {
    if (equivalents) {
      setFuse(
        new Fuse(equivalents, {
          keys: ['name.fr', 'subtitle.fr'],
          threshold: 0.3,
          ignoreLocation: true,
        })
      )
    }
  }, [equivalents])

  useEffect(() => {
    if (fuse && search.length > 1) {
      setResults(
        fuse.search(search.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
      )
    } else {
      setResults([])
    }
  }, [search, fuse])

  const [focus, setFocus] = useState(false)
  const input = useRef(null)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    setCurrent(0)
    if (!focus) {
      input.current && input.current.blur()
    }
  }, [focus, results])

  const navigateToEquivalent = ({ item }) => {
    navigate(
      `/categories/${
        categories.find((category) => category.id === item.category).slug
      }/${item.slug}`
    )
  }

  return (
    <Wrapper
      small={props.small}
      focus={focus}
      onSubmit={(e) => {
        e.preventDefault()
        if (results[current]) {
          navigateToEquivalent(results[current])
        }
      }}
      className={props.className}
    >
      <TextInput
        small={props.small}
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
          search={search}
          results={results}
          focus={focus}
          current={current}
          setCurrent={setCurrent}
          handleSuggestionClick={navigateToEquivalent}
        />
      )}
    </Wrapper>
  )
}
