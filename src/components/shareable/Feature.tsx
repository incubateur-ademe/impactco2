'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { SetStateAction } from 'preact/compat'
import React, { Dispatch } from 'react'
import FullArrowRightIcon from 'components/base/icons/full-arrow-right'
import styles from './Feature.module.css'
import { OverScreenInfo } from './overScreens/Values'

const Feature = ({
  info,
  setOverScreen,
}: {
  info: OverScreenInfo
  setOverScreen: Dispatch<SetStateAction<OverScreenInfo | undefined>>
}) => {
  const t = useTranslations('overscreen')
  return (
    <button className={styles.button} onClick={() => setOverScreen(info)}>
      {info.image && (
        <div className={styles.left}>
          <div className={styles.image}>{<Image src={info.image} alt='' width={20} height={20} />}</div>
        </div>
      )}
      <div className={styles.right}>
        <div className={styles.text}>{t(info.title)}</div>
        <FullArrowRightIcon />
      </div>
    </button>
  )
}

export default Feature
