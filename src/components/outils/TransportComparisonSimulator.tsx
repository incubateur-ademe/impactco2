'use client'

import { useTranslations } from 'next-intl'
import React, { useEffect, useMemo, useState } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { ComputedEquivalent } from 'types/equivalent'
import Button from 'components/base/buttons/Button'
import MagicWandIcon from 'components/base/icons/magic-wand'
import TransportComparisonEquivalent from './TransportComparisonEquivalent'
import styles from './TransportComparisonSimulator.module.css'

const comparisons = [
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

const TransportComparisonSimulator = ({ equivalents }: { equivalents: ComputedEquivalent[] }) => {
  const t = useTranslations('transport')
  const {
    transport: { setComparison },
  } = useParamContext()

  const [generation, setGeneration] = useState<number | boolean>(false)
  const [index, setIndex] = useState(0)

  const availableComparisons = useMemo(
    () =>
      comparisons.filter((comparison) => {
        const [slug1] = comparison[0].split('+')
        const [slug2] = comparison[1].split('+')

        return (
          equivalents.find((equivalent) =>
            slug1 === 'avion' ? equivalent.slug.startsWith('avion') : equivalent.slug === slug1
          ) &&
          equivalents.find((equivalent) =>
            slug2 === 'avion' ? equivalent.slug.startsWith('avion') : equivalent.slug === slug2
          )
        )
      }),
    [equivalents]
  )
  useEffect(() => {
    setComparison(availableComparisons[index % availableComparisons.length])
  }, [index])

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
            setIndex(index + 1)
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
