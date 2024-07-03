import { useTranslations } from 'next-intl'
import React from 'react'
import { ComputedEquivalent } from 'types/equivalent'
import Button from 'components/base/buttons/Button'
import MagicWandIcon from 'components/base/icons/magic-wand'
import styles from './TransportComparisonSimulator.module.css'

const TransportComparisonSimulator = ({ equivalents }: { equivalents: ComputedEquivalent[] }) => {
  const t = useTranslations('transport')
  return (
    <div className={styles.container}>
      todo
      <Button>
        <MagicWandIcon />
        {t('otherComparison')}
      </Button>
    </div>
  )
}

export default TransportComparisonSimulator
