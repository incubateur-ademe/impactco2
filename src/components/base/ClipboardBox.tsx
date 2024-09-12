'use client'

import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import { track } from 'utils/matomo'
import CheckIcon from 'components/base/icons/check'
import CopyIcon from 'components/base/icons/copy'
import InformationIcon from 'components/base/icons/information'
import styles from './ClipboardBox.module.css'

const ClipboardBox = ({ children, tracking, form }: { children: string; tracking: string; form?: string }) => {
  const [copied, setCopied] = useState(false)
  const t = useTranslations('clipboard')
  const Result = form ? 'output' : 'div'
  return (
    <>
      <button
        className={styles.box}
        onClick={() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 500)
          navigator.clipboard.writeText(children)
          track(tracking, 'Copy', children)
        }}
        aria-label="Copier le code d'integration">
        <Result className={styles.content} data-testid='clipboard-box' form={form}>
          <code>{children}</code>
        </Result>
        <span className={classNames(styles.copy, { [styles.copied]: copied })}>
          {copied ? t('copie') : t('copier')}
          {copied ? <CheckIcon /> : <CopyIcon />}
        </span>
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
