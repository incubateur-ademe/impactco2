import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { DndContext, closestCenter, MeasuringStrategy } from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from '@dnd-kit/sortable'

import useIframe from 'hooks/useIframe'
import { formatTotal } from 'utils/formatters'
import DataContext from 'utils/DataContext'
import Section from 'components/base/Section'
import ShareButton from 'components/misc/ShareButton'
import Weight from './tiles/Weight'
import Tile from './tiles/Tile'
import AddButton from './tiles/AddButton'

const StyledSection = styled(Section)`
  margin-bottom: ${(props) => (props.iframe ? 0 : '4rem')};
  padding: ${(props) => (props.background ? 2 : 0)}rem 0
    ${(props) => (props.iframe ? 0 : '1.5rem')};
`
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

  ${(props) => props.theme.mq.medium} {
    gap: 0.75rem;
  }
`
export default function Tiles(props) {
  const { equivalents, tiles, setTiles } = useContext(DataContext)

  const iframe = useIframe()

  const [curEquivalent, setCurEquivalent] = useState(props.equivalent)
  useEffect(() => {
    if (!tiles.length) {
      setTiles(equivalents.filter((equivalent) => equivalent.tile || true))
    }
  }, [tiles, equivalents, setTiles])

  const [weight, setWeight] = useState(2000)
  useEffect(() => {
    curEquivalent && setWeight(formatTotal(curEquivalent))
  }, [curEquivalent])

  return (
    <StyledSection background={props.background} iframe={iframe}>
      <Section.Content>
        <DndContext
          collisionDetection={closestCenter}
          measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
          onDragEnd={({ active, over }) => {
            if (active.id !== over.id) {
              if (over.id === curEquivalent?.id || over.id === 'weight') {
                setCurEquivalent(
                  equivalents.find((equivalent) => equivalent.id === active.id)
                )
              } else {
                setTiles((items) => {
                  const oldIndex = items.indexOf(
                    items.find((item) => item.id === active.id)
                  )
                  const newIndex = items.indexOf(
                    items.find((item) => item.id === over.id)
                  )
                  return arrayMove(items, oldIndex, newIndex)
                })
              }
            }
          }}
        >
          <SortableContext items={[]}>
            <Reference>
              {curEquivalent ? (
                <Tile
                  equivalent={curEquivalent}
                  weight={formatTotal(curEquivalent)}
                  background={props.background}
                  equivalentPage={props.equivalent?.slug === curEquivalent.slug}
                  removeEquivalent={() => setCurEquivalent(null)}
                  reference
                />
              ) : (
                <Weight
                  weight={weight}
                  setWeight={setWeight}
                  background={props.background}
                />
              )}
            </Reference>
          </SortableContext>
          <Text>
            c’est autant d’émissions que pour
            <br />
            fabriquer, consommer ou parcourir :
          </Text>

          <SortableContext
            items={[...tiles, { id: 'weight' }]}
            strategy={rectSortingStrategy}
          >
            <TilesWrapper>
              {tiles
                .filter(
                  (equivalent) =>
                    !curEquivalent || equivalent.slug !== curEquivalent.slug
                )
                .map((equivalent) => (
                  <Tile
                    equivalent={equivalent}
                    weight={weight}
                    key={equivalent.id}
                    background={props.background}
                    removeEquivalent={(id) =>
                      setTiles((equivalents) =>
                        equivalents.filter((equivalent) => equivalent.id !== id)
                      )
                    }
                    setCurEquivalent={setCurEquivalent}
                  />
                ))}
              <AddButton />
            </TilesWrapper>
          </SortableContext>
          <ShareButton />
        </DndContext>
      </Section.Content>
    </StyledSection>
  )
}
