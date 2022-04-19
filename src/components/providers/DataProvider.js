import React, { useState, useEffect } from 'react'
import { navigate } from 'gatsby'

import DataContext from 'utils/DataContext'
import equivalentsData from 'data/equivalents.json'
import categoriesData from 'data/categories.json'
import footprintsData from 'data/footprints.json'
import ecvData from 'data/ecv.json'

export default function DataProvider(props) {
  const [equivalents, setEquivalents] = useState([])
  const [currentEquivalent, setCurrentEquivalent] = useState(0)
  const [visualizedEquivalent, setVisualizedEquivalent] = useState(0)

  const [categories, setCategories] = useState([])
  const [currentCategory, setCurrentCategory] = useState(0)

  const [footprints, setFootprints] = useState([])
  const [weight, setWeight] = useState(1)

  const [ecv, setEcv] = useState([])

  useEffect(() => {
    setEquivalents(equivalentsData)
    setCategories(categoriesData)
    setFootprints(footprintsData)
    setEcv(ecvData)
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
    setVisualizedEquivalent(
      equivalents.find((equivalent) => equivalent.id === 27976)
    )
  }, [equivalents])

  useEffect(() => {
    setCurrentCategory(
      (window.location.pathname.includes('/categories') &&
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
          navigate(`${window.location.search}#${equivalent.id}`)
          setCurrentEquivalent(equivalent)
        },
        visualizedEquivalent,
        setVisualizedEquivalent,
        categories,
        currentCategory,
        setCurrentCategory: (category) => {
          navigate(`${window.location.search}#${category.slug}`)
          setCurrentCategory(category)
        },
        footprints,
        weight,
        setWeight,
        ecv,
      }}
    >
      {props.children}
    </DataContext.Provider>
  )
}
