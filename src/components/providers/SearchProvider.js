import React, { useState } from 'react'
import SearchContext from 'utils/SearchContext'

export default function SearchProvider(props) {
  const [search, setSearch] = useState('')

  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  )
}
