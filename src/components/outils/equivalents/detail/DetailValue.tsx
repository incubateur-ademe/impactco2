import React from 'react'
import formatNumber from 'utils/formatNumber'
import styles from './Detail.module.css'

const DetailValue = ({ value, unit }: { value: number; unit: string }) => {
  return (
    <>
      <span>
        {formatNumber(value * (unit === 'g' ? 1000 : 1))} {unit}
      </span>{' '}
      <span className={styles.unit}>CO₂e</span>
    </>
  )
}

export default DetailValue
