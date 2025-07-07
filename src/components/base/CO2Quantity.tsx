import { getNumberPrecision } from 'utils/formatNumberPrecision'
import LocalNumber from './LocalNumber'
import styles from './CO2Quantity.module.css'

export const getUnit = (value: number, unit: string, language: string) => {
  if (unit === 'mt') {
    if (language === 'en') {
      return value >= 2 ? 'Millions t' : 'Million t'
    }
    if (language === 'es') {
      return value >= 2 ? 'Millones t' : 'Millón t'
    }
    return value >= 2 ? 'Millions de t' : 'Million de t'
  }
  return unit
}

const CO2Quantity = ({
  quantity,
  className,
  valueClassName,
  secondary,
  language,
  'data-testid': dataTestId,
}: {
  quantity: number
  className?: string
  valueClassName?: string
  secondary?: boolean
  language: string
  ['data-testid']?: string
}) => {
  const { value, unit } = getNumberPrecision(quantity)

  return (
    <p className={className} data-testid={dataTestId}>
      <span className={valueClassName}>
        <LocalNumber number={value} />
      </span>{' '}
      <span className={styles[`${unit}Unit${secondary ? 'Secondary' : ''}`]}>
        {getUnit(value, unit, language)} CO₂e
      </span>
    </p>
  )
}

export default CO2Quantity
