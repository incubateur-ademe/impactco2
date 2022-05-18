import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { DndContext, closestCenter, MeasuringStrategy } from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from '@dnd-kit/sortable'

import { formatName } from 'utils/formatters'
import DataContext from 'utils/DataContext'
import Section from 'components/base/Section'
import ShareButton from 'components/misc/ShareButton'
import Weight from './tiles/Weight'
import Tile from './tiles/Tile'
import AddButton from './tiles/AddButton'

const StyledSection = styled(Section)`
  margin-bottom: 4rem;
  padding: ${(props) => (props.background ? 3 : 0)}rem 0 1.5rem;
`
const Title = styled.h2`
  margin-bottom: 1rem;
  text-align: center;
  color: ${(props) => props.theme.colors.text};
`
const Text = styled.p`
  margin-bottom: 1.5rem;
  text-align: center;
`
const TilesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -0.75rem 0.5rem;

  ${(props) => props.theme.mq.small} {
    margin: 0 -0.375rem;
  }
`
export default function Tiles(props) {
  const { equivalents, tiles, setTiles } = useContext(DataContext)

  useEffect(() => {
    setTiles(
      equivalents
        .filter((equivalent) => equivalent.tile)
        .filter(
          (equivalent) =>
            !props.equivalent || equivalent.slug !== props.equivalent.slug
        )
    )
  }, [props.equivalent, equivalents, setTiles])

  const [weight, setWeight] = useState(props.equivalent?.total || 2000)

  return (
    <StyledSection background={props.background}>
      <Section.Content>
        {props.equivalent ? (
          <Title>
            {props.equivalent && (
              <>
                1 {formatName(props.equivalent.name.fr, 1)}
                <br />
              </>
            )}
          </Title>
        ) : (
          <Weight weight={weight} setWeight={setWeight} />
        )}
        <Text>
          c’est autant d’émissions que pour
          <br />
          fabriquer, consommer ou parcourir :
        </Text>

        <DndContext
          collisionDetection={closestCenter}
          measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
          onDragEnd={({ active, over }) => {
            if (active.id !== over.id) {
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
          }}
        >
          <TilesWrapper>
            <SortableContext items={tiles} strategy={rectSortingStrategy}>
              {tiles.map((equivalent) => (
                <Tile
                  equivalent={equivalent}
                  weight={weight}
                  key={equivalent.slug}
                  background={props.background}
                  removeEquivalent={(id) =>
                    setTiles((equivalents) =>
                      equivalents.filter((equivalent) => equivalent.slug !== id)
                    )
                  }
                />
              ))}
              <AddButton />
            </SortableContext>
          </TilesWrapper>
        </DndContext>
        <ShareButton />
      </Section.Content>
    </StyledSection>
  )
}
