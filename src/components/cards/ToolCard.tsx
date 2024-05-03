import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
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
    <Link
      href={link || `/outils/${slug}`}
      className={classNames(styles.card, {
        [styles.horizontalCard]: horizontal,
      })}>
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
    </Link>
  )
}

export default ToolCard
