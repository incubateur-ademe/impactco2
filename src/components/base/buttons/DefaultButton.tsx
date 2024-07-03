'use client'

import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import FullStarIcon from '../icons/full-star'
import StarIcon from '../icons/star'
import styles from './DefaultButton.module.css'

const DefaultButton = ({ main, setMain, disabled }: { main: boolean; setMain: () => void; disabled: boolean }) => {
  const t = useTranslations('overscreen')
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={() => setMain()}
      tabIndex={main ? -1 : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={classNames(styles.defaultButton, { [styles.disabled]: disabled, [styles.clickable]: !main })}>
      {main || hovered ? <FullStarIcon /> : <StarIcon />}
      {t(`default-${main.toString()}`)}
    </button>
  )
}

export default DefaultButton
