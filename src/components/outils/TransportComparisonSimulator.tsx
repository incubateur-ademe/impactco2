'use client'

import { useTranslations } from 'next-intl'
import React from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { ComputedEquivalent } from 'types/equivalent'
import Button from 'components/base/buttons/Button'
import MagicWandIcon from 'components/base/icons/magic-wand'
import TransportComparisonEquivalent from './TransportComparisonEquivalent'
import styles from './TransportComparisonSimulator.module.css'

const comparisons = [
  ['voiturethermique', 'tgv'],
  ['voitureelectrique', 'metro'],
  ['tgv', 'avion-courtcourrier'],
  ['voiturethermique', 'voiturethermique+1'],
  ['moto', 'ter'],
  ['velo', 'scooter'],
  ['autocar', 'voitureelectrique'],
  ['avion-courtcourrier', 'autocar'],
  ['velo', 'voiturethermique'],
  ['voitureelectrique+2', 'moto'],
  ['busthermique', 'voiturethermique'],
  ['voiturethermique', 'ter'],
]

const getRandomComparison = (equivalents: ComputedEquivalent[]) => {
  const availableComparisons = comparisons.filter((comparison) => {
    const [slug1] = comparison[0].split('+')
    const [slug2] = comparison[1].split('+')

    return (
      equivalents.find((equivalent) => equivalent.slug === slug1) &&
      equivalents.find((equivalent) => equivalent.slug === slug2)
    )
  })
  return availableComparisons[Math.floor(Math.random() * availableComparisons.length)]
}

const TransportComparisonSimulator = ({ equivalents }: { equivalents: ComputedEquivalent[] }) => {
  const t = useTranslations('transport')
  const {
    transport: { comparison, setComparison },
  } = useParamContext()

  return (
    <div className={styles.container}>
      {comparisons && (
        <div className={styles.comparisons}>
          <div className={styles.comparison}>
            <TransportComparisonEquivalent index={0} equivalents={equivalents} />
          </div>
          <div className={styles.vs}>VS</div>
          <div className={styles.comparison}>
            <TransportComparisonEquivalent index={1} equivalents={equivalents} />
          </div>
        </div>
      )}
      <Button
        className={styles.button}
        onClick={() => {
          let newComparison = getRandomComparison(equivalents)
          while (newComparison[0] === comparison[0] && newComparison[1] === comparison[1]) {
            newComparison = getRandomComparison(equivalents)
          }
          setComparison(newComparison)
        }}>
        <MagicWandIcon />
        {t('otherComparison')}
      </Button>
      <div className={styles.noBorder} />
    </div>
  )
}

export default TransportComparisonSimulator
