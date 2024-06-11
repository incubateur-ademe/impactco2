import React from 'react'
import styles from './Percentage.module.css'

const Percentage = ({ value }: { value: number }) => {
  return (
    <div className={styles.container}>
      {value.toFixed(0)}%
      <div className={styles.bar}>
        <div className={styles.bar1} style={{ width: `${value}%` }} />
        <div className={styles.bar2} style={{ width: `${100 - value}%` }} />
      </div>
    </div>
  )
}

export default Percentage
