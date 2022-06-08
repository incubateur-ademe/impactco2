import React, { useContext } from 'react'
import styled from 'styled-components'
import AnimatedNumber from 'animated-number-react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import useIframe from 'hooks/useIframe'
import { formatNumber, formatName, formatTotal } from 'utils/formatters'
import DataContext from 'utils/DataContext'
import Emoji from 'components/base/Emoji'
import Button from 'components/base/Button'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(33.3333% - 1rem);
  padding: 1.125rem 0.25rem;
  background-color: ${(props) =>
    props.theme.colors[props.background ? 'textLight' : 'second']};
  border-radius: 1rem;

  ${(props) => props.theme.mq.medium} {
    width: calc(33.3333% - 0.5rem);
  }
  ${(props) => props.theme.mq.small} {
    width: calc(50% - 0.375rem);
  }
`
const ButtonDrag = styled.button`
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  height: 1.125rem;
  margin: 0;
  padding: 0;
  background: none;
  border: none;
  cursor: grab;

  svg {
    width: auto;
    height: 100%;
    transition: transform 300ms ease-out;
    transform-origin: center;

    circle {
      fill: ${(props) => props.theme.colors.main};
    }
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
  pointer-events: ${(props) => (props.reference ? 'none' : 'inherit')};

  img,
  span {
    display: block;
  }
`
const Title = styled.h4`
  margin-bottom: 0.25rem;
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
    font-size: 1.75rem;
  }
`
const Name = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 2.125rem;
`
const Subtitle = styled.span`
  display: block;
  font-weight: 300;
  font-size: 0.75rem;
`
const StyledButton = styled(Button)`
  padding: 0.5em 0.75rem;
  font-size: 0.8125rem;

  svg {
    display: block;
    height: 0.75rem;
    width: auto;
  }
`

export default function Tile(props) {
  const { categories } = useContext(DataContext)

  const iframe = useIframe()

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
      {!props.reference && (
        <ButtonDrag {...attributes} {...listeners}>
          <svg width='12' height='16' viewBox='0 0 12 16' fill='none'>
            <circle cx='2' cy='2' r='2' />
            <circle cx='10' cy='2' r='2' />
            <circle cx='2' cy='8' r='2' />
            <circle cx='10' cy='8' r='2' />
            <circle cx='2' cy='14' r='2' />
            <circle cx='10' cy='14' r='2' />
          </svg>
        </ButtonDrag>
      )}
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
      <ButtonEmoji {...attributes} {...listeners} reference={props.reference}>
        <Emoji>{props.equivalent.emoji}</Emoji>
      </ButtonEmoji>
      <Title>
        <Number>
          <AnimatedNumber
            value={props.weight / formatTotal(props.equivalent)}
            duration={500}
            formatValue={formatNumber}
          />
        </Number>
        <Name>
          {formatName(
            props.equivalent.name.fr,
            props.weight / formatTotal(props.equivalent)
          )}
          {props.showSubtitle && props.equivalent.subtitle ? (
            <Subtitle>
              {formatName(
                props.equivalent.subtitle.fr,
                props.weight / formatTotal(props.equivalent)
              )}
            </Subtitle>
          ) : (
            ''
          )}
        </Name>
      </Title>
      {props.reference ? (
        !iframe &&
        !props.equivalentPage && (
          <Button.Wrapper>
            <StyledButton
              to={`/categories/${
                categories.find(
                  (category) => category.id === props.equivalent.category
                )?.slug
              }/${props.equivalent.slug}`}
            >
              Voir le détail
            </StyledButton>
          </Button.Wrapper>
        )
      ) : (
        <Button.Wrapper>
          <StyledButton
            onClick={() => props.setCurEquivalent(props.equivalent)}
            hollow
          >
            <svg
              width='292'
              height='388'
              viewBox='0 0 292 388'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M168.627 9.37298C162.378 3.12397 154.19 -4.25109e-05 146 -4.32269e-05C137.812 -4.39427e-05 129.62 3.12497 123.373 9.37297L9.99496 122.75C-2.50204 135.247 -2.50205 155.508 9.99495 168.005C22.492 180.502 42.753 180.502 55.25 168.005L114 109.255L114 356.001C114 373.674 128.327 388.001 146 388.001C163.673 388.001 178 373.674 178 356.001L178 109.255L236.75 168.005C249.247 180.502 269.508 180.502 282.005 168.005C294.502 155.508 294.502 135.247 282.005 122.75L168.627 9.37298Z' />
            </svg>
            Comparer
          </StyledButton>
        </Button.Wrapper>
      )}
    </Wrapper>
  )
}
