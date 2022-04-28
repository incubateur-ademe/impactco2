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
import Weight from './tiles/Weight'
import Tile from './tiles/Tile'
import AddButton from './tiles/AddButton'

const StyledSection = styled(Section)`
  margin-bottom: 4rem;
  padding: ${(props) => (props.background ? 3 : 0)}rem 0 1rem;
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
  margin: 0 -0.75rem;

  ${(props) => props.theme.mq.small} {
    margin: 0 -0.375rem;
  }
`
export default function Tiles(props) {
  const { equivalents } = useContext(DataContext)

  const [equivalentsToDisplay, setEquivalentsToDisplay] = useState([])
  useEffect(() => {
    setEquivalentsToDisplay(
      equivalents
        .filter((equivalent) => equivalent.tile)
        .filter(
          (equivalent) =>
            !props.equivalent || equivalent.id !== props.equivalent.id
        )
    )
  }, [equivalents, props.equivalent])

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
              setEquivalentsToDisplay((items) => {
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
            <SortableContext
              items={equivalentsToDisplay}
              strategy={rectSortingStrategy}
            >
              {equivalentsToDisplay.map((equivalent) => (
                <Tile
                  equivalent={equivalent}
                  weight={weight}
                  key={equivalent.id}
                  background={props.background}
                  removeEquivalent={(id) =>
                    setEquivalentsToDisplay((equivalents) =>
                      equivalents.filter((equivalent) => equivalent.id !== id)
                    )
                  }
                />
              ))}
              <AddButton />
            </SortableContext>
          </TilesWrapper>
        </DndContext>
      </Section.Content>
    </StyledSection>
  )
}
