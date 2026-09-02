'use client'

import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import { ReactNode, useState } from 'react'
import DropdownArrowDownIcon from 'src/components/base/icons/dropdown-arrow-down'
import DropdownArrowUpIcon from 'src/components/base/icons/dropdown-arrow-up'
import styles from './TransportIntegrateAdvanced.module.css'

const TransportIntegrateAdvanced = ({ children }: { children?: ReactNode }) => {
  const t = useTranslations('overscreen.transport')

  const [open, setOpen] = useState(false)

  return (
    <div className={classNames(styles.advancedContainer, { [styles.open]: open })}>
      <button
        type='button'
        className={styles.advancedButton}
        aria-expanded={open}
        aria-controls='advanced-panel'
        onClick={() => setOpen((previous) => !previous)}>
        <span>{open ? t('advanced-open') : t('advanced')}</span>
        <span
          className={open ? `${styles.advancedIcon} ${styles.advancedIconOpen}` : styles.advancedIcon}
          aria-hidden='true'>
          {open ? <DropdownArrowUpIcon /> : <DropdownArrowDownIcon />}
        </span>
      </button>
      {open && (
        <div id='advanced-panel' className={styles.advancedContent}>
          {children}
        </div>
      )}
    </div>
  )
}

export default TransportIntegrateAdvanced
