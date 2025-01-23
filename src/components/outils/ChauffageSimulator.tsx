'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { useChauffageStore } from 'src/providers/stores/chauffage'
import { Category } from 'types/category'
import { categories } from 'data/categories'
import { track } from 'utils/matomo'
import { DefaultParams } from 'utils/params'
import NumberInput from 'components/form/NumberInput'
import shareableStyles from '../shareable/Shareable.module.css'
import CategorySimulator from './CategorySimulator'
import styles from './Simulator.module.css'

const chauffage = categories.find((category) => category.slug === 'chauffage') as Category

const ChauffageSimulator = ({ defaultParams }: { defaultParams: DefaultParams['chauffage'] }) => {
  const [internalValue, setInternalValue] = useState(defaultParams.m2)
  const t = useTranslations('chauffage')

  const { setM2 } = useChauffageStore()
  useEffect(() => {
    setM2(internalValue)
  }, [internalValue])

  return (
    <>
      <div className={styles.simulator}>
        <NumberInput
          id='m2-value'
          value={internalValue}
          setValue={(value) => {
            track('Chauffage', 'Surface', value.toString())
            setInternalValue(value)
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
          equivalents={chauffage.equivalents.map((equivalent) => ({
            ...equivalent,
            value: equivalent.value * internalValue,
          }))}
          withSimulator
        />
      )}
    </>
  )
}

export default ChauffageSimulator
