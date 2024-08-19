'use client'

import classNames from 'classnames'
import Image from 'next/image'
import React from 'react'
import { track } from 'utils/matomo'
import IframeableLink from 'components/base/IframeableLink'
import FullArrowRightIcon from 'components/base/icons/full-arrow-right'
import styles from './ToolCard.module.css'

export type ToolCardProps = {
  slug: string
  title: string
  description: string
  linkLabel: string
  horizontal?: boolean
  link?: string
  image?: string
}

const ToolCard = ({ slug, title, description, linkLabel, horizontal, link, image }: ToolCardProps) => {
  return (
    <IframeableLink
      href={link || `/outils/${slug}`}
      target={link && link.startsWith('http://') ? '_blank' : undefined}
      rel={link && link.startsWith('http://') ? 'noreferrer noopener' : undefined}
      className={classNames(styles.card, {
        [styles.horizontalCard]: horizontal,
      })}
      onClick={() => {
        track('Outils', link || `/outils/${slug}`, 'click')
      }}
      aria-label={title}>
      <Image src={image || `/images/tools-${slug}.svg`} width={220} height={180} alt='' />
      <div className={styles.content}>
        <div>
          <div className={styles.title}>{title}</div>
          <div>{description}</div>
        </div>
        <div className={styles.link}>
          {linkLabel}
          <FullArrowRightIcon />
        </div>
      </div>
    </IframeableLink>
  )
}

export default ToolCard
