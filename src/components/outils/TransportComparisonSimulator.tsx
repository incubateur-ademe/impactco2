'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useMemo, useState } from 'react'
import { useTransportStore } from 'src/providers/stores/transport'
import { ComputedEquivalent } from 'types/equivalent'
import { isEquivalentInMode } from 'utils/Equivalent/equivalent'
import { track } from 'utils/matomo'
import Button from 'components/base/buttons/Button'
import MagicWandIcon from 'components/base/icons/magic-wand'
import TransportComparisonEquivalent from './TransportComparisonEquivalent'
import styles from './TransportComparisonSimulator.module.css'

export const comparisons = [
  ['voiturethermique', 'tgv'],
  ['voitureelectrique', 'metro'],
  ['tgv', 'avion'],
  ['voiturethermique', 'voiturethermique+1'],
  ['moto', 'ter'],
  ['veloelectrique', 'scooter'],
  ['autocar', 'voitureelectrique'],
  ['avion', 'autocar'],
  ['veloelectrique', 'voiturethermique'],
  ['voitureelectrique+2', 'moto'],
  ['busthermique', 'voiturethermique'],
  ['voiturethermique', 'ter'],
]

const TransportComparisonSimulator = ({
  tracking,
  equivalents,
}: {
  tracking: string
  equivalents: ComputedEquivalent[]
}) => {
  const t = useTranslations('transport')
  const { setComparison, comparison, modes } = useTransportStore()

  const [generation, setGeneration] = useState<number | boolean>(false)
  const [index, setIndex] = useState<number | boolean>(false)

  const availableComparisons = useMemo(() => {
    const allComparisons = comparisons.filter((comparison) => {
      const [slug1, carpool1] = comparison[0].split('+')
      const [slug2, carpool2] = comparison[1].split('+')

      return (
        equivalents.find(
          (equivalent) => (equivalent.carpool ? carpool1 : !carpool1) && isEquivalentInMode(equivalent, slug1)
        ) &&
        equivalents.find(
          (equivalent) => (equivalent.carpool ? carpool2 : !carpool2) && isEquivalentInMode(equivalent, slug2)
        )
      )
    })
    if (!allComparisons.find(([slug1, slug2]) => slug1 === comparison[0] && slug2 === comparison[1])) {
      setIndex(false)
    }

    return allComparisons
  }, [equivalents, comparison])

  useEffect(() => {
    if (typeof index === 'number') {
      if (availableComparisons.length > 0) {
        const newComparison = availableComparisons[index % availableComparisons.length]
        track(tracking, 'Autre comparaison', newComparison.join())

        setComparison(newComparison)
      }
    }
  }, [index, availableComparisons])

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

  const canChange = modes.length > 2 || modes.some((mode) => mode.includes('+'))

  return (
    <div className={styles.container}>
      {comparisons && (
        <div className={styles.comparisons}>
          <div className={generation === 0 ? styles.disapearingTile : styles.tile}>
            <div className={styles.comparison}>
              <TransportComparisonEquivalent
                tracking={tracking}
                index={0}
                equivalents={equivalents}
                canChange={canChange}
              />
            </div>
          </div>
          <div className={styles.vs}>VS</div>
          <div className={generation === 0 || generation === 1 ? styles.disapearingTile : styles.tile}>
            <div className={styles.comparison}>
              <TransportComparisonEquivalent
                tracking={tracking}
                index={1}
                equivalents={equivalents}
                canChange={canChange}
              />
            </div>
          </div>
        </div>
      )}
      {availableComparisons.length > 1 && (
        <Button
          className={styles.button}
          onClick={() => {
            setGeneration(0)
            setTimeout(() => {
              setIndex(typeof index === 'number' ? index + 1 : 1)
              setTimeout(() => setGeneration(1), 100)
            }, 200)
          }}>
          <MagicWandIcon />
          {t('otherComparison')}
        </Button>
      )}
      <div className={styles.noBorder} />
    </div>
  )
}

export default TransportComparisonSimulator
