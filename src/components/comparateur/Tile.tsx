'use client'

import { useTranslations } from 'next-intl'
import React, { useMemo } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { computedEquivalents } from 'src/providers/equivalents'
import { getName } from 'utils/Equivalent/equivalent'
import formatNumber from 'utils/formatNumber'
import { track } from 'utils/matomo'
import EquivalentIcon from 'components/base/EquivalentIcon'
import LocalNumber from 'components/base/LocalNumber'
import buttonStyles from 'components/base/buttons/Button.module.css'
import ArrowUpIcon from 'components/base/icons/arrow-up'
import CloseIcon from 'components/base/icons/close'
import InfinityIcon from 'components/base/icons/infinity'
import PlusIcon from 'components/base/icons/plus'
import styles from './Tile.module.css'

const Tile = ({ slug, onAdd }: { slug?: string; onAdd?: () => void }) => {
  const t = useTranslations('comparateur')
  const {
    language,
    comparateur: { baseValue, weight, setEquivalents, equivalents, setComparedEquivalent },
  } = useParamContext()

  const equivalent = useMemo(() => {
    if (slug) {
      const [ref, carpool] = slug.split('+')
      const computedEquivalent = computedEquivalents.find((e) => e.slug === ref)
      return carpool && computedEquivalent
        ? {
            ...computedEquivalent,
            slug,
            link: `${computedEquivalent.link}+${carpool}`,
            carpool: Number(carpool),
            value: computedEquivalent.value / (Number(carpool) + 1),
          }
        : computedEquivalent
    }
    return null
  }, [slug])
  const value = equivalent ? (baseValue * weight * (equivalent.percentage ? 100 : 1)) / equivalent.value : 0

  if (slug && !equivalent) {
    return null
  }

  return equivalent ? (
    <div className={styles.tile}>
      <button
        data-testid='comparateur-tile-close'
        className={styles.close}
        title={`Supprimer la comparaison avec ${getName('fr', equivalent)}`}
        onClick={() => setEquivalents(equivalents.filter((e) => e !== equivalent.slug))}>
        <CloseIcon />
      </button>
      <div>
        <EquivalentIcon height={3} equivalent={equivalent} />
        <p className={styles.text}>
          <span className={styles.value} data-testid={`comparateur-${slug}-value`}>
            {Number.isFinite(value) ? <LocalNumber number={formatNumber(value)} /> : <InfinityIcon />}
          </span>
          <span className='text-sm' data-testid={`comparateur-${slug}-name`}>
            {getName(language, equivalent, true, value, true)}
          </span>
        </p>
      </div>
      <button
        className={buttonStyles.roundButton}
        title={`Comparer les valeurs avec ${getName('fr', equivalent)}`}
        onClick={() => {
          track('Comparateur', 'Comparer', equivalent.slug)
          setComparedEquivalent(equivalent)
        }}>
        <ArrowUpIcon />
      </button>
    </div>
  ) : (
    <button
      className={styles.emptyTile}
      onClick={() => {
        track('Comparateur', 'Ajouter un équivalent', 'add_equivalent')
        if (onAdd) {
          onAdd()
        }
      }}>
      <PlusIcon />
      {t('add')}
    </button>
  )
}

export default Tile
