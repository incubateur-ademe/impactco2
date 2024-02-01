import { DndContext, MeasuringStrategy, closestCenter } from '@dnd-kit/core'
import { SortableContext, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable'
import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { computeECV } from 'utils/computeECV'
import { MEDIA } from 'utils/styles'
import useDataContext from 'components/providers/DataProvider'
import useParamContext from 'components/providers/ParamProvider'
import ShareableContent from './ShareableContent'
import { overScreenCategoryValues } from './category/overScreens/Values'
import AddButton from './tiles/AddButton'
import Tile from './tiles/Tile'
import Weight from './tiles/Weight'

const Reference = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
`
const Text = styled.p`
  margin-bottom: 1.5rem;
  text-align: center;
`
const TilesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  ${MEDIA.LT.MEDIUM} {
    gap: 0.75rem;
  }
`
export default function Tiles(props) {
  const { equivalents } = useDataContext()
  const {
    comparateur: { tiles, setTiles, comparedEquivalent, setComparedEquivalent },
  } = useParamContext()

  const [overScreen, setOverScreen] = useState()
  const overScreenValues = useMemo(() => overScreenCategoryValues(), [])

  useEffect(() => {
    if (!tiles.length) {
      setTiles(equivalents.filter((equivalent) => equivalent.tile))
    }
  }, [tiles, equivalents, setTiles])

  const [weight, setWeight] = useState(2000)
  useEffect(() => {
    comparedEquivalent && setWeight(computeECV(comparedEquivalent))
  }, [comparedEquivalent])

  const [showSubtitle, setShowSubtitle] = useState(false)
  useEffect(() => {
    setShowSubtitle(
      tiles.filter((tile) => tiles.find((otherTile) => otherTile.name === tile.name && otherTile.slug !== tile.slug))
        .length
    )
  }, [tiles])

  return (
    <ShareableContent
      iframe={props.iframe}
      size='sm'
      tracking={'Comparateur'}
      setOverScreen={setOverScreen}
      overScreen={overScreen ? overScreenValues[overScreen] : undefined}
      title={props.title}
      path='comparateur'>
      <DndContext
        collisionDetection={closestCenter}
        measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
        onDragEnd={({ active, over }) => {
          if (active.id !== over.id) {
            if (over.id === comparedEquivalent?.id || over.id === 'weight') {
              setComparedEquivalent(equivalents.find((equivalent) => equivalent.id === active.id))
            } else {
              setTiles((items) => {
                const oldIndex = items.indexOf(items.find((item) => item.id === active.id))
                const newIndex = items.indexOf(items.find((item) => item.id === over.id))
                return arrayMove(items, oldIndex, newIndex)
              })
            }
          }
        }}>
        <SortableContext items={[]}>
          <Reference>
            {comparedEquivalent ? (
              <Tile
                equivalent={comparedEquivalent}
                weight={computeECV(comparedEquivalent)}
                showSubtitle={showSubtitle}
                equivalentPage={props.equivalent?.slug === comparedEquivalent.slug}
                removeEquivalent={() => setComparedEquivalent(undefined)}
                reference
              />
            ) : (
              <Weight weight={weight} setWeight={setWeight} />
            )}
          </Reference>
        </SortableContext>
        <Text>
          c’est autant d’émissions que pour
          <br />
          fabriquer, consommer ou parcourir :
        </Text>

        <SortableContext items={[...tiles, { id: 'weight' }]} strategy={rectSortingStrategy}>
          <TilesWrapper>
            {tiles
              .filter((equivalent) => !comparedEquivalent || equivalent.slug !== comparedEquivalent.slug)
              .map((equivalent) => (
                <Tile
                  key={equivalent.slug}
                  equivalent={equivalent}
                  weight={weight}
                  showSubtitle={showSubtitle}
                  removeEquivalent={(id) =>
                    setTiles((equivalents) => equivalents.filter((equivalent) => equivalent.id !== id))
                  }
                  setComparedEquivalent={setComparedEquivalent}
                />
              ))}
            <AddButton />
          </TilesWrapper>
        </SortableContext>
      </DndContext>
    </ShareableContent>
  )
}
