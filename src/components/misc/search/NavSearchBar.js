import Fuse from 'fuse.js'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import useDataContext from 'components/providers/DataProvider'
import Suggestions from './searchBar/Suggestions'
import TextInputSmall from './searchBar/TextInputSmall'

export default function NavSearchBar(props) {
  const { equivalents, categories } = useDataContext()
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
    <form
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
      className={props.className}>
      <NavActions>
        <NavSearch className='navSearch'>
          <SearchContainer className='searchContainer'>
            <TextInputSmall
              placeholder={'Rechercher...'}
              ref={input}
              search={search}
              focus={focus}
              suggestion={results[current]}
              suggestionVisible={focus}
              setSearch={setSearch}
              setFocus={setFocus}
              hideSubmit={true}
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
          </SearchContainer>
        </NavSearch>
      </NavActions>
    </form>
  )
}

const NavSearch = styled.div`
  position: relative;
  width: 300px;
  ${(props) => props.theme.mq.small} {
    display: none;
    width: 100%;
  }
`

const NavActions = styled.div`
  display: flex;
`

const SearchContainer = styled.div`
  background-color: ${(props) => (props.$focus ? props.theme.colors.background : 'transparent')};
  border: 1px solid #eae5e8;
  border-radius: 0.625em;
  box-shadow: ${(props) =>
    props.$focus ? '0px 4px 10px 0px rgba(0, 17, 51, 0.08)' : '0px 4px 10px 0px rgba(0, 17, 51, 0.04)'};
  left: 0;
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 100;

  ${(props) => props.theme.mq.small} {
    border-radius: ${(props) => (props.home || props.$focus ? ' 0.625em' : '4rem')};
    left: ${(props) => (props.home ? 0 : 'auto')};
    width: ${(props) => (props.home ? 'auto' : props.$focus ? 'calc(100vw - 1.5rem)' : '2.375rem')};
  }
`
