import classNames from 'classnames'
import React from 'react'
import { ComputedEquivalent } from 'types/equivalent'
import categories from 'data/categories.json'
import EquivalentCardContent from '../outils/equivalents/EquivalentCardContent'
import styles from './EquivalentCard.module.css'

const EquivalentCard = ({ equivalent }: { equivalent?: ComputedEquivalent }) => {
  const category = equivalent ? categories.find((x) => x.id === equivalent.category) : undefined

  return (
    <div className={classNames(styles.equivalent, { [styles.empty]: !equivalent })}>
      {equivalent && category && <EquivalentCardContent equivalent={equivalent} category={category} />}
    </div>
  )
}

export default EquivalentCard
