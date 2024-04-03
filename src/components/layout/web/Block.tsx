import classNames from 'classnames'
import React, { ReactNode } from 'react'
import Link from 'components/base/buttons/Link'
import styles from './Block.module.css'

const Block = ({
  children,
  title,
  description,
  link,
  linkLabel,
}: {
  children: ReactNode
  title?: string
  description?: string
  link?: string
  linkLabel?: string
}) => {
  return (
    <div className={classNames('main-container', styles.block)}>
      {title && (
        <div className={styles.header}>
          <div>
            {title && <h2>{title}</h2>}
            {description && <div className={styles.description}>{description}</div>}
          </div>
          {link && <Link href={link}>{linkLabel}</Link>}
        </div>
      )}
      {children}
    </div>
  )
}

export default Block
