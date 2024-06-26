'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'
import { track } from 'utils/matomo'
import IframeableLink from './IframeableLink'
import NewTabIcon from './NewTabIcon'
import styles from './Resource.module.css'

const Resource = ({
  image,
  text,
  href,
  tracking,
  withLink,
  imgSize,
}: {
  image: string
  text: string
  href: string
  tracking: string
  withLink?: string
  imgSize?: string
}) => {
  const t = useTranslations('ressources')
  return (
    <IframeableLink
      className={styles.linkContainer}
      href={href}
      target='_blank'
      rel='noreferrer noopener'
      onClick={() => {
        track(tracking, `Ressource-${href}`, `${tracking.toLowerCase()}_ressource_${href}`)
      }}>
      <div className={styles.image}>
        <Image
          src={image}
          alt=''
          width={100}
          height={86}
          style={{ width: imgSize || 'auto', height: imgSize || '100%' }}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.text}>{t(text)}</div>
        {withLink && (
          <div className={styles.fakeLink}>
            <span className='text-sm'>{withLink}</span>
            <NewTabIcon />
          </div>
        )}
      </div>
    </IframeableLink>
  )
}

export default Resource
