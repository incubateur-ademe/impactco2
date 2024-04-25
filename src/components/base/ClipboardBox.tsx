'use client'

import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import { track } from 'utils/matomo'
import CheckIcon from 'components/osezchanger/icons/check'
import CopyIcon from 'components/osezchanger/icons/copy'
import InformationIcon from 'components/osezchanger/icons/information'
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
          {copied ? <CheckIcon /> : <CopyIcon />}
        </div>
      </button>
      {children.startsWith('<script') && (
        <div className={styles.information}>
          <InformationIcon />
          {t('information-1')}
          <br />
          {t('information-2')}
        </div>
      )}
    </>
  )
}

export default ClipboardBox
