import Fuse from 'fuse.js'
import React, { useEffect, useState } from 'react'
import { ComputedEquivalent } from 'types/equivalent'
import categories from 'data/categories.json'
import { computedEquivalents } from 'components/providers/DataProvider'
import useParamContext from 'components/providers/ParamProvider'
import Button from 'components/base/buttons/Button'
import { HiddenLabel } from 'components/form/HiddenLabel'
import Input from 'components/form/Input'
import Category from './Category'
import Equivalents from './Equivalents'
import styles from './EquivalentsOverscreen.module.css'

const EquivalentsOverscreen = ({ onClose }: { onClose: () => void }) => {
  const {
    comparateur: { equivalents },
  } = useParamContext()

  const [search, setSearch] = useState('')
  const [results, setResults] = useState<ComputedEquivalent[]>([])
  const [fuse, setFuse] = useState<Fuse<ComputedEquivalent> | null>(null)
  useEffect(() => {
    if (computedEquivalents) {
      setFuse(
        new Fuse(
          computedEquivalents.filter((equivalent) => !equivalent.hideTile),
          {
            keys: [
              {
                name: 'name',
                weight: 1,
              },
              {
                name: 'slug',
                weight: 0.7,
              },
              {
                name: 'subtitle',
                weight: 0.4,
              },
              {
                name: 'synonyms',
                weight: 0.2,
              },
            ],
            threshold: 0.3,
            ignoreLocation: true,
          }
        )
      )
    }
  }, [equivalents])

  useEffect(() => {
    setResults(
      fuse && search.length > 0
        ? fuse.search(search.normalize('NFD').replace(/[\u0300-\u036f]/g, '')).map(({ item }) => item)
        : computedEquivalents.filter((equivalent) => !equivalent.hideTile).sort((a, b) => (a.slug > b.slug ? 1 : -1))
    )
  }, [search, fuse])
  return (
    <>
      <div className={styles.header}>
        <HiddenLabel htmlFor='input-search'>Rechercher un objet, un geste..</HiddenLabel>
        <Input
          id='search'
          background='white'
          maxWidth='100%'
          placeholder='Rechercher un objet, un geste...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className={styles.content}>
        {search ? (
          <Equivalents equivalentsToDisplay={results} />
        ) : (
          categories
            .filter((category) => category.id !== 12)
            .map((category) => <Category category={category} key={category.slug} onClose={onClose} />)
        )}
      </div>
      <div className={styles.footer}>
        <div>
          <span className={styles.equivalentsNumber} data-testid='selected-equivalents-number'>
            {equivalents.length}
          </span>
          <span className={styles.equivalentsInfo}> / 8 équivalents</span>
        </div>
        <div>
          <Button onClick={onClose}>Valider la séléction</Button>
        </div>
        <div />
      </div>
    </>
  )
}

export default EquivalentsOverscreen
