'use client'

import { useTranslations } from 'next-intl'
import React, { useEffect, useState } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { track } from 'utils/matomo'
import Button from 'components/base/buttons/Button'
import MagicWandIcon from 'components/base/icons/magic-wand'
import Tile from './Tile'
import styles from './Tiles.module.css'
import { getRandomEquivalents } from './random'

const Tiles = ({ changeEquivalents }: { changeEquivalents: () => void }) => {
  const t = useTranslations('comparateur')
  const {
    comparateur: { comparedEquivalent, equivalents, setEquivalents },
  } = useParamContext()

  const [generation, setGeneration] = useState<number | boolean>(false)

  useEffect(() => {
    if (typeof generation === 'number' && generation) {
      setTimeout(
        () =>
          setGeneration((value) => {
            if (typeof value === 'number') {
              return value < equivalents.length ? value + 1 : false
            }
            return value
          }),
        250
      )
    }
  }, [equivalents, generation])
  return (
    <>
      <div className={styles.tiles}>
        {equivalents.map((equivalent, index) => (
          <div key={equivalent} className={styles.tileContainer}>
            <div className={styles.background} />
            <div
              className={typeof generation === 'number' && generation <= index ? styles.disapearingTile : styles.tile}>
              <Tile slug={equivalent} />
            </div>
          </div>
        ))}
        {equivalents.length < 8 && (
          <div className={styles.tileContainer}>
            <Tile onAdd={changeEquivalents} />
          </div>
        )}
      </div>
      <div className={styles.buttons}>
        <Button
          disabled={generation === 0 || !!generation}
          onClick={() => {
            track('Comparateur', 'Générer d’autres équivalents', 'generate_equivalent')
            setGeneration(0)
            setTimeout(() => {
              setEquivalents(getRandomEquivalents(comparedEquivalent?.slug, equivalents.length))
              setTimeout(() => setGeneration(1), 100)
            }, 200)
          }}>
          <MagicWandIcon />
          {t('generate')}
        </Button>
        {equivalents.length >= 8 && <Button onClick={changeEquivalents}>{t('modify')}</Button>}
      </div>
    </>
  )
}

export default Tiles
