'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useGlobalStore } from 'src/providers/stores/global'
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
  const { setOverscreen } = useGlobalStore()
  const t = useTranslations('overscreen')
  return (
    <button
      className={styles.button}
      onClick={() => {
        track(tracking, name, `${tracking}_${name}`.replace(/ /g, '_').toLowerCase())
        setOverscreen(slug, type)
      }}>
      {info.image && (
        <span className={styles.left}>
          <span className={styles.image}>{<Image src={info.image} alt='' width={20} height={20} />}</span>
        </span>
      )}
      <span className={styles.right}>
        <span className={styles.text}>{t(info.title)}</span>
        <FullArrowRightIcon />
      </span>
    </button>
  )
}

export default Feature
