'use client'

import React from 'react'
import { Category } from 'types/category'
import { ComputedEquivalent } from 'types/equivalent'
import Detail from '../detail/Detail'
import EquivalentHeader from './EquivalentHeader'
import styles from './EquivalentSimulator.module.css'

const EquivalentSimulator = ({
  category,
  equivalent,
  className,
  noInfo,
}: {
  category: Category
  equivalent: ComputedEquivalent
  className?: string
  noInfo?: boolean
}) => {
  return (
    <div className={className}>
      <div className={styles.header}>
        <EquivalentHeader equivalent={equivalent} category={category} />
      </div>
      <Detail equivalent={equivalent} noInfo={noInfo} withSeparator />
    </div>
  )
}

export default EquivalentSimulator
