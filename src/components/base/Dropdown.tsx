'use client'

import classNames from 'classnames'
import { ReactNode, useState } from 'react'
import PlusIcon from 'components/base/icons/plus'
import MinusIcon from './icons/minus'
import styles from './Dropdown.module.css'

const Dropdown = ({
  children,
  title,
  onClick,
  className,
  small,
}: {
  children: ReactNode
  title: string
  onClick?: (display: boolean) => void
  className?: string
  small?: boolean
}) => {
  const [display, setDisplay] = useState(false)

  return (
    <li className={classNames(styles.faq, className, { [styles.smallFaq]: small })}>
      <button
        className={classNames(styles.title, { [styles.smallTitle]: small })}
        aria-expanded={display}
        aria-controls={`dropdown-${title}-content`}
        onClick={() => {
          if (onClick) {
            onClick(display)
          }
          setDisplay(!display)
        }}>
        <h3>{title}</h3>
        <span
          className={classNames(styles.button, { [styles.openButton]: display, [styles.smallButton]: small })}
          aria-hidden='true'>
          {small && display ? <MinusIcon /> : <PlusIcon />}
        </span>
      </button>
      {display && (
        <div className={styles.content} id={`dropdown-${title}-content`}>
          {children}
        </div>
      )}
    </li>
  )
}

export default Dropdown
