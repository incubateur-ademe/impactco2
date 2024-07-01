'use client'

import { useTranslations } from 'next-intl'
import React from 'react'
import { track } from 'utils/matomo'
import GhostButton from 'components/base/GhostButton'
import CodeSSlashIcon from 'components/base/icons/code-s-slash'
import ImageIcon from 'components/base/icons/image'
import SendPlaneIcon from 'components/base/icons/send-plane'
import styles from './Actions.module.css'

const Actions = ({
  onClick,
  tracking,
  withoutIntegration,
  withoutShare,
}: {
  onClick: (value: 'partager' | 'integrer' | 'telecharger') => void
  tracking: string
  withoutIntegration?: boolean
  withoutShare?: boolean
}) => {
  const t = useTranslations('overscreen')
  return (
    <div className={styles.buttons}>
      {!withoutShare && (
        <GhostButton
          data-testid='header-share-button'
          icon={<SendPlaneIcon />}
          onClick={() => {
            onClick('partager')
            track(tracking, 'Partager', `${tracking.replace(/ /g, '_').toLowerCase()}_partager`)
          }}>
          {t('share')}
        </GhostButton>
      )}
      {!withoutIntegration && (
        <GhostButton
          data-testid='header-integrate-button'
          icon={<CodeSSlashIcon />}
          onClick={() => {
            onClick('integrer')
            track(tracking, 'Integrer', `${tracking.replace(/ /g, '_').toLowerCase()}_integrer`)
          }}>
          {t('integrate')}
        </GhostButton>
      )}
      <GhostButton
        icon={<ImageIcon />}
        onClick={() => {
          onClick('telecharger')
        }}>
        {t('download')}
      </GhostButton>
    </div>
  )
}

export default Actions
