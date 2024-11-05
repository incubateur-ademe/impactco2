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

const habillement = categories.find((category) => category.slug === 'habillement') as Category
const manteau = computedEquivalents.find((equivalent) => equivalent.slug === 'manteau') as ComputedEquivalent

const ManteauBouilloire = () => {
  const t = useTranslations('quiz.manteau-bouilloire')
  return (
    <>
      <div className={styles.container}>
        <div className={styles.withIcon}>
          <Icon />
          <div>
            <p>{t.rich('line-1')}</p>
            <p>{t.rich('line-2')}</p>
          </div>
        </div>
      </div>
      <EquivalentSimulator category={habillement} equivalent={manteau} className={styles.borders} />
    </>
  )
}

export default ManteauBouilloire
