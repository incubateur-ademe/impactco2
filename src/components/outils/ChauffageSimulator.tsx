'use client'

import React, { useEffect, useState } from 'react'
import { Category } from 'types/category'
import { categories } from 'data/categories'
import useParamContext from 'components/providers/ParamProvider'
import NumberInput from 'components/form/NumberInput'
import shareableStyles from '../shareable/Shareable.module.css'
import CategorySimulator from './CategorySimulator'
import styles from './Simulator.module.css'

const chauffage = categories.find((category) => category.slug === 'chauffage') as Category

const ChauffageSimulator = () => {
  const {
    chauffage: { m2, setM2 },
  } = useParamContext()
  const [internalValue, setInternalValue] = useState(m2.toString())

  useEffect(() => {
    if (internalValue !== m2.toString()) {
      setInternalValue(m2 ? m2.toString() : '')
    }
  }, [m2])

  useEffect(() => {
    setM2(Number(internalValue))
  }, [internalValue])

  return (
    <>
      <div className={styles.simulator}>
        <NumberInput id='m2-value' value={m2} setValue={setM2} label='Surface (en m²)' unit='m²' />
        Découvrez la quantité de CO2e que vous émettez pour chauffer cette surface par an
      </div>
      <div className={shareableStyles.separatorBothBorders} />
      {chauffage.equivalents && (
        <CategorySimulator
          equivalents={chauffage.equivalents.map((equivalent) => ({ ...equivalent, value: equivalent.value * m2 }))}
        />
      )}
    </>
  )
}

export default ChauffageSimulator
