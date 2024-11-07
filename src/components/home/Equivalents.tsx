'use client'

import React, { useEffect, useRef, useState } from 'react'
import { computedEquivalents } from 'src/providers/equivalents'
import { useSearchEquivalent } from 'src/providers/useSearchEquivalent'
import { ComputedEquivalent } from 'types/equivalent'
import { track } from 'utils/matomo'
import useDebounce from 'hooks/useDebounce'
import Button from 'components/base/buttons/Button'
import MagicWandIcon from 'components/base/icons/magic-wand'
import SearchIcon from 'components/base/icons/search'
import Card from 'components/cards/Card'
import { getRandomEquivalents } from 'components/comparateur/random'
import HiddenLabel from 'components/form/HiddenLabel'
import Input from 'components/form/Input'
import EquivalentCard from './EquivalentCard'
import styles from './Equivalents.module.css'

const generate = () => getRandomEquivalents('', 3).map((slug) => computedEquivalents.find((x) => x.slug === slug))

const Equivalents = () => {
  const firstRef = useRef<HTMLAnchorElement>(null)
  const [search, setSearch] = useState('')
  const searchValue = useDebounce(search, 500)
  const [equivalents, setEquivalents] = useState<(ComputedEquivalent | undefined)[]>([])

  const results = useSearchEquivalent(search)

  useEffect(() => {
    setEquivalents(generate())
  }, [])

  useEffect(() => {
    if (searchValue) {
      track('Fiches', 'Search', searchValue)
    }
  }, [searchValue])

  return (
    <>
      <Card colored>
        <HiddenLabel htmlFor='input-search'>Rechercher</HiddenLabel>
        <Input
          id='search'
          placeholder='Rechercher'
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
          }}
          padding='lg'
          icon={<SearchIcon />}
          iconAria='Afficher les résultats'
          onIconClick={() => {
            if (firstRef.current) {
              firstRef.current.focus()
            }
          }}
        />
      </Card>
      <ul className={styles.equivalents}>
        <EquivalentCard equivalent={search ? results[0] : equivalents[0]} ref={firstRef} />
        <EquivalentCard equivalent={search ? results[1] : equivalents[1]} />
        <EquivalentCard equivalent={search ? results[2] : equivalents[2]} />
      </ul>
      <Button
        className={styles.button}
        icon={<MagicWandIcon />}
        title="Recharger la liste et afficher d'autres fiches au-dessus"
        onClick={() => {
          track('Fiches', "Afficher d'autres fiches", 'click_afficher_dautres_fichers')
          setSearch('')
          setEquivalents(generate())
          if (firstRef.current) {
            firstRef.current.focus()
          }
        }}>
        Afficher d'autres fiches
      </Button>
    </>
  )
}

export default Equivalents
