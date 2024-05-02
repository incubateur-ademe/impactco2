import React from 'react'
import { Category } from 'types/category'
import { ComputedEquivalent } from 'types/equivalent'
import formatName from 'utils/formatName'
import formatNumber from 'utils/formatNumber'
import EquivalentIcon from 'components/base/EquivalentIcon'
import styles from './EquivalentCardContent.module.css'

const EquivalentCardContent = ({ equivalent, category }: { equivalent: ComputedEquivalent; category: Category }) => {
  return (
    <div className={styles.content}>
      <div>
        <div className={styles.title}>
          {formatName(`${equivalent.name}${equivalent.subtitle ? ` (${equivalent.subtitle})` : ''}`, 1, true)}
        </div>
        <div className={styles.value}>
          <div className={styles.valueNumber}>{formatNumber(equivalent.value)}</div> kg CO₂e
        </div>
        <div className={styles.unit}>par {equivalent.unit || category?.unit || 'unité'}</div>
      </div>
      <EquivalentIcon equivalent={equivalent} height={5} />
    </div>
  )
}

export default EquivalentCardContent
