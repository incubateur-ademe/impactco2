'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import useParamContext from 'src/providers/ParamProvider'
import useTrackingContext from 'src/providers/TrackingProvider'
import { OverScreenInfo } from 'types/overscreen'
import { track } from 'utils/matomo'
import FullArrowRightIcon from 'components/base/icons/full-arrow-right'
import styles from './Feature.module.css'

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
  const { setOverscreen } = useParamContext()
  const { trackOnce } = useTrackingContext()
  const t = useTranslations('overscreen')
  return (
    <button
      className={styles.button}
      onClick={() => {
        track(tracking, name, `${tracking}_${name}`.replace(/ /g, '_').toLowerCase())
        trackOnce(name)
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
