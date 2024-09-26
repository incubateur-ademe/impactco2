'use client'

import { useTranslations } from 'next-intl'
import React from 'react'
import { computedEquivalents } from 'src/providers/equivalents'
import { Category } from 'types/category'
import { ComputedEquivalent } from 'types/equivalent'
import { categories } from 'data/categories'
import EquivalentSimulator from 'components/outils/equivalents/simulators/EquivalentSimulator'
import Icon from './Icon'
import styles from './Infos.module.css'

const boisson = categories.find((category) => category.slug === 'boisson') as Category
const eau = computedEquivalents.find((equivalent) => equivalent.slug === 'eauenbouteille') as ComputedEquivalent

const EauThe = () => {
  const t = useTranslations('quiz.eau-the')
  return (
    <>
      <div className={styles.container}>
        <div className={styles.withIcon}>
          <Icon />
          <div>{t.rich('line-1')}</div>
        </div>
      </div>
      <br />
      <EquivalentSimulator category={boisson} equivalent={eau} className={styles.borders} />
    </>
  )
}

export default EauThe
