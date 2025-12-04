import formatNumber from 'utils/formatNumber'
import LocalNumber from 'components/base/LocalNumber'
import styles from './Detail.module.css'

const DetailValue = ({ value, unit }: { value: number; unit: string }) => {
  return (
    <>
      <span>
        <LocalNumber number={formatNumber(value * (unit === 'g' ? 1000 : 1))} /> {unit}
      </span>{' '}
      <span className={styles.unit}>CO₂e</span>
    </>
  )
}

export default DetailValue
