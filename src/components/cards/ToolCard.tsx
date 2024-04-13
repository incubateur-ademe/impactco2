import classNames from 'classnames'
import Image from 'next/image'
import React from 'react'
import { Icon } from 'components/osezchanger/icons'
import styles from './ToolCard.module.css'

const ToolCard = ({
  slug,
  title,
  description,
  linkLabel,
  horizontal,
}: {
  slug: string
  title: string
  description: string
  linkLabel: string
  horizontal?: boolean
}) => {
  return (
    <a
      href={`/${slug}`}
      className={classNames(styles.card, {
        [styles.horizontalCard]: horizontal,
      })}>
      <Image src={`/images/tools-${slug}.svg`} width={220} height={180} alt='' />
      <div className={styles.content}>
        <div>
          <div className={styles.title}>{title}</div>
          <div>{description}</div>
        </div>
        <div className={styles.link}>
          {linkLabel}
          <div className={styles.arrow}>
            <Icon iconId='full-arrow-right' />
          </div>
        </div>
      </div>
    </a>
  )
}

export default ToolCard
