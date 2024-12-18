'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { useChauffageStore } from 'src/providers/stores/chauffage'
import { Category } from 'types/category'
import { categories } from 'data/categories'
import { track } from 'utils/matomo'
import NumberInput from 'components/form/NumberInput'
import shareableStyles from '../shareable/Shareable.module.css'
import CategorySimulator from './CategorySimulator'
import styles from './Simulator.module.css'

const chauffage = categories.find((category) => category.slug === 'chauffage') as Category

const ChauffageSimulator = () => {
  const { m2, setM2 } = useChauffageStore()
  const [internalValue, setInternalValue] = useState(m2.toString())
  const t = useTranslations('chauffage')

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
        <p>{t('title')}</p>
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
