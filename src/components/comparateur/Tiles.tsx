import React from 'react'
import useParamContext from 'components/providers/ParamProvider'
import Button from 'components/base/buttons/Button'
import { Icon } from 'components/osezchanger/icons'
import Tile from './Tile'
import styles from './Tiles.module.css'
import { getRandomEquivalents } from './random'

const Tiles = () => {
  const {
    comparateur: { baseValue, comparedEquivalent, equivalents, setEquivalents },
  } = useParamContext()

  return (
    <>
      <div className={styles.tiles}>
        {equivalents.map((equivalent) => (
          <Tile key={equivalent} slug={equivalent} />
        ))}
        <Tile />
      </div>
      <Button
        className={styles.button}
        onClick={() => {
          setEquivalents(getRandomEquivalents(comparedEquivalent?.slug, baseValue, equivalents.length))
        }}>
        <Icon iconId='magic-wand' />
        Générer d’autres équivalents
      </Button>
    </>
  )
}

export default Tiles
