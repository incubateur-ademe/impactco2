import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import React from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { track } from 'utils/matomo'
import ComparisonIcon from 'components/base/icons/comparison'
import ListIcon from 'components/base/icons/list'
import styles from './TransportComparisonMode.module.css'

const TransportComparisonMode = ({ tracking }: { tracking: string }) => {
  const {
    transport: { comparisonMode, setComparisonMode },
  } = useParamContext()
  const t = useTranslations('transport.mode-selector')
  return (
    <div className={classNames(styles.container, { [styles.withBorder]: comparisonMode === 'list' })}>
      <div className={styles.text}>{t('comparisonMode')}</div>
      <div className={styles.modes}>
        <button
          onClick={() => {
            setComparisonMode('list')
            track(tracking, 'Display list', 'display_list')
          }}
          tabIndex={comparisonMode === 'list' ? -1 : undefined}
          className={classNames(styles.leftButton, { [styles.clickeable]: comparisonMode !== 'list' })}>
          <ListIcon />
          {t('list')}
        </button>
        <button
          onClick={() => {
            setComparisonMode('comparison')
            track(tracking, 'Display comparison', 'display_comparison')
          }}
          tabIndex={comparisonMode === 'comparison' ? -1 : undefined}
          className={classNames(styles.rightButton, { [styles.clickeable]: comparisonMode !== 'comparison' })}>
          <ComparisonIcon />
          {t('comparison')}
        </button>
      </div>
    </div>
  )
}

export default TransportComparisonMode
