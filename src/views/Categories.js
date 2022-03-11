import React, { useContext } from 'react'

import DataContext from 'utils/DataContext'
import Search from '../components/misc/Search'
import Category from '../components/misc/Category'

export default function Categories() {
  const { currentCategory } = useContext(DataContext)

  return (
    <>
      <Search type='categories' />
      <Category category={currentCategory} />
    </>
  )
}
