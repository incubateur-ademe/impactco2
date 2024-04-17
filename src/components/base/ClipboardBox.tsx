'use client'

import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import { track } from 'utils/matomo'
import { Icon } from '../osezchanger/icons'
import styles from './ClipboardBox.module.css'

const ClipboardBox = ({ children, tracking }: { children: string; tracking: string }) => {
  const [copied, setCopied] = useState(false)
  const t = useTranslations('clipboard')
  return (
    <>
      <button
        className={styles.box}
        onClick={() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 500)
          navigator.clipboard.writeText(children)
          track(tracking, 'Copy', children)
        }}>
        <div className={styles.content} data-testid='clipboard-box'>
          {children}
        </div>
        <div className={classNames(styles.copy, { [styles.copied]: copied })}>
          {copied ? t('copie') : t('copier')}
          <Icon iconId={copied ? 'check' : 'copy'} />
        </div>
      </button>
      {children.startsWith('<script') && (
        <div className={styles.information}>
          <Icon iconId='information' />
          {t('information-1')}
          <br />
          {t('information-2')}
        </div>
      )}
    </>
  )
}

export default ClipboardBox
