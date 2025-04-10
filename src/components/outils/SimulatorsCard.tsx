'use client'

import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'
import { track } from 'utils/matomo'
import FullArrowDownIcon from 'components/base/icons/full-arrow-down'
import toolStyles from '../cards/ToolCard.module.css'
import styles from './SimulatorsCard.module.css'

const SimulatorsCard = ({
  tracking,
  title,
  description,
  linkLabel,
  link,
  image,
}: {
  image: string
  title: string
  description: ReactNode
  linkLabel: string
  link: string
  tracking: string
}) => {
  return (
    <li className={styles.container}>
      <Link
        href={link}
        className={classNames(toolStyles.card, styles.card)}
        onClick={() => {
          track(tracking, 'Ancre', link)
        }}>
        <div className={classNames(toolStyles.content, styles.content)}>
          <div>
            <div className={styles.title}>
              <Image src={image} width={40} height={40} alt='' />
              <p>{title}</p>
            </div>
            <p className={styles.description}>{description}</p>
          </div>
          <div className={toolStyles.link}>
            {linkLabel}
            <FullArrowDownIcon />
          </div>
        </div>
      </Link>
    </li>
  )
}

export default SimulatorsCard
