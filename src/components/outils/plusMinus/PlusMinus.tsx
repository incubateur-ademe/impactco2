import classNames from 'classnames'
import Image from 'next/image'
import { SetStateAction } from 'preact/compat'
import React, { Dispatch } from 'react'
import formatName from 'utils/formatName'
import InformationIcon from 'components/base/icons/information'
import MinusIcon from 'components/base/icons/minus'
import PlusIcon from 'components/base/icons/plus'
import styles from './PlusMinus.module.css'

const PlusMinus = ({
  value,
  setValue,
  max,
  label,
  icon,
  step,
  onClick,
  className,
}: {
  value: number
  setValue: Dispatch<SetStateAction<number>>
  max?: number
  label: string
  icon?: string
  step?: number
  onClick?: () => void
  className?: string
}) => {
  const stepValue = step || 1
  return (
    <div className={classNames(styles.container, className)}>
      <button
        className={styles.minus}
        onClick={() => setValue(value - stepValue)}
        disabled={value === stepValue}
        title={`Diminuer le nombre de ${label}`}>
        <MinusIcon />
      </button>
      <button className={styles.mainButton} onClick={onClick} disabled={!onClick}>
        {icon && <Image src={icon} alt='' width={18} height={24} />}
        {value} {formatName(label, value)}
        {onClick && <InformationIcon />}
      </button>
      <button
        className={styles.plus}
        onClick={() => setValue(value + stepValue)}
        disabled={!!max && value === max}
        title={`Augmenter le nombre de ${label}`}>
        <PlusIcon />
      </button>
    </div>
  )
}

export default PlusMinus
