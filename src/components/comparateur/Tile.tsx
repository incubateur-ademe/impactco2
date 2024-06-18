'use client'

import React, { useMemo } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { computedEquivalents } from 'src/providers/equivalents'
import formatName from 'utils/formatName'
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
  const {
    comparateur: { baseValue, weight, setEquivalents, equivalents, setComparedEquivalent },
  } = useParamContext()

  const equivalent = useMemo(() => (slug ? computedEquivalents.find((e) => e.slug === slug) : null), [slug])
  const value = equivalent ? (baseValue * weight * (equivalent.percentage ? 100 : 1)) / equivalent.value : 0

  return equivalent ? (
    <div className={styles.tile}>
      <button
        data-testid='comparateur-tile-close'
        className={styles.close}
        title={`Supprimer la comparaison avec ${equivalent.name}`}
        onClick={() => setEquivalents(equivalents.filter((e) => e !== equivalent.slug))}>
        <CloseIcon />
      </button>
      <div>
        <EquivalentIcon height={3} equivalent={equivalent} />
        <div className={styles.value} data-testid={`comparateur-${slug}-value`}>
          {Number.isFinite(value) ? <LocalNumber number={formatNumber(value)} /> : <InfinityIcon />}
        </div>
        <div className='text-sm' data-testid={`comparateur-${slug}-name`}>
          {formatName(
            (('prefix' in equivalent && equivalent.prefix) || '') +
              equivalent.name +
              (('suffix' in equivalent && equivalent.suffix) || ''),
            value
          )}
          {'subtitle' in equivalent && equivalent.subtitle && ` (${formatName(equivalent.subtitle, value)})`}
        </div>
      </div>
      <button
        className={buttonStyles.roundButton}
        title={`Comparer les valeurs avec ${formatName(equivalent.name, 1)}`}
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
      Ajouter un équivalent
    </button>
  )
}

export default Tile
