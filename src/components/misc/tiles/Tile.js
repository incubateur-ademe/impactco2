import React, { useContext } from 'react'
import styled from 'styled-components'
import AnimatedNumber from 'animated-number-react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { formatNumber, formatName } from 'utils/formatters'
import DataContext from 'utils/DataContext'
import Emoji from 'components/base/Emoji'
import Button from 'components/base/Button'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 12.75rem;
  margin: 0.75rem;
  padding: 1rem 0.25rem;
  background-color: ${(props) =>
    props.theme.colors[props.background ? 'footerLight' : 'secondLight']};
  border-radius: 1rem;

  ${(props) => props.theme.mq.small} {
    width: calc(50% - 0.75rem);
    margin: 0.375rem;
  }
`
const ButtonRemove = styled.button`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  width: 1rem;
  margin: 0;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;

  svg {
    width: 100%;
    height: auto;
    transition: transform 300ms ease-out;
    transform-origin: center;

    path {
      fill: ${(props) => props.theme.colors.main};
    }
  }

  &:hover {
    svg {
      transform: rotate(360deg);
    }
  }
`
const ButtonEmoji = styled.button`
  margin-bottom: 0.5rem;
  padding: 0;
  font-size: 2rem;
  background: none;
  border: none;
  cursor: grab;

  ${(props) => props.theme.mq.small} {
    font-size: 1.5rem;
  }
`
const Title = styled.h4`
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: normal;
  text-align: center;
  color: ${(props) => props.theme.colors.text};
`
const Number = styled.span`
  display: block;
  font-size: 2rem;
  font-weight: bold;

  ${(props) => props.theme.mq.small} {
    font-size: 1.5rem;
  }
`
const Name = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 2.125rem;
`
const StyledButton = styled(Button)`
  padding: 0.375rem 1rem;
  font-size: 0.875rem;

  ${(props) => props.theme.mq.small} {
    font-size: 0.75rem;
  }
`
export default function Tile(props) {
  const { categories } = useContext(DataContext)

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.equivalent.id,
      animateLayoutChanges: ({ wasDragging }) => !wasDragging,
    })

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  }

  return (
    <Wrapper background={props.background} ref={setNodeRef} style={style}>
      <ButtonRemove onClick={() => props.removeEquivalent(props.equivalent.id)}>
        <svg
          x='0px'
          y='0px'
          width='41.756px'
          height='41.756px'
          viewBox='0 0 41.756 41.756'
        >
          <path
            d='M27.948,20.878L40.291,8.536c1.953-1.953,1.953-5.119,0-7.071c-1.951-1.952-5.119-1.952-7.07,0L20.878,13.809L8.535,1.465
		c-1.951-1.952-5.119-1.952-7.07,0c-1.953,1.953-1.953,5.119,0,7.071l12.342,12.342L1.465,33.22c-1.953,1.953-1.953,5.119,0,7.071
		C2.44,41.268,3.721,41.755,5,41.755c1.278,0,2.56-0.487,3.535-1.464l12.343-12.342l12.343,12.343
		c0.976,0.977,2.256,1.464,3.535,1.464s2.56-0.487,3.535-1.464c1.953-1.953,1.953-5.119,0-7.071L27.948,20.878z'
          />
        </svg>
      </ButtonRemove>
      <ButtonEmoji {...attributes} {...listeners}>
        <Emoji>{props.equivalent.emoji}</Emoji>
      </ButtonEmoji>
      <Title>
        <Number>
          <AnimatedNumber
            value={props.weight / props.equivalent.total}
            duration={500}
            formatValue={formatNumber}
          />
        </Number>
        <Name>
          {formatName(
            props.equivalent.name.fr,
            formatNumber(props.weight / props.equivalent.total, true)
          )}
        </Name>
      </Title>

      <StyledButton
        to={`/categories/${
          categories.find(
            (category) => category.id === props.equivalent.category
          ).slug
        }/${props.equivalent.slug}`}
      >
        Voir le détail
      </StyledButton>
    </Wrapper>
  )
}
