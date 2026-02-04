'use client'

import classNames from 'classnames'
import { ReactNode, useEffect, useRef, useState } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import PlusIcon from 'components/base/icons/plus'
import MinusIcon from './icons/minus'
import styles from './Dropdown.module.css'

const Dropdown = ({
  children,
  title,
  onClick,
  className,
  anchor,
}: {
  children?: ReactNode
  title: string
  onClick?: (display: boolean) => void
  className?: string
  anchor?: string
}) => {
  const ref = useRef<HTMLLIElement>(null)
  const [display, setDisplay] = useState(false)
  const { faqAnchor, setFaqAnchor } = useParamContext()

  useEffect(() => {
    if (anchor && faqAnchor === anchor) {
      if (onClick) {
        onClick(true)
      }
      setDisplay(true)
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setFaqAnchor(undefined)
    }
  }, [anchor, faqAnchor, setFaqAnchor, onClick])

  return (
    <li className={classNames(styles.faq, className)} ref={ref}>
      <button
        className={classNames(styles.title)}
        aria-expanded={display}
        aria-controls={`dropdown-${title}-content`}
        onClick={() => {
          if (onClick) {
            onClick(!display)
          }
          setDisplay(!display)
        }}>
        <h3>{title}</h3>
        <span className={classNames(styles.button, styles.openButton)} aria-hidden='true'>
          {display ? <MinusIcon /> : <PlusIcon />}
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
