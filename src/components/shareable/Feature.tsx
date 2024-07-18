'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { track } from 'utils/matomo'
import FullArrowRightIcon from 'components/base/icons/full-arrow-right'
import styles from './Feature.module.css'
import { OverScreenInfo } from './overScreens/Values'

const Feature = ({
  info,
  type,
  slug,
  tracking,
  name,
}: {
  info: OverScreenInfo
  tracking: string
  name: string
  slug: string
  type: string
}) => {
  const { setOverscreen, overscreen } = useParamContext()
  const t = useTranslations('overscreen')
  return (
    <button
      className={styles.button}
      onClick={() => {
        track(tracking, name, `${tracking}_${name}`.replace(/ /g, '_').toLowerCase())
        setOverscreen({ ...overscreen, [slug]: type })
      }}>
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
