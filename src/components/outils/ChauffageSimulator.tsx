'use client'

import React, { useEffect, useState } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { Category } from 'types/category'
import { categories } from 'data/categories'
import { track } from 'utils/matomo'
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
        <NumberInput
          id='m2-value'
          value={m2}
          setValue={(value) => {
            track('Chauffage', 'Surface', value.toString())
            setM2(value)
          }}
          label='Surface (en m²)'
          unit='m²'
        />
        Découvrez la quantité de CO₂e que vous émettez pour chauffer cette surface par an
      </div>
      <div className={shareableStyles.separatorBothBorders} />
      {chauffage.equivalents && (
        <CategorySimulator
          tracking='Chauffage'
          equivalents={chauffage.equivalents.map((equivalent) => ({ ...equivalent, value: equivalent.value * m2 }))}
          withSimulator
        />
      )}
    </>
  )
}

export default ChauffageSimulator
