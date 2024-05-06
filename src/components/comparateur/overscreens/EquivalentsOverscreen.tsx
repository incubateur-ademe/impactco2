'use client'

import React, { useEffect, useState } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { useSearchEquivalent } from 'src/providers/useSearchEquivalent'
import { categories } from 'data/categories'
import { track } from 'utils/matomo'
import Button from 'components/base/buttons/Button'
import HiddenLabel from 'components/form/HiddenLabel'
import Input from 'components/form/Input'
import Category from './Category'
import Equivalents from './Equivalents'
import styles from './EquivalentsOverscreen.module.css'

const EquivalentsOverscreen = ({ onClose = () => {} }: { onClose?: () => void }) => {
  const {
    comparateur: { equivalents, setEquivalents },
  } = useParamContext()

  const [tempEquivalents, setTempEquivalents] = useState(equivalents)

  useEffect(() => {
    setTempEquivalents(equivalents)
  }, [equivalents])

  const [search, setSearch] = useState('')
  const results = useSearchEquivalent(search, true)

  return (
    <>
      <div className={styles.header}>
        <HiddenLabel htmlFor='input-search'>Rechercher un objet, un geste..</HiddenLabel>
        <Input
          id='search'
          background='white'
          placeholder='Rechercher un objet, un geste...'
          value={search}
          padding='lg'
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          onClick={() => {
            setEquivalents(tempEquivalents)
            onClose()
            tempEquivalents.forEach((equivalent) => track('Comparateur', equivalent, tempEquivalents.join(', ')))
          }}>
          Fermer
        </Button>
      </div>
      <div className={styles.content}>
        {search ? (
          results.length > 0 ? (
            <Equivalents
              equivalents={tempEquivalents}
              equivalentsToDisplay={results}
              setEquivalents={setTempEquivalents}
            />
          ) : (
            <div className={styles.noResult}>
              Aucun résultat ne correspond à votre recherche.
              <br />
              Vous pouvez essayer d'autres termes ou{' '}
              <Button
                asLink
                onClick={() => {
                  setSearch('')
                }}>
                retourner à la liste des équivalents
              </Button>
              .
            </div>
          )
        ) : (
          categories
            .filter((category) => category.id !== 12 && category.id !== 11)
            .map((category) => (
              <Category
                category={category}
                key={category.slug}
                equivalents={tempEquivalents}
                setEquivalents={setTempEquivalents}
                onClose={onClose}
              />
            ))
        )}
      </div>
      <div className={styles.footer}>
        <div>
          <span className={styles.equivalentsNumber} data-testid='selected-equivalents-number'>
            {tempEquivalents.length}
          </span>
          <span className={styles.equivalentsInfo}> / 8 équivalents</span>
        </div>
        <div>
          <Button
            onClick={() => {
              setEquivalents(tempEquivalents)
              onClose()
              tempEquivalents.forEach((equivalent) => track('Comparateur', equivalent, tempEquivalents.join(', ')))
            }}>
            Revenir au comparateur
          </Button>
        </div>
        <div />
      </div>
    </>
  )
}

export default EquivalentsOverscreen
