import { useTranslations } from 'next-intl'
import React from 'react'
import { track } from 'utils/matomo'
import GhostButton from 'components/base/GhostButton'
import { Buttons } from './Actions.styles'

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
    <Buttons>
      {!withoutShare && (
        <GhostButton
          data-testid='header-share-button'
          icon='send-plane'
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
          icon='code-s-slash'
          onClick={() => {
            onClick('integrer')
            track(tracking, 'Integrer', `${tracking.replace(/ /g, '_').toLowerCase()}_integrer`)
          }}>
          {t('integrate')}
        </GhostButton>
      )}
      <GhostButton
        icon='image'
        onClick={() => {
          onClick('telecharger')
        }}>
        {t('download')}
      </GhostButton>
    </Buttons>
  )
}

export default Actions
