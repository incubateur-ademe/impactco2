'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { track } from 'utils/matomo'
import CheckRoundIcon from 'components/base/icons/check-round'
import CopyIcon from 'components/base/icons/copy'
import InformationIcon from 'components/base/icons/information'
import IntegratePreview from '../shareable/overScreens/IntegratePreview'
import Button from './buttons/Button'
import styles from './TransportClipboardBox.module.css'

const TransportClipboardBox = ({
  children,
  tracking,
  form,
  path,
  urlParams,
}: {
  children: string
  tracking: string
  form?: string
  path: string
  urlParams: string
}) => {
  const [copied, setCopied] = useState(false)
  const t = useTranslations('clipboard')
  const Result = form ? 'output' : 'div'
  return (
    <>
      <div
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
        <div className={styles.buttons}>
          <IntegratePreview path={path} urlParams={urlParams} secondary />
          <Button className={styles.copy}>
            {copied ? t('copie') : t('copier')}
            {copied ? <CheckRoundIcon /> : <CopyIcon />}
          </Button>
        </div>
      </div>
      {children.startsWith('<script') && (
        <p className={styles.information}>
          <InformationIcon />
          {t('information-1')}
          <br />
          {t('information-2')}
        </p>
      )}
    </>
  )
}

export default TransportClipboardBox
