import Link from 'next/link'
import React from 'react'
import { ComputedEquivalent } from 'types/equivalent'
import formatName from 'utils/formatName'
import formatNumber from 'utils/formatNumber'
import formatUsage from 'utils/formatUsage'
import EquivalentIcon from 'components/base/EquivalentIcon'
import styles from './CategorySimulator.module.css'

const CategorySimulator = ({ equivalents }: { equivalents: ComputedEquivalent[] }) => {
  const max = Math.max.apply(null, equivalents?.map((equivalent) => equivalent.value) || [])
  const hasUsage = equivalents && equivalents.some((equivalent) => formatUsage(equivalent))

  return (
    <>
      <div>
        {equivalents &&
          equivalents
            .sort((a, b) => a.value - b.value)
            .map((equivalent) => (
              <Link href={equivalent.link} key={equivalent.slug} className={styles.equivalent}>
                <EquivalentIcon equivalent={equivalent} height={3} />
                <div className={styles.content}>
                  <div className={styles.name}>
                    {formatName(
                      `${equivalent.name}${equivalent.subtitle ? ` ${equivalent.subtitle.startsWith('(') || equivalent.subtitle.startsWith(' -') ? equivalent.subtitle : `(${equivalent.subtitle})`}` : ''}`,
                      1,
                      true
                    )}
                  </div>
                  <div className={styles.data}>
                    <div
                      className={styles.fullBar}
                      style={{ width: max ? `${(75 * equivalent.value) / max}%` : '0px' }}>
                      <div
                        className={styles.halfBar}
                        style={{ width: `${(100 * formatUsage(equivalent)) / equivalent.value}%` }}
                      />
                    </div>
                    <span className={styles.value}>{formatNumber(equivalent.value)}</span> kg CO₂e
                  </div>
                </div>
              </Link>
            ))}
      </div>
      {hasUsage && (
        <div className={styles.legend}>
          <div>
            <div className={styles.construction} />
            Construction
          </div>
          <div>
            <div className={styles.usage} />
            Usage
          </div>
        </div>
      )}
    </>
  )
}

export default CategorySimulator
