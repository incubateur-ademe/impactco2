import Link from 'next/link'
import React from 'react'
import { ComputedEquivalent } from 'types/equivalent'
import { categories } from 'data/categories'
import EquivalentCardContent from '../outils/equivalents/EquivalentCardContent'
import styles from './EquivalentCard.module.css'

const EquivalentCard = ({ equivalent }: { equivalent?: ComputedEquivalent }) => {
  const category = equivalent ? categories.find((x) => x.id === equivalent.category) : undefined

  return equivalent && category ? (
    <Link href={equivalent.link} className={styles.equivalent} data-testid={`equivalent-search-${equivalent.slug}`}>
      <EquivalentCardContent equivalent={equivalent} category={category} />
    </Link>
  ) : (
    <div className={styles.empty} data-testid='equivalent-search-empty' />
  )
}

export default EquivalentCard
