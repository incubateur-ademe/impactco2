'use client'

import { useTranslations } from 'next-intl'
import React, { useEffect, useMemo, useState } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { ComputedEquivalent } from 'types/equivalent'
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
  const {
    transport: { setComparison, comparison, modes },
  } = useParamContext()

  const [generation, setGeneration] = useState<number | boolean>(false)
  const [index, setIndex] = useState<number | boolean>(false)

  const availableComparisons = useMemo(() => {
    const allComparisons = comparisons.filter((comparison) => {
      const [slug1, carpool1] = comparison[0].split('+')
      const [slug2, carpool2] = comparison[1].split('+')

      return (
        equivalents.find(
          (equivalent) =>
            (!carpool1 || equivalent.carpool) &&
            (slug1 === 'avion' ? equivalent.slug.startsWith('avion') : equivalent.slug === slug1)
        ) &&
        equivalents.find(
          (equivalent) =>
            (!carpool2 || equivalent.carpool) &&
            (slug2 === 'avion' ? equivalent.slug.startsWith('avion') : equivalent.slug === slug2)
        )
      )
    })

    if (!allComparisons.find(([slug1, slug2]) => slug1 === comparison[0] && slug2 === comparison[1])) {
      setIndex(false)
    }

    return allComparisons
  }, [equivalents, comparison])

  useEffect(() => {}, [])

  useEffect(() => {
    if (typeof index === 'number') {
      if (availableComparisons.length > 0) {
        setComparison(availableComparisons[index % availableComparisons.length])
      } else {
        setComparison(comparisons[index % comparisons.length])
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
                canChange={modes.length > 2}
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
                canChange={modes.length > 2}
              />
            </div>
          </div>
        </div>
      )}
      {availableComparisons.length !== 1 && (
        <Button
          className={styles.button}
          onClick={() => {
            track(tracking, 'Autre comparaison', index.toString())
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
