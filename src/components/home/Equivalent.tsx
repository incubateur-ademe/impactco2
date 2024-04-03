import classNames from 'classnames'
import { formatValue } from 'publicodes'
import React from 'react'
import { ComputedEquivalent } from 'types/equivalent'
import categories from 'data/categories.json'
import formatName from 'utils/formatName'
import EquivalentIcon from 'components/base/EquivalentIcon'
import styles from './Equivalent.module.css'

const Equivalent = ({ equivalent }: { equivalent?: ComputedEquivalent }) => {
  const category = equivalent ? categories.find((x) => x.id === equivalent.category) : undefined

  return (
    <div className={classNames(styles.equivalent, { [styles.empty]: !equivalent })}>
      {equivalent && (
        <div className={styles.content}>
          <div>
            <div className={styles.title}>
              {formatName(`${equivalent.name}${equivalent.subtitle ? ` (${equivalent.subtitle})` : ''}`, 1, true)}
            </div>
            <div className={styles.value}>
              <div className={styles.valueNumber}>{formatValue(equivalent.value)}</div> kg CO<sub>2</sub>e
            </div>
            <div className={styles.unit}>par {equivalent.unit || category?.unit || 'unité'}</div>
          </div>
          <EquivalentIcon equivalent={equivalent} height={5} />
        </div>
      )}
    </div>
  )
}

export default Equivalent
