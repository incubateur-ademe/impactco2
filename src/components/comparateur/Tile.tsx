import React, { useMemo } from 'react'
import formatName from 'utils/formatName'
import formatNumber from 'utils/formatNumber'
import useParamContext from 'components/providers/ParamProvider'
import { computedEquivalents } from 'components/providers/equivalents'
import Emoji from 'components/base/Emoji'
import Button from 'components/base/buttons/Button'
import { Icon } from 'components/osezchanger/icons'
import styles from './Tile.module.css'

const Tile = ({ slug, onClick }: { slug?: string; onClick?: () => void }) => {
  const {
    comparateur: { baseValue, weight, setEquivalents, equivalents, setComparedEquivalent },
  } = useParamContext()

  const equivalent = useMemo(() => (slug ? computedEquivalents.find((e) => e.slug === slug) : null), [slug])
  const value = equivalent ? (baseValue * weight) / equivalent.value : 0

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
        <Emoji height='2rem'>{equivalent.emoji}</Emoji>
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
          setComparedEquivalent(equivalent)
        }}>
        Comparer
      </Button>
    </div>
  ) : (
    <button className={styles.secondaryTile} onClick={onClick}>
      <Icon iconId='plus' />
      Ajouter un équivalent
    </button>
  )
}

export default Tile
