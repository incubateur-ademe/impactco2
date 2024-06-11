import classNames from 'classnames'
import React, { ReactNode } from 'react'
import styles from './Card.module.css'

const Card = ({ children, className, colored }: { children: ReactNode; className?: string; colored?: boolean }) => {
  return (
    <div
      className={classNames(styles.card, className, {
        [styles.colored]: colored,
      })}>
      {children}
    </div>
  )
}

export default Card
