import React from 'react'
import { track } from 'utils/matomo'
import useParamContext from 'components/providers/ParamProvider'
import Button from 'components/base/buttons/Button'
import { Icon } from 'components/osezchanger/icons'
import Tile from './Tile'
import styles from './Tiles.module.css'
import { getRandomEquivalents } from './random'

const Tiles = ({ changeEquivalents }: { changeEquivalents: () => void }) => {
  const {
    comparateur: { comparedEquivalent, equivalents, setEquivalents },
  } = useParamContext()

  return (
    <>
      <div className={styles.tiles}>
        {equivalents.map((equivalent) => (
          <Tile key={equivalent} slug={equivalent} />
        ))}
        {equivalents.length < 8 && <Tile onAdd={changeEquivalents} />}
      </div>
      <div className={styles.buttons}>
        <Button
          onClick={() => {
            track('Comparateur', 'Générer d’autres équivalents', 'generate_equivalent')
            setEquivalents(getRandomEquivalents(comparedEquivalent?.slug, equivalents.length))
          }}>
          <Icon iconId='magic-wand' />
          Générer d’autres équivalents
        </Button>
        {equivalents.length >= 8 && (
          <Button priority='secondary' onClick={changeEquivalents}>
            Modifier mes équivalents
          </Button>
        )}
      </div>
    </>
  )
}

export default Tiles
