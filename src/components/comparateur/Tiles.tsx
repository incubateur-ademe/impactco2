'use client'

import { useTranslations } from 'next-intl'
import React, { useEffect, useRef, useState } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { track } from 'utils/matomo'
import Button from 'components/base/buttons/Button'
import MagicWandIcon from 'components/base/icons/magic-wand'
import Tile from './Tile'
import { getRandomEquivalents } from './random'
import styles from './Tiles.module.css'

const Tiles = () => {
  const firstRef = useRef<HTMLLIElement>(null)
  const t = useTranslations('comparateur')
  const {
    setOverscreen,
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
      <ul className={styles.tiles}>
        {equivalents.map((equivalent, index) => (
          <li key={equivalent} className={styles.tileContainer} tabIndex={-1} ref={index === 0 ? firstRef : undefined}>
            <div className={styles.background} />
            <div
              className={typeof generation === 'number' && generation <= index ? styles.disapearingTile : styles.tile}>
              <Tile slug={equivalent} />
            </div>
          </li>
        ))}
        {equivalents.length < 8 && (
          <li className={styles.tileContainer}>
            <Tile onAdd={() => setOverscreen('comparateur', 'equivalents')} />
          </li>
        )}
      </ul>
      <div className={styles.buttons}>
        <Button
          disabled={generation === 0 || !!generation}
          onClick={() => {
            track('Comparateur', 'Générer d’autres équivalents', 'generate_equivalent')
            setGeneration(0)
            setTimeout(() => {
              setEquivalents(getRandomEquivalents(comparedEquivalent?.slug, equivalents.length))
              setTimeout(() => {
                setGeneration(1)
                if (firstRef.current) {
                  firstRef.current.focus()
                }
              }, 100)
            }, 200)
          }}>
          <MagicWandIcon />
          {t('generate')}
        </Button>
        {equivalents.length >= 8 && (
          <Button onClick={() => setOverscreen('comparateur', 'equivalents')}>{t('modify')}</Button>
        )}
      </div>
    </>
  )
}

export default Tiles
