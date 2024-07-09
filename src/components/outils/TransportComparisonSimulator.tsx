'use client'

import { useTranslations } from 'next-intl'
import React, { useEffect, useState } from 'react'
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

  const [generation, setGeneration] = useState<number | boolean>(false)

  useEffect(() => {
    if (typeof generation === 'number' && generation) {
      setTimeout(
        () =>
          setGeneration((value) => {
            if (typeof value === 'number') {
              return value < 2 ? value + 1 : false
            }
            return value
          }),
        250
      )
    }
  }, [generation])

  return (
    <div className={styles.container}>
      {comparisons && (
        <div className={styles.comparisons}>
          <div className={generation === 0 ? styles.disapearingTile : styles.tile}>
            <div className={styles.comparison}>
              <TransportComparisonEquivalent index={0} equivalents={equivalents} />
            </div>
          </div>
          <div className={styles.vs}>VS</div>
          <div className={generation === 0 || generation === 1 ? styles.disapearingTile : styles.tile}>
            <div className={styles.comparison}>
              <TransportComparisonEquivalent index={1} equivalents={equivalents} />
            </div>
          </div>
        </div>
      )}
      <Button
        className={styles.button}
        onClick={() => {
          setGeneration(0)
          setTimeout(() => {
            let newComparison = getRandomComparison(equivalents)
            while (newComparison[0] === comparison[0] && newComparison[1] === comparison[1]) {
              newComparison = getRandomComparison(equivalents)
            }
            setComparison(newComparison)
            setTimeout(() => setGeneration(1), 100)
          }, 200)
        }}>
        <MagicWandIcon />
        {t('otherComparison')}
      </Button>
      <div className={styles.noBorder} />
    </div>
  )
}

export default TransportComparisonSimulator
