import styles from './Percentage.module.css'

const Percentage = ({ value }: { value: number }) => {
  return (
    <div className={styles.container}>
      {value.toFixed(0)}%
      <div className={styles.bar}>
        <div className={styles.plainBar} style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

export default Percentage
