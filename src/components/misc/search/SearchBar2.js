import Fuse from 'fuse.js'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import DataContext from 'components/providers/DataProvider'
import Suggestions from './searchBar/Suggestions'
import TextInput from './searchBar/TextInput'

const Wrapper = styled.form`
  > input {
    height: 100%;
  }
  ${(props) => props.theme.mq[props.$hideon]} {
    display: none;
  }
  border: ${(props) => (props.$focus ? `0.125rem solid ${props.theme.colors.main}` : 'none')};
  border-radius: ${(props) => (props.$home || props.$focus ? ' 0.625em' : '4rem')};
  box-shadow: ${(props) => (props.$focus ? '-0.25rem 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.05)' : 'none')};
  cursor: pointer;
  height: 100%;
  left: ${(props) => (props.home ? 0 : 'auto')};
  margin-right: ${(props) => (props.$focus ? '1rem' : '0')};
  max-width: ${(props) => (props.$focus ? 'calc(100vw - 1.5rem)' : '2.75rem')};
  right: 0;
  top: 0;
  width: ${(props) => (props.home ? 'auto' : props.$focus ? 'calc(100vw - 1.5rem)' : '1rem')};
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
      setResults(fuse.search(search.normalize('NFD').replace(/[\u0300-\u036f]/g, '')))
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
        ? `/${categories.find((category) => category.id === item.category).slug}/${item.slug}`
        : `/${item.slug}`
    )
  }

  return (
    <Wrapper
      $focus={focus}
      $home={props.home}
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
      $hideon={props.hideon}
      id='header-search'>
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
