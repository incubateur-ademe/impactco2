import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'
import { ComputedEquivalent } from 'types/equivalent'
import { categories } from 'data/categories'
import EquivalentCardContent from '../outils/equivalents/EquivalentCardContent'
import styles from './EquivalentCard.module.css'

const EquivalentCard = ({ equivalent }: { equivalent?: ComputedEquivalent }) => {
  const category = equivalent ? categories.find((x) => x.id === equivalent.category) : undefined

  return equivalent && category ? (
    <Link href={equivalent.link} className={styles.equivalent}>
      <EquivalentCardContent equivalent={equivalent} category={category} />
    </Link>
  ) : (
    <div className={classNames(styles.equivalent, styles.empty)} />
  )
}

export default EquivalentCard
