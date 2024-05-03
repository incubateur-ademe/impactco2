'use client'

import React from 'react'
import { Category } from 'types/category'
import { FruitsEtLegumesEquivalent } from 'types/equivalent'
import { categories } from 'data/categories'
import { monthsOptions } from 'utils/months'
import useParamContext from 'components/providers/ParamProvider'
import HiddenLabel from 'components/form/HiddenLabel'
import Select from 'components/form/Select'
import shareableStyles from '../shareable/Shareable.module.css'
import CategorySimulator from './CategorySimulator'
import styles from './Simulator.module.css'

const flds = categories.find((category) => category.slug === 'fruitsetlegumes') as Category

const FruitsEtLegumesSimulator = () => {
  const {
    fruitsetlegumes: { month, setMonth },
  } = useParamContext()

  return (
    <>
      <div className={styles.simulator}>
        <HiddenLabel htmlFor='month'>Découvres les fruits et légumes du mois de</HiddenLabel>
        <Select id='month' value={month} onChange={(e) => setMonth(Number(e.target.value))}>
          {monthsOptions.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </Select>
        Découvrez l’impact carbone des fruits et légumes de saison pour ce mois
      </div>
      <div className={shareableStyles.separatorBothBorders} />
      {flds.equivalents && (
        <CategorySimulator
          equivalents={flds.equivalents.filter((equivalent) =>
            (equivalent as FruitsEtLegumesEquivalent).months.includes(month)
          )}
        />
      )}
    </>
  )
}

export default FruitsEtLegumesSimulator
