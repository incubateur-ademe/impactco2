import { useRouter } from 'next/router'
import React, { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import DataContext from 'components/providers/DataProvider'

import Fuse from '../../../../node_modules/fuse.js/dist/fuse.basic.esm.min.js'
import Suggestions from './searchBar/Suggestions'
import TextInput from './searchBar/TextInput'

const Wrapper = styled.form`
  background-color: ${(props) =>
    props.focus ? props.theme.colors.background : 'transparent'};
  border: 0.125rem solid ${(props) => props.theme.colors.main};
  border-radius: ${(props) =>
    props.home || props.focus ? ' 0.625em' : '4rem'};
  box-shadow: ${(props) =>
    props.focus ? '-0.25rem 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.05)' : 'none'};
  left: ${(props) => (props.home ? 0 : 'auto')};
  right: 0;
  top: 0;
  transition: box-shadow 300ms ease-out, background-color 300ms ease-out;
  width: ${(props) =>
    props.home ? 'auto' : props.focus ? 'calc(100vw - 1.5rem)' : '2.375rem'};
  z-index: 100;
`

export default function SearchBar2(props) {
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
              name: 'name',
              weight: 1,
            },
            {
              name: 'slug',
              weight: 0.7,
            },
            {
              name: 'subtitle',
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

  const router = useRouter()

  const navigateToItem = ({ item }) => {
    router.push(
      item.category
        ? `/${
            categories.find((category) => category.id === item.category).slug
          }/${item.slug}`
        : `/${item.slug}`
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
