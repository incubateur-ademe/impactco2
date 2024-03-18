import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { MEDIA } from 'utils/styles'
import { useSearchEquivalent } from 'components/providers/useSearchEquivalent'
import Suggestions from './searchBar/Suggestions'
import TextInputSmall from './searchBar/TextInputSmall'

export default function NavSearchBar(props) {
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
  }, [focus, results])

  const router = useRouter()

  const navigateToItem = (item) => {
    router.push(item.link)
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (search.length > 1) {
          if (results[current]) {
            navigateToItem(results[current])
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
  ${MEDIA.LT.SMALL} {
    display: none;
    width: 100%;
  }
`

const NavActions = styled.div`
  display: flex;
`

const SearchContainer = styled.div`
  background-color: ${(props) => (props.$focus ? 'var(--neutral-00)' : 'transparent')};
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

  ${MEDIA.LT.SMALL} {
    border-radius: ${(props) => (props.home || props.$focus ? ' 0.625em' : '4rem')};
    left: ${(props) => (props.home ? 0 : 'auto')};
    width: ${(props) => (props.home ? 'auto' : props.$focus ? 'calc(100vw - 1.5rem)' : '2.375rem')};
  }
`
