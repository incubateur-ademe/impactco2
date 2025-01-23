'use client'

import { useGlobalStore } from 'src/providers/stores/global'
import { ComputedEquivalent } from 'types/equivalent'
import { getName } from 'utils/Equivalent/equivalent'
import formatNumber from 'utils/formatNumber'
import EquivalentIcon from 'components/base/EquivalentIcon'
import LocalNumber from 'components/base/LocalNumber'
import styles from './SimpleEtiquette.module.css'

const SimpleEtiquette = ({ base, equivalent, max }: { base: number; max: number; equivalent: ComputedEquivalent }) => {
  const { language } = useGlobalStore()

  return (
    <div className={styles.container}>
      <div className={styles.emoji}>
        <EquivalentIcon height={3} equivalent={equivalent} alt={getName(language, equivalent)} />
      </div>
      <div>
        <p className={styles.text}>
          <span className={styles.value}>
            <LocalNumber number={formatNumber(base * equivalent.value)} />
          </span>
          <span className={styles.label}> kg CO₂e</span>
        </p>
        <div className={styles.bar} style={{ width: `${(100 * equivalent.value) / max}%` }} />
      </div>
    </div>
  )
}

export default SimpleEtiquette
