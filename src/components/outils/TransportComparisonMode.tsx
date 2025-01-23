import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import { useTransportStore } from 'src/providers/stores/transport'
import { track } from 'utils/matomo'
import CheckIcon from 'components/base/icons/check'
import ComparisonIcon from 'components/base/icons/comparison'
import ListIcon from 'components/base/icons/list'
import styles from './TransportComparisonMode.module.css'

const TransportComparisonMode = ({ tracking }: { tracking: string }) => {
  const { comparisonMode, setComparisonMode } = useTransportStore()
  const t = useTranslations('transport.mode-selector')
  return (
    <div className={classNames(styles.container, { [styles.withBorder]: comparisonMode === 'list' })}>
      <div className={styles.text}>{t('comparisonMode')}</div>
      <div className={styles.modes}>
        <label className={styles.leftButton}>
          <input
            type='radio'
            name='comparison-mode'
            onClick={() => {
              setComparisonMode('list')
              track(tracking, 'Display list', 'display_list')
            }}
          />
          <span className={classNames(styles.leftLabel, { [styles.clickeable]: comparisonMode !== 'list' })}>
            <ListIcon />
            {t('list')}
            {comparisonMode === 'list' && <CheckIcon />}
          </span>
        </label>
        <label className={styles.rightButton}>
          <input
            type='radio'
            name='comparison-mode'
            onClick={() => {
              setComparisonMode('comparison')
              track(tracking, 'Display comparison', 'display_comparison')
            }}
          />
          <span className={classNames(styles.rightLabel, { [styles.clickeable]: comparisonMode !== 'comparison' })}>
            <ComparisonIcon />
            {t('comparison')}
            {comparisonMode === 'comparison' && <CheckIcon />}
          </span>
        </label>
      </div>
    </div>
  )
}

export default TransportComparisonMode
