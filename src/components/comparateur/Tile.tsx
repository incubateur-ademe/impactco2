import React, { useMemo } from 'react'
import formatName from 'utils/formatName'
import formatNumber from 'utils/formatNumber'
import { track } from 'utils/matomo'
import useParamContext from 'components/providers/ParamProvider'
import { computedEquivalents } from 'components/providers/equivalents'
import EquivalentIcon from 'components/base/EquivalentIcon'
import Button from 'components/base/buttons/Button'
import { Icon } from 'components/osezchanger/icons'
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
        <Icon iconId='close' />
      </button>
      <div>
        <EquivalentIcon height={2} equivalent={equivalent} />
        <div className={styles.value} data-testid={`comparateur-${slug}-value`}>
          {Number.isFinite(value) ? formatNumber(value).toLocaleString() : <Icon iconId='infinity' />}
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
      <Button
        size='sm'
        priority='secondary'
        onClick={() => {
          track('Comparateur', 'Comparer', equivalent.slug)
          setComparedEquivalent(equivalent)
        }}>
        Comparer
      </Button>
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
      <Icon iconId='plus' />
      Ajouter un équivalent
    </button>
  )
}

export default Tile
