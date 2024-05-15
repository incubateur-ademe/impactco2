import classNames from 'classnames'
import React, { ReactNode } from 'react'
import Link from 'components/base/buttons/Link'
import styles from './Block.module.css'

const getTitle = (title?: string, as?: 'h1') => {
  if (!title) {
    return null
  }
  if (as === 'h1') {
    return <h1>{title}</h1>
  }
  return <h2>{title}</h2>
}

export type BlockProps = {
  children?: ReactNode
  title?: string
  description?: string
  link?: string
  linkLabel?: string
  as?: 'h1'
  id?: string
}

const Block = ({ children, title, description, link, linkLabel, as, id }: BlockProps) => {
  return (
    <div className={classNames('main-container', styles.block)} id={id}>
      {title && (
        <div className={styles.header}>
          <div>
            {getTitle(title, as)}
            {description && (
              <div className={classNames(styles.description, { [styles.mainDescription]: as === 'h1' })}>
                {description}
              </div>
            )}
          </div>
          {link && <Link href={link}>{linkLabel}</Link>}
        </div>
      )}
      {children && <div className={classNames(styles.children, { [styles.withMargin]: title })}>{children}</div>}
    </div>
  )
}

export default Block
