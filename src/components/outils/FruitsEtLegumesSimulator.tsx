'use client'

import { useTranslations } from 'next-intl'
import React from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { Category } from 'types/category'
import { FruitsEtLegumesEquivalent } from 'types/equivalent'
import { categories } from 'data/categories'
import { track } from 'utils/matomo'
import { monthsOptions } from 'utils/months'
import HiddenLabel from 'components/form/HiddenLabel'
import Select from 'components/form/Select'
import CategorySimulator from './CategorySimulator'
import shareableStyles from '../shareable/Shareable.module.css'
import styles from './Simulator.module.css'

const flds = categories.find((category) => category.slug === 'fruitsetlegumes') as Category

const FruitsEtLegumesSimulator = () => {
  const {
    fruitsetlegumes: { month, setMonth },
  } = useParamContext()

  const t = useTranslations('flds')
  const tMonth = useTranslations('overscreen.month')
  return (
    <>
      <div className={styles.simulator}>
        <HiddenLabel htmlFor='text-select-month'>{t('label')}</HiddenLabel>
        <Select
          id='month'
          value={month}
          onChange={(e) => {
            track('Fruits et légumes', 'Mois', e.target.value)
            setMonth(Number(e.target.value))
          }}>
          {monthsOptions.map((month) => (
            <option key={month.value} value={month.value}>
              {tMonth(month.label)}
            </option>
          ))}
        </Select>
        <p>{t('title')}</p>
      </div>
      <div className={shareableStyles.separatorBothBorders} />
      {flds.equivalents && (
        <CategorySimulator
          tracking='Fruits et légumes'
          equivalents={flds.equivalents.filter((equivalent) =>
            (equivalent as FruitsEtLegumesEquivalent).months.includes(month)
          )}
          withSimulator
        />
      )}
    </>
  )
}

export default FruitsEtLegumesSimulator
