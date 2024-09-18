'use client'

import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import FullStarIcon from '../icons/full-star'
import StarIcon from '../icons/star'
import styles from './DefaultButton.module.css'

const DefaultButton = ({
  main,
  setMain,
  disabled,
  name,
}: {
  main: boolean
  setMain: () => void
  disabled: boolean
  name: string
}) => {
  const t = useTranslations('overscreen')
  const [hovered, setHovered] = useState(false)
  return (
    <label
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={styles.defaultButton}>
      <input type='radio' name={name} onClick={() => setMain()} disabled={disabled} />
      <span className={classNames(styles.label, { [styles.clickable]: !main })}>
        {main || hovered ? <FullStarIcon /> : <StarIcon />}
        {t(`default-${main.toString()}`)}
      </span>
    </label>
  )
}

export default DefaultButton
