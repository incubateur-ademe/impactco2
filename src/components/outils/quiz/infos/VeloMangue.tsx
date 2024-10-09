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

const fruitsetlegumes = categories.find((category) => category.slug === 'fruitsetlegumes') as Category
const mangue = computedEquivalents.find((equivalent) => equivalent.slug === 'mangue') as ComputedEquivalent

const VeloMangue = () => {
  const t = useTranslations('quiz.velo-mangue')
  return (
    <>
      <div className={styles.container}>
        <div className={styles.withIcon}>
          <Icon />
          <div>
            {t.rich('line-1')}
            <br />
            <br />
            {t.rich('line-2')}
          </div>
        </div>
      </div>
      <br />
      <EquivalentSimulator category={fruitsetlegumes} equivalent={mangue} className={styles.borders} />
    </>
  )
}

export default VeloMangue
