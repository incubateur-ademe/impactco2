import Fuse from 'fuse.js'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { track } from 'utils/matomo'
import { computedEquivalents } from 'components/providers/DataProvider'
import useModalContext from 'components/providers/ModalProvider'
import useParamContext from 'components/providers/ParamProvider'
import Modal from 'components/base/Modal'
import TextInput from 'components/base/TextInput'
import Button from 'components/base/buttons/Button'
import Equivalent from './tilesModal/Equivalent'

const StyledModal = styled(Modal)`
  height: 90vh;
`
const Title = styled.h1``
const Text = styled.p``
const SearchInput = styled(TextInput)`
  margin: 0.5rem;
`
const Equivalents = styled.div`
  margin-bottom: 3rem;
`

export default function TilesModal() {
  const { tiles: open, setTiles: setOpen } = useModalContext()

  const {
    comparateur: { equivalents, setEquivalents },
  } = useParamContext()

  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])
  const [fuse, setFuse] = useState(null)
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
        ? fuse.search(search.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
        : computedEquivalents
            .filter((equivalent) => !equivalent.hideTile)
            .map((equivalent) => ({ item: equivalent }))
            .sort((a, b) => (a.item.slug > b.item.slug ? 1 : -1))
    )
  }, [search, fuse])

  return open ? (
    <StyledModal open={open} setOpen={setOpen}>
      <Title>Ajouter ou enlever des équivalents</Title>
      <Text>Sélectionnez (ou désélectionnez) des équivalents pour créer votre infographie personnalisée.</Text>
      <SearchInput
        value={search}
        onChange={({ value }) => setSearch(value)}
        placeholder={'Entrez un objet, un geste...'}
      />
      <Equivalents>
        {results.map(({ item }) => (
          <Equivalent
            key={item.slug}
            equivalent={item}
            checked={equivalents.find((tile) => tile === item.slug)}
            setChecked={(checked) => {
              setEquivalents((prevTiles) =>
                checked ? [...prevTiles, item.slug] : prevTiles.filter((equivalent) => equivalent !== item.slug)
              )
            }}
          />
        ))}
      </Equivalents>
      <Button
        onClick={() => {
          equivalents.forEach((tile) => track('Comparateur carbone', 'Nouvel équivalent', tile.slug))
          setOpen(false)
        }}>
        Valider et fermer
      </Button>
    </StyledModal>
  ) : null
}
