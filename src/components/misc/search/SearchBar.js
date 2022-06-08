import React, { useState, useEffect, useContext, useRef } from 'react'
import styled from 'styled-components'
import { navigate } from 'gatsby'
import Fuse from '../../../../node_modules/fuse.js/dist/fuse.basic.esm.min.js'

import DataContext from 'utils/DataContext'
import TextInput from './searchBar/TextInput'
import Suggestions from './searchBar/Suggestions'

const Wrapper = styled.form`
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${(props) =>
    props.focus ? props.theme.colors.background : 'transparent'};
  border: 0.125rem solid ${(props) => props.theme.colors.main};
  border-radius: 0.625em;
  box-shadow: ${(props) =>
    props.focus ? '-0.25rem 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.05)' : 'none'};
  overflow: hidden;
  transition: box-shadow 300ms ease-out, background-color 300ms ease-out;

  ${(props) => props.theme.mq.small} {
    left: ${(props) => (props.home ? 0 : 'auto')};
    width: ${(props) =>
      props.home ? 'auto' : props.focus ? 'calc(100vw - 1.5rem)' : '2.375rem'};
    border-radius: ${(props) =>
      props.home || props.focus ? ' 0.625em' : '4rem'};
    transition: box-shadow 300ms ease-out, width 200ms ease-out;
  }
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
          keys: [
            {
              name: 'name.fr',
              weight: 1,
            },
            {
              name: 'slug',
              weight: 0.7,
            },
            {
              name: 'subtitle.fr',
              weight: 0.4,
            },
            {
              name: 'synonyms',
              weight: 0.2,
            },
          ],
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

  const navigateToItem = ({ item }) => {
    navigate(
      item.category
        ? `/categories/${
            categories.find((category) => category.id === item.category).slug
          }/${item.slug}`
        : `/categories/${item.slug}`
    )
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
          } else {
            navigateToItem({ item: categories[current] })
          }
        }
      }}
      className={props.className}
    >
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
          categories={categories}
          focus={focus}
          current={current}
          setCurrent={setCurrent}
          handleSuggestionClick={navigateToItem}
        />
      )}
    </Wrapper>
  )
}
