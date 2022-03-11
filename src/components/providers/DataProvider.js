import React, { useState, useEffect } from 'react'
import { navigate } from 'gatsby'

import DataContext from 'utils/DataContext'
import equivalentsData from 'data/equivalents.json'
import categoriesData from 'data/categories.json'

export default function DataProvider(props) {
  const [equivalents, setEquivalents] = useState([])
  const [currentEquivalent, setCurrentEquivalent] = useState(0)

  const [categories, setCategories] = useState([])
  const [currentCategory, setCurrentCategory] = useState(0)
  useEffect(() => {
    setEquivalents(equivalentsData)
    setCategories(categoriesData)
  }, [])

  useEffect(() => {
    setCurrentEquivalent(
      (window.location.hash &&
        equivalents.find(
          (equivalent) =>
            String(equivalent.id) === window.location.hash.replace('#', '')
        )) ||
        equivalents.filter((equivalent) => equivalent.default)[0]
    )
  }, [equivalents])

  useEffect(() => {
    setCurrentCategory(
      (window.location.pathname === '/categories' &&
        window.location.hash &&
        categories.find(
          (category) =>
            String(category.slug) === window.location.hash.replace('#', '')
        )) ||
        categories[0]
    )
  }, [categories])

  return (
    <DataContext.Provider
      value={{
        equivalents,
        currentEquivalent,
        setCurrentEquivalent: (equivalent) => {
          navigate(`#${equivalent.id}`)
          setCurrentEquivalent(equivalent)
        },
        categories,
        currentCategory,
        setCurrentCategory: (category) => {
          navigate(`#${category.slug}`)
          setCurrentCategory(category)
        },
      }}
    >
      {props.children}
    </DataContext.Provider>
  )
}
