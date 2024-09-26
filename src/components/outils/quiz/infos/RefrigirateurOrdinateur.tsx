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

const electromenager = categories.find((category) => category.slug === 'electromenager') as Category
const refrigirateur = computedEquivalents.find(
  (equivalent) => equivalent.slug === 'refrigirateur'
) as ComputedEquivalent

const RefrigirateurOrdinateur = () => {
  const t = useTranslations('quiz.refrigirateur-ordinateur')
  return (
    <>
      <div className={styles.container}>
        <div className={styles.withIcon}>
          <Icon />
          <div>{t.rich('line-1')}</div>
        </div>
      </div>
      <br />
      <EquivalentSimulator category={electromenager} equivalent={refrigirateur} className={styles.borders} />
    </>
  )
}

export default RefrigirateurOrdinateur
