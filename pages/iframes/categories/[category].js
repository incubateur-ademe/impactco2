import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'

import DataContext from 'components/providers/DataProvider'
import Iframe from 'components/layout/Iframe'
import Category from 'components/misc/Category'

export default function CategoryIframe() {
  const { query } = useRouter()
  const { categories } = useContext(DataContext)

  const [category, setCategory] = useState()
  useEffect(() => {
    setCategory(
      categories?.find((category) => category.slug === query.category)
    )
  }, [query, categories])

  return category ? (
    <Iframe>
      <Category category={category} />
    </Iframe>
  ) : null
}
