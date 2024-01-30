import React from 'react'
import styles from './Detail.module.css'

const DetailValue = ({ value, unit }: { value: number; unit: string }) => {
  return (
    <>
      <span>
        {(value * (unit === 'g' ? 1000 : 1)).toLocaleString('fr-fr', {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        })}{' '}
        {unit}
      </span>{' '}
      <span className={styles.unit}>
        CO
        <sub>2</sub>e
      </span>
    </>
  )
}

export default DetailValue
