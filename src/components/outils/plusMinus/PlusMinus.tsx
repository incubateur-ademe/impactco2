import classNames from 'classnames'
import Image from 'next/image'
import formatName from 'utils/formatName'
import MinusIcon from 'components/base/icons/minus'
import PlusIcon from 'components/base/icons/plus'
import styles from './PlusMinus.module.css'

const PlusMinus = ({
  value,
  setValue,
  min,
  max,
  label,
  smallLabel,
  hiddenLabel,
  icon,
  step,
  className,
}: {
  value: number
  setValue: (value: number) => void
  min?: number
  max?: number
  label: string
  smallLabel?: string
  hiddenLabel?: string
  icon?: string
  step?: number
  className?: string
}) => {
  const stepValue = step || 1
  return (
    <div className={classNames(styles.container, className)}>
      <button
        className={styles.minus}
        onClick={(e) => {
          e.preventDefault()
          setValue(value - stepValue)
        }}
        disabled={value === stepValue || (!!min && value === min)}
        title={`Diminuer le nombre de ${formatName(label, 1)}`}>
        <MinusIcon />
      </button>
      <div className={styles.main}>
        {icon && <Image src={icon} alt='' width={18} height={24} />}
        <p aria-live='polite' aria-atomic={false}>
          {value} <span className={smallLabel ? styles.bigLabel : ''}>{formatName(label, value)}</span>
          {smallLabel && <span className={styles.smallLabel}>{formatName(smallLabel, value)}</span>}
          {hiddenLabel && <span className='ico2-hidden'> {hiddenLabel}</span>}
        </p>
      </div>
      <button
        className={styles.plus}
        onClick={(e) => {
          e.preventDefault()
          setValue(value + stepValue)
        }}
        disabled={!!max && value === max}
        title={`Augmenter le nombre de ${formatName(label, 1)}`}>
        <PlusIcon />
      </button>
    </div>
  )
}

export default PlusMinus
